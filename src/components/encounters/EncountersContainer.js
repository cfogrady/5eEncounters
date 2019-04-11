import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { LIST, BUILDER, RUNNER } from './Views';
import EncountersList from './list/EncountersList';
import EncounterBuilder from './builder/EncounterBuilder';

class EncountersContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: LIST,
            encounter: null,
        };
        this.onChangeView = this.onChangeView.bind(this);
    }

    onChangeView(view, encounter = null) {
        this.setState({
            view,
            encounter,
        });
    }

    render() {
        const { view, encounter } = this.state;
        switch(view) {
            case LIST: {
                return (<EncountersList onChangeView={this.onChangeView}/>);
            }
            case BUILDER: {
                return (<EncounterBuilder onChangeView={this.onChangeView} encounter={encounter}/>)
            }
            default: {
                console.error('Received unknown encounter view');
            }
        }
        return null;
    }
};

EncountersContainer.propTypes = {
}

EncountersContainer.defaultProps = {
}

export default EncountersContainer;