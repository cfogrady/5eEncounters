import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop, clone } from 'underscore';
import SimpleModal from '../../common/modals/SimpleModal';

import './PlayerModal.css';

const setPathValue = (object, path, value) => {
    const splitPath = path.split(".");
    let location = object;
    for(let i = 0; i < splitPath.length; i++) {
        const currentPath = splitPath[i];
        if(i === splitPath.length -1) {
            location[currentPath] = value;
        } else {
            if(location[currentPath] == null) {
                location[currentPath] = {};
            }
            location = location[currentPath];
        }
    }
}

class PlayerModal extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
    }

    onChange(path) {
        const { player } = this.props;
        return event => {
            const value = event.target.value;
            const newPlayer = clone(player);
            setPathValue(newPlayer, path, value);
            this.props.onPlayerChange(newPlayer);
        }
    }

    onChangeNumber(path) {
        const { player } = this.props;
        return event => {
            const value = parseInt(event.target.value);
            const newPlayer = clone(player);
            setPathValue(newPlayer, path, value);
            this.props.onPlayerChange(newPlayer);
        }
    }

    render() {
        const { show, player, onSave, onCancel, onDelete } = this.props;
        if(player == null) {
            return null;
        }
        return (
            <SimpleModal show={show}>
                <div className='player-modal-form'>
                    <div className='pm-row-container pm-flex-start pm-margin-top'>
                        <input
                            className='pm-first-element'
                            type='text'
                            placeholder='Player Name'
                            onChange={this.onChange('playerName')} value={player.playerName || ''}
                        />
                        <input
                            className='pm-margin-left pm-input'
                            type='text'
                            placeholder='Character Name'
                            onChange={this.onChange('characterName')} value={player.characterName || ''}
                        />
                        <input
                            className='pm-margin-left pm-number-input'
                            type='number'
                            placeholder='Max Hp'
                            onChange={this.onChangeNumber('maxHp')} value={player.maxHp || ''}
                        />
                    </div>
                    <div className='pm-row-container pm-space-between pm-margin-top pm-margin-bottom'>
                        <button className='pm-first-element' onClick={onSave}>Save</button>
                        {player.id != null && <button className='pm-element' onClick={onDelete}>Delete</button>}
                        <button className='pm-last-element' onClick={onCancel}>Cancel</button>
                    </div>
                </div>

            </SimpleModal>
        );
    }
}

PlayerModal.propTypes = {
    player: PropTypes.shape({

    }),
    show: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    onPlayerChange: PropTypes.func,
};

PlayerModal.defaultProps = {
    player: null,
    onPlayerChange: noop,
    onDelete: noop,
};

export default PlayerModal;
