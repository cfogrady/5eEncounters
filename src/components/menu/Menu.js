import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

import './Menu.css';

const Menu = ({ menuItems, onSelect }) => {
    return (
        <div className="menu-page">
            {menuItems.map(value => (<MenuItem key={value} value={value} onSelect={onSelect}/>))}
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