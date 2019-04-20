import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from "react-beautiful-dnd";
import DroppableWrapper from '../../common/dnd/DroppableWrapper';
import DraggableWrapper from '../../common/dnd/DraggableWrapper';
import { buildUseableEncounter } from '../data-store/EncounterHelpers';
import MonsterModal from '../../monsters/modal/MonsterModal';
import { calculateMod } from '../../monsters/UnitConversionCalculator';
import { LIST } from '../Views';
import EncounterRunnerHeader from './EncounterRunnerHeader';

import './EncounterRunner.scss';
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

const random = (rangeStart, rangeEnd) => {
    const range = rangeEnd - rangeStart;
    return Math.floor(Math.random() * (range+1)) + rangeStart;
}

const withinRange = (number, rangeStart, rangeEnd) => {
    for(let i = rangeStart; i <= rangeEnd; i++) {
        if(number === i) {
            return true;
        }
    }
    return false;
}

class EncounterRunner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creatureList: [],
            selectedMonster: null,
            targetIdx: null,
            currentTurnIdx: null,
            showInitiative: false,
        };
        this.onDragEnd = this.onDragEnd.bind(this);
        this.selectMonster = this.selectMonster.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onDealToTarget = this.onDealToTarget.bind(this);
        this.removeCreature = this.removeCreature.bind(this);
        this.onStartTracking = this.onStartTracking.bind(this);
        this.onNextTurn = this.onNextTurn.bind(this);
        this.onPreviousTurn = this.onPreviousTurn.bind(this);
        this.toggleShowInitiative = this.toggleShowInitiative.bind(this);
        this.rollCreatureInitiatives = this.rollCreatureInitiatives.bind(this);
        this.sortByInitiative = this.sortByInitiative.bind(this);
        this.onChangeTargetInitiative = this.onChangeTargetInitiative.bind(this);
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
            initiative: 0,
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
                    initiative: 0,
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
        let { creatureList, currentTurnIdx } = this.state;
        if(result.destination == null) {
            return;
        }
        const destIndex = result.destination.index;
        const currentIndex = result.source.index;
        const creature = creatureList[currentIndex];
        creatureList.splice(currentIndex, 1);
        creatureList.splice(destIndex, 0, creature);
        const lowerIndex = currentIndex < destIndex ? currentIndex : destIndex;
        const higherIndex = currentIndex > destIndex ? currentIndex : destIndex;
        if(currentTurnIdx != null && currentIndex !== destIndex && withinRange(currentTurnIdx, lowerIndex, higherIndex)) {
            if(currentTurnIdx === currentIndex && currentIndex > destIndex) {
                currentTurnIdx ++;
            } else if(currentTurnIdx !== currentIndex && currentIndex < destIndex) {
                currentTurnIdx--;
            } else if(currentTurnIdx !== currentIndex) {
                currentTurnIdx++;
            }
            if(currentTurnIdx >= creatureList.length) {
                currentTurnIdx = 0;
            } else if(currentTurnIdx < 0) {
                currentTurnIdx = creatureList.length - 1;
            }
        }
        this.setState({
            creatureList,
            currentTurnIdx,
        });
    }

    onNextTurn() {
        const { creatureList } = this.state;
        let { currentTurnIdx } = this.state;
        currentTurnIdx++;
        if(currentTurnIdx >= creatureList.length) {
            currentTurnIdx = 0;
        }
        this.setState({
            currentTurnIdx,
        });
    }

    onPreviousTurn() {
        const { creatureList } = this.state;
        let { currentTurnIdx } = this.state;
        currentTurnIdx--;
        if(currentTurnIdx < 0) {
            currentTurnIdx = creatureList.length - 1;
        }
        this.setState({
            currentTurnIdx,
        });
    }

    onStartTracking() {
        this.setState({
            currentTurnIdx: 0,
        });
    }

    toggleShowInitiative(toggle) {
        this.setState({
            showInitiative: toggle.target.checked,
        });
    }

    rollCreatureInitiatives() {
        const { creatureList } = this.state;
        creatureList.forEach(creature => {
            if(!creature.isPlayer) {
                creature.initiative = random(1, 20) + calculateMod(creature.monster.stats.dex);
            }
        });
        this.setState({
            creatureList,
        });
    }

    sortByInitiative() {
        let { creatureList } = this.state;
        creatureList.sort((cr1, cr2) =>  cr2.initiative - cr1.initiative);
        this.setState({
            creatureList,
        });
    }

    onChangeTargetInitiative(idx) {
        return event => {
            const { creatureList } = this.state;
            creatureList[idx].initiative = event.target.value;
            this.setState({
                creatureList,
            });
        };
    }

    render() {
        const { creatureList, selectedMonster, targetIdx, currentTurnIdx, showInitiative } = this.state;
        return (
            <div className='er-container'>
                <EncounterRunnerHeader
                    onStartTracking={this.onStartTracking}
                    onNextTurn={this.onNextTurn}
                    onPreviousTurn={this.onPreviousTurn}
                    toggleShowInitiative={this.toggleShowInitiative}
                    rollCreatureInitiatives={this.rollCreatureInitiatives}
                    sortByInitiative={this.sortByInitiative}
                    showInitiative={showInitiative}
                    currentTurnIdx={currentTurnIdx}
                />
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
                                <div className={`er-creature-container ${currentTurnIdx !== idx ? 'er-primary' : 'er-secondary'}`}>
                                    <div className='er-element'>
                                        <span onClick={creature.isPlayer ? null : this.selectMonster(creature)}>{buildDisplayString(creature)}</span>
                                        {showInitiative && <input className="initiative-input" type="number" value={creature.initiative} onChange={this.onChangeTargetInitiative(idx)}/>}
                                    </div>
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