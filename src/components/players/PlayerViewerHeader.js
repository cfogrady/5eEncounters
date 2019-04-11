import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './PlayerViewerHeader.css';

class PlayerViewerHeader extends Component {
    /*constructor(props) {
        super(props);
        //this.getDisplayElement = this.getDisplayElement.bind(this);
    }*/

    render() {
        const { onAddPlayer, onNameFilter, filterName } = this.props;
        return (
            <div className='player-viewer-header'>
                <input
                    className='pvh-first-element'
                    placeholder='Filter By Player Name'
                    type='search'
                    value={filterName || ''}
                    onChange={onNameFilter}
                />
                <button className='pvh-last-element' onClick={onAddPlayer}>Add Player</button>
            </div>
        );
    }
}

PlayerViewerHeader.propTypes = {
    filterName: PropTypes.string,
    onNameFilter: PropTypes.func.isRequired,
    onAddPlayer: PropTypes.func.isRequired,
};

PlayerViewerHeader.defaultProps = {
    filterName: null,
};

export default PlayerViewerHeader;
