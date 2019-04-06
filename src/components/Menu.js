import React from 'react';
import PropTypes from 'prop-types';

import './Menu.css';

const Menu = ({ menuItems, onSelect }) => {
    return (
        <div className="menu-page">
            {menuItems.map(value => (<div className="menu-item" key={value} onClick={onSelect(value)}>{value}</div>))}
        </div>
    );
};

Menu.propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelect: PropTypes.func.isRequired,
}

Menu.defaultProps = {

}

export default Menu;