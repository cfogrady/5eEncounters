import React from 'react';
import PropTypes from 'prop-types';

const ConditionSelector = ({ onChange, value }) => {
    return (
        <select value={value} onChange={onChange}>
            <option value="None" disabled hidden>Select Condition</option>
            <option value="Blinded">Blinded</option>
            <option value="Charmed">Charmed</option>
            <option value="Deafened">Deafened</option>
            <option value="Fatigued">Fatigued</option>
            <option value="Frightened">Frightened</option>
            <option value="Grappled">Grappled</option>
            <option value="Incapacitated">Incapacitated</option>
            <option value="Invisible">Invisible</option>
            <option value="Paralyzed">Paralyzed</option>
            <option value="Petrified">Petrified</option>
            <option value="Poisoned">Poisoned</option>
            <option value="Prone">Prone</option>
            <option value="Restrained">Restrained</option>
            <option value="Stunned">Stunned</option>
            <option value="Unconscious">Unconscious</option>
            <option value="Exhaustion">Exhaustion</option>
        </select>
    );
};

ConditionSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
}

ConditionSelector.defaultProps = {
    value: 'None'
}

export default ConditionSelector;