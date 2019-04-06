import React, { Component } from 'react';
import './EncounterTracker.css';

class EncounterTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: []
        };
    }

    addParticipant(participant) {
        const { participants } = this.state;
        this.setState({
            participants: [...participants, participant]
        });
    }

    render() {
        return(
        <div className="encounter-tracker-page">
        </div>
        );
    }
}

export default EncounterTracker;