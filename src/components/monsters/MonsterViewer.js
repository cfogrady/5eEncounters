import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import MoonLoader from 'react-spinners/MoonLoader';
import { getAllMonsters, buildEmptyMonster, buildMonsterId, addMonster, removeMonsterById } from './data-store/Monsters';
import { addMonsterImage, removeMonsterImageById } from './data-store/MonsterImages';
import MonsterViewerHeader from './MonsterViewerHeader';
import MonsterModal from './modal/MonsterModal';
import { calculateCR } from './UnitConversionCalculator';
import SelectOrEditModal from '../common/modals/SelectOrEditModal';

import './MonsterViewer.css';

const sortMonsterList = monsterList => {
    return monsterList.sort((a, b) => {
        const nameA = a.id.toUpperCase(); // ignore upper and lowercase
        const nameB = b.id.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

class MonsterViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monsterList: [],
            // loading: true,
            selectedMonster: null,
            imageURL: null,
            filterXp: null,
            filterName: null,
            editing: false,
            selectOrViewMonster: null,
        };
        this.onAddMonster = this.onAddMonster.bind(this);
        this.onImageSet = this.onImageSet.bind(this);
        this.onMonsterChange = this.onMonsterChange.bind(this);
        this.viewMonster = this.viewMonster.bind(this);
        this.changeMonster = this.changeMonster.bind(this);
        this.onDeleteMonster = this.onDeleteMonster.bind(this);
        this.saveMonsterModel = this.saveMonsterModel.bind(this);
        this.cancelMonsterModal = this.cancelMonsterModal.bind(this);
        this.changeXPFilter = this.changeXPFilter.bind(this);
        this.changeNameFilter = this.changeNameFilter.bind(this);
        this.onToggleEdit = this.onToggleEdit.bind(this);
    }

    onAddMonster() {
        this.setState({
            selectedMonster: buildEmptyMonster(),
            imageURL: null,
            editing: true,
        });
    }

    onImageSet(imageURL) {
        this.setState({
            imageURL,
        })
    }

    onToggleEdit() {
        this.setState({
            editing: true,
        })
    }

    onMonsterChange(monster) {
        this.setState({
            selectedMonster: monster,
            selectOrViewMonster: null,
        });
    }

    viewMonster(monster) {
        this.onMonsterChange(monster);
    }

    changeMonster(monster) {
        return _ => {
            if(this.props.onSelectMonster == null) {
                this.onMonsterChange(monster);
            } else {
                this.setState({
                    selectOrViewMonster: monster,
                })
            }
        };
    }

    cancelMonsterModal() {
        this.setState({
            selectedMonster: null,
            imageURL: null,
            editing: false
        });
    }

    onDeleteMonster() {
        const monster = this.state.selectedMonster;
        let { monsterList } = this.state;
        monsterList = monsterList.filter(mon => mon.id !== monster.id);
        if(monster.imageKey) {
            removeMonsterImageById(monster.imageKey);
        }
        removeMonsterById(monster.id);
        this.setState({
            selectedMonster: null,
            monsterList: sortMonsterList(monsterList),
            imageURL: null,
            editing: false,
        });
    }

    saveMonsterModel() {
        const monster = this.state.selectedMonster;
        let { monsterList, imageURL } = this.state;
        if(monster.id == null) {
            buildMonsterId(monster);
            monsterList = monsterList.concat([monster])
            if(imageURL) {
                addMonsterImage(imageURL).then(id => {
                    monster.imageKey = id;
                    addMonster(monster);
                })
            } else {
                addMonster(monster);
            }
        } else {
            const oldId = monster.id;
            monsterList = monsterList.filter(mon => mon.id !== monster.id);
            buildMonsterId(monster);
            monsterList = monsterList.concat([monster]);
            if(imageURL) {
                addMonsterImage(imageURL).then(id => {
                    monster.imageKey = id;
                    removeMonsterById(oldId).then(_ => addMonster(monster));
                })
            } else {
                removeMonsterById(oldId).then(_ => addMonster(monster));
            }
        }
        this.setState({
            selectedMonster: null,
            monsterList: sortMonsterList(monsterList),
            imageURL: null,
            editing: false,
        });
    }

    componentDidMount(props) {
        getAllMonsters().then(monsterList => {
            this.setState({
                monsterList: sortMonsterList(monsterList),
                loading: false,
            });
        }).catch(error => {
            console.error(error);
        });
    }

    changeNameFilter(event) {
        const filterName = event.target.value;
        this.setState({
            filterName,
        });
    }

    changeXPFilter(event) {
        const xp = event.target.value;
        this.setState({
            filterXp: xp === '' ? null : parseInt(xp),
        });
    }

    render() {
        const { onSelectMonster } = this.props;
        const { monsterList, selectedMonster, filterName, filterXp, editing, selectOrViewMonster } = this.state;
        const showSelectedMonster = selectedMonster != null;
        const showSelectOrViewMonster = selectOrViewMonster != null;
        const formattedFilterName = filterName == null || filterName === '' ? null : filterName.toUpperCase();
        return (
        <div className='mv-view'>
            <MonsterViewerHeader
                filterXp={filterXp}
                filterName={filterName}
                onAddMonster={this.onAddMonster}
                onNameFilter={this.changeNameFilter}
                onXPFilter={this.changeXPFilter}
            />
            <SelectOrEditModal
                onSelect={_ => onSelectMonster(selectOrViewMonster)}
                onView={_ => this.viewMonster(selectOrViewMonster)}
                show={showSelectOrViewMonster}
            />
            <MonsterModal
                monster={selectedMonster}
                show={showSelectedMonster}
                onSave={this.saveMonsterModel}
                onCancel={this.cancelMonsterModal}
                onMonsterChange={this.onMonsterChange}
                onImageSet={this.onImageSet}
                onDelete={this.onDeleteMonster}
                editable={editing}
                onToggleEdit={this.onToggleEdit}
            />
            {monsterList.filter(monster => {
                const nameMatch = formattedFilterName == null || monster.name.toUpperCase().indexOf(formattedFilterName) >= 0;
                const xpMatch = filterXp == null || monster.xp === filterXp;
                return xpMatch && nameMatch;
            }).map(monster => (
                <div className='mv-monster' key={monster.id} onClick={this.changeMonster(monster)}>
                    {`${monster.name} CR ${calculateCR(monster.xp)}`}
                </div>
            ))}
        </div>
        );
    }
}

MonsterViewer.propTypes = {
    onSelectMonster: PropTypes.func,
}

MonsterViewer.defaultProps = {
    onSelectMonster: null,
}

export default MonsterViewer;
