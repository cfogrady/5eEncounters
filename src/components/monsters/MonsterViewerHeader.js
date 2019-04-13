import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CRSelector from './selectors/CRSelector';

import './MonsterViewerHeader.css';

class MonsterViewerHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monsterList: [],
            loading: true,
        };
        /*this.getDisplayElement = this.getDisplayElement.bind(this);*/
    }

    render() {
        const { onAddMonster, filterXp, onXPFilter, onNameFilter, filterName } = this.props;
        return (
            <div className='monster-viewer-header'>
                <div className='mvh-row'>
                    <input
                        className='mvh-filter'
                        placeholder='Filter By Monster Name'
                        type='search'
                        value={filterName || ''}
                        onChange={onNameFilter}
                    />
                    <div className='mvh-left-margin'>
                        <CRSelector
                            value={filterXp == null ? '' : filterXp.toString()}
                            onChange={onXPFilter}
                            showSelect={true}
                        />
                    </div>
                </div>
                <div className='mvh-row'>
                    <button onClick={onAddMonster}>Add Monster</button>
                </div>
            </div>
        );
    }
}

MonsterViewerHeader.propTypes = {
    filterXp: PropTypes.number,
    filterName: PropTypes.string,
    onAddMonster: PropTypes.func.isRequired,
    onXPFilter: PropTypes.func.isRequired,
    onNameFilter: PropTypes.func.isRequired,
};

MonsterViewerHeader.defaultProps = {
    filterXp: null,
    filterName: null,
};

export default MonsterViewerHeader;
