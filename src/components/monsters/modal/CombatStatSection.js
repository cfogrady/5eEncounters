import React from 'react';
import PropTypes from 'prop-types';

import './MonsterModal.css';

const CombatStatSection = ({ onChangeNumber, monster, editable }) => {
    if(editable) {
        return (
            <div className="column-container">
                <input className="top-margin" type='number' placeholder='AC' onChange={onChangeNumber('ac')} value={monster.ac || ''}/>
                <input className="top-margin" type='number' placeholder='HP' onChange={onChangeNumber('hp')} value={monster.hp || ''}/>
                <input className="top-margin" type='number' placeholder='Speed (ft)' onChange={onChangeNumber('speed')} value={monster.speed || ''}/>
            </div>
        );
    }
    return (
        <div>
            <div className='monster-form-row-section'>
                <span className='red-text bold-text'>Armor Class: </span>
                <span className='red-text'>{monster.ac}</span>
            </div>
            <div className='monster-form-row-section'>
                <span className='red-text bold-text'>Hit Points: </span>
                <span className='red-text'>{monster.hp}</span>
            </div>
            <div className='monster-form-row-section'>
                <span className='red-text bold-text'>Speed: </span>
                <span className='red-text'>{monster.speed} ft.</span>
            </div>
        </div>
    );
};

CombatStatSection.propTypes = {
    onChangeNumber: PropTypes.func.isRequired,
    monster: PropTypes.shape({}).isRequired,
    editable: PropTypes.bool.isRequired
}

CombatStatSection.defaultProps = {
}

export default CombatStatSection;