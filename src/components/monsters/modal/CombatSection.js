import React from 'react';
import PropTypes from 'prop-types';

import './MonsterModal.css';

const CombatSection = ({ onChangeNumber, onChange, monster, editable }) => {
    if(editable) {
        return (
            <div className='monster-form-section border-bottom'>
                <input className="mm-margin-element number-size" type='number' placeholder='AC' onChange={onChangeNumber('ac')} value={monster.ac || ''}/>
                <div className='row-container top-margin'>
                    <input type='number' className='mm-margin-element number-size' placeholder='HP' onChange={onChangeNumber('hp')} value={monster.hp || ''}/>
                    <input className='mm-margin-element mm-hit-die' placeholder='Hid Die' onChange={onChange('hitDie')} value={monster.hitDie || ''}/>
                </div>
                <input className="mm-margin-element" type='text' placeholder='Speed' onChange={onChange('speed')} value={monster.speed || ''}/>
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
                <span className='red-text'>{monster.hp}&nbsp;({monster.hitDie})</span>
            </div>
            <div className='row-container'>
                <span className='red-text bold-text'>Speed:&nbsp;</span>
                <span className='red-text'>{monster.speed}</span>
            </div>
        </div>
    );
};

CombatSection.propTypes = {
    onChangeNumber: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    monster: PropTypes.shape({}).isRequired,
    editable: PropTypes.bool.isRequired
}

CombatSection.defaultProps = {
}

export default CombatSection;