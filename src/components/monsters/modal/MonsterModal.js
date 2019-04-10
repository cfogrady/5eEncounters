import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop, clone } from 'underscore';
import SimpleModal from '../../modals/SimpleModal';
import SizeSelector from '../selectors/SizeSelector';
import TypeSelector from '../selectors/TypeSelector';
import AlignmentSelector from '../selectors/AlignmentSelector';
import CombatStatSection from './CombatStatSection';
import StatSection from './StatSection';
import SkillsSection from './SkillsSection';
import AbilitiesSection from './AbilitiesSection';
import ActionsSection from './ActionsSection';
import LegendaryActionsSection from './LegendaryActionsSection';

import './MonsterModal.css';

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
        const { editable, show, monster, onClose, onCancel, onDelete } = this.props;
        if(monster == null) {
            return null;
        }
        return (
            <SimpleModal show={show}>
                <div className='monster-form'>
                    <div className='monster-form-section border-bottom'>
                        {editable ? <input type='text' placeholder='Monster Name' onChange={this.onChange('name')} value={monster.name || ''}/> : <span className='red-text bold-text'>{monster.name}</span>}
                        {editable ? (
                            <div className='monster-form-row-section'>
                                <SizeSelector value={monster.size || 'None'} onChange={this.onChange('size')}/>
                                <div className='left-margin'><TypeSelector value={monster.type || 'None'} onChange={this.onChange('type')}/></div>
                                <div className='left-margin'><AlignmentSelector value={monster.alignment || 'None'} onChange={this.onChange('alignment')}/></div>
                            </div>
                        ) : <span>`${monster.size} ${monster.type}, ${monster.alignment}`</span>}
                    </div>
                    <div className='monster-form-section border-bottom'>
                        <CombatStatSection editable={editable} monster={monster} onChangeNumber={this.onChangeNumber} />
                    </div>
                    <div className='monster-form-section border-bottom'>
                        <StatSection editable={editable} monster={monster} onChangeNumber={this.onChangeNumber}/>
                    </div>
                    <div className='monster-form-section border-bottom'>
                        <SkillsSection editable={editable} monster={monster} onChange={this.onChange} onChangeNumber={this.onChangeNumber} />
                    </div>
                    <div className='monster-form-section border-bottom'>
                        <AbilitiesSection editable={editable} monster={monster} onChange={this.onChange} />
                    </div>
                    <div className='monster-form-section border-bottom'>
                        <ActionsSection editable={editable} monster={monster} onChange={this.onChange} />
                    </div>
                    <div className='monster-form-section border-bottom'>
                        <LegendaryActionsSection editable={editable} monster={monster} onChange={this.onChange} />
                    </div>
                    <div className='monster-form-section'>
                        <div>Description:</div>
                        <textarea className='textarea-size top-margin' onChange={this.onChange('description')} value={monster.description}/>
                    </div>
                    <div className='row-container-space-between top-margin'>
                        <button onClick={onClose}>Save</button>
                        {monster.id != null && <button onClick={onDelete}>Delete</button>}
                        <button onClick={onCancel}>Cancel</button>
                    </div>

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
    onClose: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
};

MonsterModal.defaultProps = {
    monster: null,
    editable: false,
    onMonsterChange: noop,
    onDelete: noop,
};

export default MonsterModal;
