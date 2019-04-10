import React from 'react';
import PropTypes from 'prop-types';

import './MonsterModal.css';

const DescriptionSection = ({ onChange, monster, editable }) => {
    if(editable) {
        return (
            <div className='monster-form-section border-bottom'>
                <div>Description:</div>
                <textarea className='textarea-size top-margin' onChange={onChange('description')} value={monster.description}/>
            </div>
        );
    }
    return (
        <div className='monster-form-section border-bottom mm-align-left'>
            <span>{monster.description}</span>
        </div>
    );
};

DescriptionSection.propTypes = {
    onChange: PropTypes.func.isRequired,
    monster: PropTypes.shape({}).isRequired,
    editable: PropTypes.bool.isRequired
}

DescriptionSection.defaultProps = {
}

export default DescriptionSection;