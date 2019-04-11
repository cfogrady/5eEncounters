
import React from 'react';
import PropTypes from 'prop-types';

import './EncounterBuilder.css';

const EBPlayerList = ({ onAddPlayer, onRemovePlayer, playerList }) => {
    return (
        <div className='eb-list-container'>
            <button onClick={onAddPlayer}>Add Player</button>
            {playerList.map(player => (
                <div className='eb-list-element' key={player.id}>
                    <div className='eb-margin-element'>{`${player.characterName} (${player.playerName}) Level: ${player.level}, Max Hp: ${player.maxHp}`}</div>
                    <button className='eb-margin-element' onClick={onRemovePlayer(player.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

EBPlayerList.propTypes = {
    onAddPlayer: PropTypes.func.isRequired,
    onRemovePlayer: PropTypes.func.isRequired,
    playerList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

EBPlayerList.defaultProps = {
}

export default EBPlayerList;