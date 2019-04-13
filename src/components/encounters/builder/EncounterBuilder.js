import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { buildEmptyEncounter, addEncounter } from '../data-store/Encounters';
import { buildUseableEncounter, buildStorableEncounter } from '../data-store/EncounterHelpers';
import MonsterViewer from '../../monsters/MonsterViewer';
import PlayerViewer from '../../players/PlayerViewer';
import { LIST } from '../Views';
import EBMonsterList from './EBMonsterList';
import EBPlayerList from './EBPlayerList';
import { findThreshold } from './XPThresholds';

import './EncounterBuilder.css';

const calculateDifficulty = encounter => {
    const thresholds = encounter.players.map(player => findThreshold(player.level));
    const threshold = thresholds.reduce((totalThreshold, currentValue) => {
        totalThreshold.easy += currentValue.easy;
        totalThreshold.medium += currentValue.medium;
        totalThreshold.hard += currentValue.hard;
        totalThreshold.deadly += currentValue.deadly;
        return totalThreshold;
    }, {easy: 0, medium: 0, hard: 0, deadly: 0});
    const monsterXpAndCount = encounter.monsters.reduce((total, monsterGroup) => {
        total.xp += (monsterGroup.monster.xp * monsterGroup.count);
        total.count += (monsterGroup.count);
        return total;
    }, {xp: 0, count: 0});
    let monsterXp = monsterXpAndCount.xp;
    const count = monsterXpAndCount.count;
    if(count >= 15) {
        monsterXp *= 4;
    } else if(count >= 11) {
        monsterXp *= 3;
    } else if(count >= 7) {
        monsterXp *= 2.5;
    } else if (count >= 3) {
        monsterXp *= 2;
    } else if (count === 2) {
        monsterXp *= 1.5;
    }
    if(monsterXp > threshold.deadly) {
        return 'Deadly';
    } else if(monsterXp > threshold.hard) {
        return 'Hard';
    } else if (monsterXp > threshold.medium) {
        return 'Medium';
    } else if (monsterXp > threshold.easy) {
        return 'Easy';
    } else {
        return 'Trivial';
    }
}

class EncounterBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            encounter: null,
            selectingMonster: false,
            selectingPlayer: false,
            difficulty: 'Easy',
        };
        this.addPlayer = this.addPlayer.bind(this);
        this.addMonster = this.addMonster.bind(this);
        this.onSelectPlayer = this.onSelectPlayer.bind(this);
        this.onSelectMonster = this.onSelectMonster.bind(this);
        this.onRemovePlayer = this.onRemovePlayer.bind(this);
        this.onRemoveMonster = this.onRemoveMonster.bind(this);
        this.changeName = this.changeName.bind(this);
        this.onChangeMonsterQty = this.onChangeMonsterQty.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
        let { encounter } = this.props;
        if(encounter == null) {
            encounter = buildEmptyEncounter();
            this.setState({
                encounter,
                difficulty: calculateDifficulty(encounter),
            });
        } else {
            buildUseableEncounter(encounter).then(useableEncounter => {
                this.setState({
                    encounter: useableEncounter,
                    difficulty: calculateDifficulty(useableEncounter),
                });
            });
        }
    }

    changeName(event) {
        const { encounter } = this.state;
        encounter.name = event.target.value;
        this.setState({
            encounter,
        })
    }

    addPlayer() {
        this.setState({
            selectingPlayer: true,
        })
    }

    addMonster() {
        this.setState({
            selectingMonster: true,
        })
    }

    onSelectPlayer(player) {
        const { encounter } = this.state;
        encounter.players.push(player);
        this.setState({
            selectingPlayer: false,
            difficulty: calculateDifficulty(encounter),
        })
    }

    onSelectMonster(monster) {
        const { encounter } = this.state;
        encounter.monsters.push({
            monster,
            count: 1,
        });
        this.setState({
            selectingMonster: false,
            difficulty: calculateDifficulty(encounter),
        })
    }

    onChangeMonsterQty(monsterId) {
        return event => {
            const { encounter } = this.state;
            const qty = parseInt(event.target.value);
            encounter.monsters.forEach(monsterGroup => {
                if(monsterGroup.monster.id === monsterId) {
                    monsterGroup.count = qty;
                }
            });
            this.setState({
                encounter,
                difficulty: calculateDifficulty(encounter),
            })
        }
    }

    onRemovePlayer(playerId) {
        return _ => {
            const { encounter } = this.state;
            encounter.players = encounter.players.filter(player => player.id !== playerId);
            this.setState({
                encounter,
                difficulty: calculateDifficulty(encounter),
            });
        }
    }

    onRemoveMonster(monsterId) {
        return _ => {
            const { encounter } = this.state;
            encounter.monsters = encounter.monsters.filter(monster => monster.monster.id !== monsterId);
            this.setState({
                encounter,
                difficulty: calculateDifficulty(encounter),
            });
        }
    }

    onSave() {
        const { encounter } = this.state;
        addEncounter(buildStorableEncounter(encounter)).then(_ => this.props.onChangeView(LIST));
    }

    render() {
        const { encounter, selectingMonster, selectingPlayer, difficulty } = this.state;
        if(encounter == null) {
            return (<div>Loading Encounter...</div>)
        } else if(selectingMonster) {
            return (<MonsterViewer onSelectMonster={this.onSelectMonster}/>);
        } else if(selectingPlayer) {
            return (<PlayerViewer onSelectPlayer={this.onSelectPlayer}/>);
        }
        return (
            <div className='eb-view'>
                <div className='eb-header'>
                <input
                    className='eb-name-input'
                    type='text'
                    placeholder='Name Encounter'
                    onChange={this.changeName}
                    value={encounter.name}
                />
                <button className='eb-margin-element' onClick={this.onSave}>Save</button>
                </div>
                <div className='eb-difficulty-text'>Difficulty:&nbsp;{difficulty}</div>
                <div className='eb-groups-container'>
                    <EBPlayerList playerList={encounter.players} onAddPlayer={this.addPlayer} onRemovePlayer={this.onRemovePlayer}/>
                    <EBMonsterList monsterList={encounter.monsters} onAddMonster={this.addMonster} onRemoveMonster={this.onRemoveMonster} onChangeMonsterQty={this.onChangeMonsterQty}/>
                </div>
            </div>
        );
    }
};

EncounterBuilder.propTypes = {
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

EncounterBuilder.defaultProps = {
    encounter: null,
}

export default EncounterBuilder;