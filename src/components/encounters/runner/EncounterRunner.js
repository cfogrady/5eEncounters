import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from "react-beautiful-dnd";
import DroppableWrapper from '../../common/dnd/DroppableWrapper';
import DraggableWrapper from '../../common/dnd/DraggableWrapper';
import { buildUseableEncounter } from '../data-store/EncounterHelpers';
import MonsterModal from '../../monsters/modal/MonsterModal';
import { LIST } from '../Views';

import './EncounterRunner.css';
import TargetModal from './TargetModal';
import { DAMAGE, HEAL, TEMP_HEALTH } from './TargetTypes';

const buildDisplayString = creature => {
    let result = creature.name;
    if(creature.multiple) {
        result += '[' + creature.monsterId.toString() +']';
    }
    result += ' ' + creature.hp + '/' + creature.maxHp;
    if(creature.tmpHp > 0) {
        result += ' (' + creature.tmpHp + ' Tmp Hp)';
    }
    if(!creature.isPlayer) {
        result += ' AC: ' + creature.monster.ac.toString();
    }
    return result;
}

class EncounterRunner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creatureList: [],
            selectedMonster: null,
            targetIdx: null,
        };
        this.onDragEnd = this.onDragEnd.bind(this);
        this.selectMonster = this.selectMonster.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onDealToTarget = this.onDealToTarget.bind(this);
        this.removeCreature = this.removeCreature.bind(this);
    }

    componentDidMount() {
        let { encounter, onChangeView } = this.props;
        if(encounter == null) {
            console.error('Should not make it to runner without encounter');
            onChangeView(LIST, null);
        } else {
            buildUseableEncounter(encounter).then(useableEncounter => {
                this.setState({
                    creatureList: this.buildCreatureList(useableEncounter),
                });
            });
        }
    }

    buildCreatureList(useableEncounter) {
        let id = 0;
        let creatureList = useableEncounter.players.map(player => ({
            id: id++,
            name: player.characterName,
            hp: player.maxHp,
            maxHp: player.maxHp,
            tmpHp: 0,
            multiple: false,
            isPlayer: true,
        }));
        useableEncounter.monsters.forEach(monsterGroup => {
            const multiple = monsterGroup.count > 1 ? true : false;
            for(let i = 0; i < monsterGroup.count; i++) {
                id++;
                creatureList.push({
                    id,
                    name: monsterGroup.monster.name,
                    hp: monsterGroup.monster.hp,
                    maxHp: monsterGroup.monster.hp,
                    tmpHp: 0,
                    monsterId: i,
                    multiple,
                    monster: monsterGroup.monster,
                    isPlayer: false,
                });
            }
        });
        return creatureList;
    }

    selectMonster(creature) {
        return _ => {
            this.setState({
                selectedMonster: creature.monster,
            });
        }
    }

    onCloseModal() {
        this.setState({
            selectedMonster: null,
        });
    }

    selectTarget(targetIdx) {
        return _ => {
            this.setState({
                targetIdx,
            })
        };
    }

    onDealToTarget(result) {
        console.log(result);
        const { targetIdx, creatureList } = this.state;
        const creature = creatureList[targetIdx];
        switch(result.type) {
            case DAMAGE: {
                let dmg = result.qty;
                if(creature.tmpHp > 0) {
                    if(dmg >= creature.tmpHp) {
                        dmg -= creature.tmpHp;
                        creature.tmpHp = 0;
                    } else {
                        creature.tmpHp -= dmg;
                        dmg = 0;
                    }
                    creature.hp -= dmg;
                } else {
                    creature.hp -= result.qty;
                }
                break;
            }
            case HEAL: {
                creature.hp += result.qty;
                if(creature.hp > creature.maxHp) {
                    creature.hp = creature.maxHp;
                }
                break;
            }
            case TEMP_HEALTH: {
                creature.tmpHp = result.qty;
                break;
            }
            default:
                console.error('Unknow health change type');
        }
        this.setState({
            targetIdx: null,
        })
    }

    removeCreature(idx) {
        return _ => {
            const { creatureList } = this.state;
            creatureList.splice(idx, 1);
            this.setState({
                creatureList,
            })
        };
    }

    onDragEnd(result) {
        let { creatureList } = this.state;
        const destIndex = result.destination.index;
        const currentIndex = result.source.index;
        const creature = creatureList[currentIndex];
        creatureList.splice(currentIndex, 1);
        creatureList.splice(destIndex, 0, creature);
        this.setState({
            creatureList,
        });
    }

    render() {
        const { creatureList, selectedMonster, targetIdx } = this.state;
        return (
            <div className='er-container'>
                <MonsterModal
                    monster={selectedMonster}
                    show={selectedMonster != null}
                    onCancel={this.onCloseModal}
                    editable={false}
                />
                <TargetModal
                    show={targetIdx !== null}
                    dealToTarget={this.onDealToTarget}
                />
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <DroppableWrapper className='er-droppable' droppableId='creatureList'>
                        { creatureList.map((creature, idx) => (
                            <DraggableWrapper className='er-draggable' key={creature.id} draggableId={creature.id.toString()} index={idx}>
                                <div className='er-creature-container'>
                                    <div onClick={creature.isPlayer ? null : this.selectMonster(creature)} className='er-element'>{buildDisplayString(creature)}</div>
                                    <div>
                                        <button className='er-element' onClick={this.selectTarget(idx)}>Target</button>
                                        {creature.hp <= 0 && <button className='er-element' onClick={this.removeCreature(idx)}>Remove</button>}
                                    </div>
                                </div>
                            </DraggableWrapper>
                        ))}
                    </DroppableWrapper>
                </DragDropContext>
            </div>
        );
    }
}

EncounterRunner.propTypes = {
    encounter: PropTypes.shape({
        name: PropTypes.string,
        monsters: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            count: PropTypes.number, 
        })),
        players: PropTypes.arrayOf(PropTypes.number),
    }),
    onChangeView: PropTypes.func.isRequired,
}

EncounterRunner.defaultProps = {
    encounter: null,
}

export default EncounterRunner;