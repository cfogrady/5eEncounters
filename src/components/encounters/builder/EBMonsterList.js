import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { calculateCR } from '../../monsters/UnitConversionCalculator';
import MonsterModal from '../../monsters/modal/MonsterModal';

import './EncounterBuilder.css';

class EBMonsterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMonster: null,
        };
        this.viewMonster = this.viewMonster.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    viewMonster(monster) {
        return _ => {
            this.setState({
                viewMonster: monster,
            });
        }
    }

    closeModal() {
        this.setState({
            viewMonster: null,
        });
    }

    render() {
        const { onAddMonster, monsterList, onRemoveMonster, onChangeMonsterQty } = this.props;
        const { viewMonster } = this.state;
        return (
            <div className='eb-list-container'>
                <button onClick={onAddMonster}>Add Monster</button>
                {monsterList.map(monsterGroup => (
                    <div key={monsterGroup.monster.id} className='eb-list-element'>
                        <input type='number' className='eb-number-input' onChange={onChangeMonsterQty(monsterGroup.monster.id)} value={monsterGroup.count}></input>
                        <div onClick={this.viewMonster(monsterGroup.monster)} className='eb-margin-element eb-clickable'>{`${monsterGroup.monster.name} CR ${calculateCR(monsterGroup.monster.xp)}`}</div>
                        <button className='eb-margin-element' onClick={onRemoveMonster(monsterGroup.monster.id)}>Delete</button>
                    </div>
                ))}
                <MonsterModal
                    monster={viewMonster}
                    show={viewMonster != null}
                    onCancel={this.closeModal}
                    editable={false}
                />
            </div>
        );
    }
}

EBMonsterList.propTypes = {
    onAddMonster: PropTypes.func.isRequired,
    onRemoveMonster: PropTypes.func.isRequired,
    onChangeMonsterQty: PropTypes.func.isRequired,
    monsterList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

EBMonsterList.defaultProps = {
}

export default EBMonsterList;