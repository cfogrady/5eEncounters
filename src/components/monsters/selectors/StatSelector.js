import React from 'react';
import PropTypes from 'prop-types';

const StatSelector = ({ onChange, value }) => {
    return (
        <select value={value} onChange={onChange}>
            <option value="None" disabled hidden>Select Stat</option>
            <option value="STR">STR</option>
            <option value="DEX">DEX</option>
            <option value="CON">CON</option>
            <option value="INT">INT</option>
            <option value="WIS">WIS</option>
            <option value="CHA">CHA</option>
        </select>
    );
};

StatSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
}

StatSelector.defaultProps = {
    value: 'None'
}

export default StatSelector;