import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './EncountersListHeader.css';

class EncountersListHeader extends Component {
    /*constructor(props) {
        super(props);
        //this.getDisplayElement = this.getDisplayElement.bind(this);
    }*/

    render() {
        const { onAddEncounter, onNameFilter, filterName } = this.props;
        return (
            <div className='encounters-list-header'>
                <input
                    className='elh-component'
                    placeholder='Filter By Name'
                    type='search'
                    value={filterName || ''}
                    onChange={onNameFilter}
                />
                <button className='elh-component' onClick={onAddEncounter}>Add Encounter</button>
            </div>
        );
    }
}

EncountersListHeader.propTypes = {
    filterName: PropTypes.string,
    onNameFilter: PropTypes.func.isRequired,
    onAddEncounter: PropTypes.func.isRequired,
};

EncountersListHeader.defaultProps = {
    filterName: null,
};

export default EncountersListHeader;
