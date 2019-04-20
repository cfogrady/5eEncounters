import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAllPlayers, removePlayerById, addPlayer, buildEmptyPlayer } from './data-store/Players';
import PlayerViewerHeader from './PlayerViewerHeader';

import './PlayerViewer.scss';
import PlayerModal from './modal/PlayerModal';
import SelectOrEditModal from '../common/modals/SelectOrEditModal';
import LoadingModal from '../common/modals/LoadingModal';

/*const sortPlayerListByCharacter = playerList => {
    return playerList.sort((a, b) => {
        const nameA = a.characterName.toUpperCase(); // ignore upper and lowercase
        const nameB = b.characterName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}*/

const sortPlayerListByPlayer = playerList => {
    return playerList.sort((a, b) => {
        const nameA = a.playerName.toUpperCase(); // ignore upper and lowercase
        const nameB = b.playerName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

class PlayerViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerList: [],
            loading: true,
            filterName: null,
            selectedPlayer: null,
            selectOrEditPlayer: null,
        };
        this.onNameFilter = this.onNameFilter.bind(this);
        this.onDeletePlayer = this.onDeletePlayer.bind(this);
        this.onSavePlayer = this.onSavePlayer.bind(this);
        this.onCancelPlayerModal = this.onCancelPlayerModal.bind(this);
        this.onPlayerChange = this.onPlayerChange.bind(this);
        this.viewPlayer = this.viewPlayer.bind(this);
        this.changePlayer = this.changePlayer.bind(this);
        this.onAddPlayer = this.onAddPlayer.bind(this);
        this.sortMethod = sortPlayerListByPlayer;
    }

    componentDidMount() {
        getAllPlayers().then(playerList => {
            this.setState({
                playerList: this.sortMethod(playerList),
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

    onPlayerChange(player) {
        this.setState({
            selectedPlayer: player,
            selectOrEditPlayer: null,
        });
    }

    viewPlayer(player) {
        this.onPlayerChange(player);
    }

    changePlayer(player) {
        return _ => {
            if(this.props.onSelectPlayer == null) {
                this.onPlayerChange(player);
            } else {
                this.setState({
                    selectOrEditPlayer: player,
                })
            }
        };
    }

    onAddPlayer() {
        this.setState({
            selectedPlayer: buildEmptyPlayer(),
        })
    }

    onCancelPlayerModal() {
        this.setState({
            selectedPlayer: null,
        });
    }

    onDeletePlayer() {
        const player = this.state.selectedPlayer;
        let { playerList } = this.state;
        playerList = playerList.filter(plyr => plyr.id !== player.id);
        removePlayerById(player.id);
        this.setState({
            selectedPlayer: null,
            playerList: this.sortMethod(playerList),
        });
    }

    onSavePlayer() {
        const player = this.state.selectedPlayer;
        let { playerList } = this.state;
        if(player.id == null) {
            addPlayer(player).then(id => {
                player.id = id;
                playerList = playerList.concat([player])
                this.setState({
                    selectedPlayer: null,
                    playerList: this.sortMethod(playerList),
                });
            });
        } else {
            playerList = playerList.map(plyr => {
                if(plyr.id !== player.id) {
                    return plyr;
                }
                return player;
            });
            addPlayer(player); //acts as a put
            this.setState({
                selectedPlayer: null,
                playerList: this.sortMethod(playerList),
            });
        }
    }

    render() {
        const { loading, playerList, selectedPlayer, filterName, selectOrEditPlayer } = this.state;
        const { onSelectPlayer } = this.props;
        const showSelectedPlayer = selectedPlayer != null;
        const showSelectOrEditPlayer = selectOrEditPlayer != null;
        const formattedFilterName = filterName == null || filterName === '' ? null : filterName.toUpperCase();
        return (
        <div className='pv-view'>
            <PlayerViewerHeader
                filterName={filterName}
                onAddPlayer={this.onAddPlayer}
                onNameFilter={this.onNameFilter}
            />
            <LoadingModal show={loading}/>
            <SelectOrEditModal
                onSelect={_ => onSelectPlayer(selectOrEditPlayer)}
                onView={_ => this.viewPlayer(selectOrEditPlayer)}
                show={showSelectOrEditPlayer}
            />
            <PlayerModal
                player={selectedPlayer}
                show={showSelectedPlayer}
                onSave={this.onSavePlayer}
                onCancel={this.onCancelPlayerModal}
                onDelete={this.onDeletePlayer}
                onPlayerChange={this.onPlayerChange}
            />
            {playerList.filter(player => {
                const nameMatch = formattedFilterName == null || player.playerName.toUpperCase().indexOf(formattedFilterName) >= 0;
                return nameMatch;
            }).map(player => (
                <div className='pv-player' key={player.id} onClick={this.changePlayer(player)}>
                    <div>{`${player.characterName} (${player.playerName})`}</div>
                    <div>Level: {player.level} Max Hp: {player.maxHp}</div>
                </div>
            ))}
        </div>
        );
    }
};

PlayerViewer.propTypes = {
    onSelectPlayer: PropTypes.func,
}

PlayerViewer.defaultProps = {
    onSelectPlayer: null,
}

export default PlayerViewer;