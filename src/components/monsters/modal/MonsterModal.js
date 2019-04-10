import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop, clone } from 'underscore';
import SimpleModal from '../../modals/SimpleModal';
import NameSection from './NameSection';
import CombatSection from './CombatSection';
import StatSection from './StatSection';
import SkillsSection from './SkillsSection';
import AbilitiesSection from './AbilitiesSection';
import ActionsSection from './ActionsSection';
import LegendaryActionsSection from './LegendaryActionsSection';
import MonsterImageSection from './MonsterImageSection';

import './MonsterModal.css';
import MonsterNameSection from './CombatSection';
import DescriptionSection from './DescriptionSection';

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

class MonsterModal extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
    }

    onChange(path) {
        const { monster } = this.props;
        return event => {
            const value = event.target.value;
            const newMonster = clone(monster);
            setPathValue(newMonster, path, value);
            this.props.onMonsterChange(newMonster);
        }
    }

    onChangeNumber(path) {
        const { monster } = this.props;
        return event => {
            const value = parseInt(event.target.value);
            const newMonster = clone(monster);
            setPathValue(newMonster, path, value);
            this.props.onMonsterChange(newMonster);
        }
    }

    render() {
        const { editable, show, monster, onSave, onCancel, onDelete, onImageSet, onToggleEdit } = this.props;
        if(monster == null) {
            return null;
        }
        return (
            <SimpleModal show={show}>
                <div className='monster-form'>
                    <NameSection editable={editable} monster={monster} onChange={this.onChange}/>
                    <CombatSection editable={editable} monster={monster} onChangeNumber={this.onChangeNumber} />
                    <StatSection editable={editable} monster={monster} onChangeNumber={this.onChangeNumber}/>
                    <SkillsSection editable={editable} monster={monster} onChange={this.onChange} onChangeNumber={this.onChangeNumber} />
                    <AbilitiesSection editable={editable} monster={monster} onChange={this.onChange} />
                    <ActionsSection editable={editable} monster={monster} onChange={this.onChange} />
                    <LegendaryActionsSection editable={editable} monster={monster} onChange={this.onChange} />
                    <DescriptionSection editable={editable} monster={monster} onChange={this.onChange} />
                    <div className='monster-form-section'>
                        <MonsterImageSection monster={monster} onImageSet={onImageSet}/>
                    </div>
                    { editable ? (
                    <div className='row-container-space-between top-margin'>
                        <button onClick={onSave}>Save</button>
                        {monster.id != null && <button onClick={onDelete}>Delete</button>}
                        <button onClick={onCancel}>Cancel</button>
                    </div>) :
                    <div className='row-container-space-between top-margin'>
                        {onToggleEdit !== noop && <button onClick={onToggleEdit}>Edit</button>}
                        <button onClick={onCancel}>Close</button>
                    </div>
                    }

                </div>

            </SimpleModal>
        );
    }
}

MonsterModal.propTypes = {
    monster: PropTypes.shape({

    }),
    editable: PropTypes.bool,
    show: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    onImageSet: PropTypes.func,
    onToggleEdit: PropTypes.func,
};

MonsterModal.defaultProps = {
    monster: null,
    editable: false,
    onMonsterChange: noop,
    onDelete: noop,
    onImageSet: noop,
    onToggleEdit: noop,
};

export default MonsterModal;
