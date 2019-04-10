import React from 'react';
import PropTypes from 'prop-types';

import './MonsterModal.css';

const CombatSection = ({ onChangeNumber, monster, editable }) => {
    if(editable) {
        return (
            <div className='monster-form-section border-bottom'>
                <input className="top-margin" type='number' placeholder='AC' onChange={onChangeNumber('ac')} value={monster.ac || ''}/>
                <input className="top-margin" type='number' placeholder='HP' onChange={onChangeNumber('hp')} value={monster.hp || ''}/>
                <input className="top-margin" type='number' placeholder='Speed (ft)' onChange={onChangeNumber('speed')} value={monster.speed || ''}/>
            </div>
        );
    }
    return (
        <div className='monster-form-section border-bottom'>
            <div className='row-container'>
                <span className='red-text bold-text'>Armor Class:&nbsp;</span>
                <span className='red-text'>{monster.ac}</span>
            </div>
            <div className='row-container'>
                <span className='red-text bold-text'>Hit Points:&nbsp;</span>
                <span className='red-text'>{monster.hp}</span>
            </div>
            <div className='row-container'>
                <span className='red-text bold-text'>Speed:&nbsp;</span>
                <span className='red-text'>{monster.speed} ft.</span>
            </div>
        </div>
    );
};

CombatSection.propTypes = {
    onChangeNumber: PropTypes.func.isRequired,
    monster: PropTypes.shape({}).isRequired,
    editable: PropTypes.bool.isRequired
}

CombatSection.defaultProps = {
}

export default CombatSection;