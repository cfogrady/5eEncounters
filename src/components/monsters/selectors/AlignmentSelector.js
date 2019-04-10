import React from 'react';
import PropTypes from 'prop-types';

const AlignmentSelector = ({ onChange, value }) => {
    return (
        <select value={value} onChange={onChange}>
            <option value="None" disabled hidden>Select Alignment</option>
            <option value="Unaligned">Unaligned</option>
            <option value="Lawful Good">Lawful Good</option>
            <option value="Neutral Good">Neutral Good</option>
            <option value="Chaotic Good">Chaotic Good</option>
            <option value="Lawful Neutral">Lawful Neutral</option>
            <option value="True Neutral">True Neutral</option>
            <option value="Chaotic Neutral">Chaotic Neutral</option>
            <option value="Lawful Evil">Lawful Evil</option>
            <option value="Neutral Evil">Neutral Evil</option>
            <option value="Chaotic Evil">Chaotic Evil</option>
        </select>
    );
};

AlignmentSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
}

AlignmentSelector.defaultProps = {
    value: 'None'
}

export default AlignmentSelector;