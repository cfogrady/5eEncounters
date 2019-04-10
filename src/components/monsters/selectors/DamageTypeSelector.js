import React from 'react';
import PropTypes from 'prop-types';

const DamageTypeSelector = ({ onChange, value }) => {
    return (
        <select value={value} onChange={onChange}>
            <option value="None" disabled hidden>Select Damage Type</option>
            <option value="Acid">Acid</option>
            <option value="Bludgeoning">Bludgeoning</option>
            <option value="Cold">Cold</option>
            <option value="Fire">Fire</option>
            <option value="Force">Force</option>
            <option value="Lightning">Lightning</option>
            <option value="Necrotic">Necrotic</option>
            <option value="Piercing">Piercing</option>
            <option value="Poison">Poison</option>
            <option value="Psychic">Psychic</option>
            <option value="Radiant">Radiant</option>
            <option value="Slashing">Slashing</option>
            <option value="Thunder">Thunder</option>
        </select>
    );
};

DamageTypeSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
}

DamageTypeSelector.defaultProps = {
    value: 'None'
}

export default DamageTypeSelector;