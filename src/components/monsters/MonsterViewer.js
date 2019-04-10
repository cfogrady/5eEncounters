import React, { Component } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import { getAllMonsters, buildEmptyMonster, buildMonsterId, addMonster, removeMonsterById } from '../data-store/Monsters';
import MonsterViewerHeader from './MonsterViewerHeader';
import MonsterModal from './modal/MonsterModal';
import { calculateCR } from './UnitConversionCalculator';

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
            loading: true,
            selectedMonster: null,
            filterXp: null,
            filterName: null,
        };
        this.onAddMonster = this.onAddMonster.bind(this);
        this.onMonsterChange = this.onMonsterChange.bind(this);
        this.changeMonster = this.changeMonster.bind(this);
        this.onDeleteMonster = this.onDeleteMonster.bind(this);
        this.closeMonsterModel = this.closeMonsterModel.bind(this);
        this.cancelMonsterModal = this.cancelMonsterModal.bind(this);
        this.changeXPFilter = this.changeXPFilter.bind(this);
        this.changeNameFilter = this.changeNameFilter.bind(this);
    }

    onAddMonster() {
        this.setState({
            selectedMonster: buildEmptyMonster(),
        });
    }

    onMonsterChange(monster) {
        this.setState({
            selectedMonster: monster,
        });
    }

    changeMonster(monster) {
        return _ => this.onMonsterChange(monster);
    }

    cancelMonsterModal() {
        this.setState({
            selectedMonster: null,
        });
    }

    onDeleteMonster() {
        const monster = this.state.selectedMonster;
        let { monsterList } = this.state;
        monsterList = monsterList.filter(mon => mon.id !== monster.id);
        removeMonsterById(monster.id);
        this.setState({
            selectedMonster: null,
            monsterList: sortMonsterList(monsterList),
        });
    }

    closeMonsterModel() {
        const monster = this.state.selectedMonster;
        let { monsterList } = this.state;
        if(monster.id == null) {
            buildMonsterId(monster);
            monsterList = monsterList.concat([monster])
            addMonster(monster);
        } else {
            const oldId = monster.id;
            monsterList = monsterList.filter(mon => mon.id !== monster.id);
            buildMonsterId(monster);
            monsterList = monsterList.concat([monster]);
            removeMonsterById(oldId).then(_ => addMonster(monster));
        }
        this.setState({
            selectedMonster: null,
            monsterList: sortMonsterList(monsterList),
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
        const { monsterList, loading, selectedMonster, filterName, filterXp } = this.state;
        const showSelectedMonster = selectedMonster != null;
        const formattedFilterName = filterName == null || filterName == '' ? null : filterName.toUpperCase();
        return (
        <div className='mv-view'>
            <MonsterViewerHeader
                filterXp={filterXp}
                filterName={filterName}
                onAddMonster={this.onAddMonster}
                onNameFilter={this.changeNameFilter}
                onXPFilter={this.changeXPFilter}
            />
            <MonsterModal
                monster={selectedMonster}
                show={showSelectedMonster}
                onClose={this.closeMonsterModel}
                onCancel={this.cancelMonsterModal}
                onMonsterChange={this.onMonsterChange}
                onDelete={this.onDeleteMonster}
                editable={true}
            />
            {monsterList.filter(monster => {
                const nameMatch = formattedFilterName == null || monster.name.toUpperCase().indexOf(formattedFilterName) >= 0;
                const xpMatch = filterXp == null || monster.xp == filterXp;
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

export default MonsterViewer;
