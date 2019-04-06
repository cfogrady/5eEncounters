import React from 'react';
import PropTypes from 'prop-types';

import './MenuItem.css';

const MenuItem = ({ value , onSelect }) => {
    return (
        <div className="menu-item" key={value} onClick={onSelect(value)}>{value}</div>
    );
};

MenuItem.propTypes = {
    value: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};

MenuItem.defaultProps = {

};

export default MenuItem;