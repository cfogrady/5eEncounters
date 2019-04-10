import React from 'react';
import PropTypes from 'prop-types';
import SizeSelector from '../selectors/SizeSelector';
import TypeSelector from '../selectors/TypeSelector';
import AlignmentSelector from '../selectors/AlignmentSelector';

import './MonsterModal.css';

const NameSection = ({ onChange, monster, editable }) => {
    if(editable) {
        return (
            <div className='monster-form-section border-bottom'>
                <input type='text' placeholder='Monster Name' onChange={onChange('name')} value={monster.name || ''}/>
                <div className='monster-form-row-section'>
                    <SizeSelector value={monster.size || 'None'} onChange={onChange('size')}/>
                    <div className='left-margin'><TypeSelector value={monster.type || 'None'} onChange={onChange('type')}/></div>
                    <div className='left-margin'><AlignmentSelector value={monster.alignment || 'None'} onChange={onChange('alignment')}/></div>
                </div>
            </div>
        );
    }
    return (
        <div className='monster-form-section border-bottom'>
            <span className='red-text bold-text'>{monster.name}</span>
            <span>{`${monster.size} ${monster.type}, ${monster.alignment}`}</span>
        </div>
    );
};

NameSection.propTypes = {
    onChange: PropTypes.func.isRequired,
    monster: PropTypes.shape({}).isRequired,
    editable: PropTypes.bool.isRequired
}

NameSection.defaultProps = {
}

export default NameSection;