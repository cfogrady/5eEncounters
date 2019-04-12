import React from 'react';
import PropTypes from 'prop-types';

const SkillSelector = ({ onChange, value }) => {
    return (
        <select value={value} onChange={onChange}>
            <option value="None" disabled hidden>Select Skill</option>
            <option value="Acrobatics">Acrobatics</option>
            <option value="Animal Handling">Animal Handling</option>
            <option value="Arcana">Arcana</option>
            <option value="Athletics">Athletics</option>
            <option value="Deception">Deception</option>
            <option value="History">History</option>
            <option value="Insight">Insight</option>
            <option value="Intimidation">Intimidation</option>
            <option value="Investigation">Investigation</option>
            <option value="Medicine">Medicine</option>
            <option value="Nature">Nature</option>
            <option value="Perception">Perception</option>
            <option value="Performance">Performance</option>
            <option value="Persuasion">Persuasion</option>
            <option value="Religion">Religion</option>
            <option value="Sleight of Hand">Sleight Of Hand</option>
            <option value="Stealth">Stealth</option>
            <option value="Survival">Survival</option>
        </select>
    );
};

SkillSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
}

SkillSelector.defaultProps = {
    value: 'None'
}

export default SkillSelector;