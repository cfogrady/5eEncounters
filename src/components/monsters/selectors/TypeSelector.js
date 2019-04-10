import React from 'react';
import PropTypes from 'prop-types';

const TypeSelector = ({ onChange, value }) => {
    return (
        <select value={value} onChange={onChange}>
            <option value="None" disabled hidden>Select Monster Type</option>
            <option value="Aberration">Aberration</option>
            <option value="Beast">Beast</option>
            <option value="Celestial">Celestial</option>
            <option value="Construct">Construct</option>
            <option value="Dragon">Dragon</option>
            <option value="Elemental">Elemental</option>
            <option value="Fey">Fey</option>
            <option value="Fiend">Fiend</option>
            <option value="Giant">Giant</option>
            <option value="Humanoid">Humanoid</option>
            <option value="Monstrosity">Monstrosity</option>
            <option value="Ooze">Ooze</option>
            <option value="Plant">Plant</option>
            <option value="Undead">Undead</option>
        </select>
    );
};

TypeSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
}

TypeSelector.defaultProps = {
    value: 'None'
}

export default TypeSelector;