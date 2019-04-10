import React from 'react';
import PropTypes from 'prop-types';
import { xpToCR } from '../UnitConversionCalculator';

const CRSelector = ({ onChange, value, showSelect }) => {
    return (
        <select value={value} onChange={onChange}>
            <option value='' disabled={!showSelect} hidden={!showSelect}>Select CR</option>
            { Object.keys(xpToCR).map(xp => (
                <option key={xp} value={xp}>{`${xpToCR[xp]} (${xp} exp)`}</option>
            ))}
        </select>
    );
};

CRSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    showSelect: PropTypes.bool,
}

CRSelector.defaultProps = {
    showSelect: false,
}

export default CRSelector;