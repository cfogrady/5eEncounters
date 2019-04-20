import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAllEncounters, removeEncounterById } from '../data-store/Encounters';
import { BUILDER, RUNNER } from '../Views';
import EncountersListHeader from './EncountersListHeader';

import './EncountersList.scss';

const sortEncounterList = encounterList => {
    return encounterList.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

class EncountersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            encounterList: [],
            loading: true,
            filterName: null,
        };
        this.onNameFilter = this.onNameFilter.bind(this);
        this.onDeleteEncounter = this.onDeleteEncounter.bind(this);
        this.onEditEncounter = this.onEditEncounter.bind(this);
        this.onRunEncounter = this.onRunEncounter.bind(this);
    }

    componentDidMount() {
        getAllEncounters().then(encounterList => {
            this.setState({
                encounterList: sortEncounterList(encounterList),
                loading: false,
            });
        }).catch(error => {
            console.error(error);
        });
    }

    onNameFilter(event) {
        const filterName = event.target.value;
        this.setState({
            filterName,
        });
    }

    onEditEncounter(encounter = null) {
        return _ => this.props.onChangeView(BUILDER, encounter);
    }

    onRunEncounter(encounter = null) {
        return _ => this.props.onChangeView(RUNNER, encounter);
    }

    onDeleteEncounter(encounterId) {
        return _ => {
            let { encounterList } = this.state;
            encounterList = encounterList.filter(encounter => encounter.id !== encounterId);
            removeEncounterById(encounterId);
            this.setState({
                encounterList: sortEncounterList(encounterList),
            });
        }
    }

    render() {
        const { encounterList, filterName } = this.state;
        const formattedFilterName = filterName == null || filterName === '' ? null : filterName.toUpperCase();
        return (
        <div className='el-view'>
            <EncountersListHeader
                filterName={filterName}
                onAddEncounter={this.onEditEncounter()}
                onNameFilter={this.onNameFilter}
            />
            {encounterList.filter(encounter => {
                const nameMatch = formattedFilterName == null || encounter.name.toUpperCase().indexOf(formattedFilterName) >= 0;
                return nameMatch;
            }).map(encounter => (
                <div className='el-encounter' key={encounter.id}>
                    <div>{encounter.name}</div>
                    <div className='el-margin-top el-row-space-between'>
                        <button className='el-row-force-space' onClick={this.onEditEncounter(encounter)}>Edit</button>
                        <button className='el-row-force-space' onClick={this.onDeleteEncounter(encounter.id)}>Delete</button>
                        <button className='el-row-force-space'
                            onClick={this.onRunEncounter(encounter)}
                        >Run</button>
                    </div>
                </div>
            ))}
        </div>
        );
    }
};

EncountersList.propTypes = {
    onChangeView: PropTypes.func.isRequired,
}

EncountersList.defaultProps = {
}

export default EncountersList;