import React from 'react';
import PropTypes from 'prop-types';

const SizeSelector = ({ onChange, value }) => {
    return (
        <select value={value} onChange={onChange}>
            <option value="None" disabled hidden>Select Size</option>
            <option value="Tiny">Tiny</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Huge">Huge</option>
            <option value="Gargantuan">Gargantuan</option>
        </select>
    );
};

SizeSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
}

SizeSelector.defaultProps = {
    value: 'None'
}

export default SizeSelector;