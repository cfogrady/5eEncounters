import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MonsterModal.css';

class ActionsSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onRemoveElement = this.onRemoveElement.bind(this);
        this.onAddElement = this.onAddElement.bind(this);
    }

    onRemoveElement(prop, index) {
        return _ => {
            const list = this.props.monster[prop].filter((element, idx) => idx !== index);
            this.props.onChange(prop)({
                target: {
                    value: list,
                }
            })
        };
    }

    onAddElement(prop, value) {
        return _ => {
            const list = this.props.monster[prop].concat([value]);
            this.props.onChange(prop)({
                target: {
                    value: list,
                }
            });
        };
    }

    render() {
        const {editable, monster, onChange} = this.props;
        if(editable) {
            return (
                <div className='monster-form-section border-bottom'>
                    <div className='row-container'>
                        Actions: <button className='left-margin' onClick={this.onAddElement('actions', {name: '', descr: ''})}>Add Action</button>
                    </div>
                    {monster.actions.map((action, idx) => (
                        <div key={idx} className='row-container top-margin'>
                            <input type='text' placeholder='Action Name' value={action.name} onChange={onChange(`actions.${idx}.name`)}/>
                            <textarea className='left-margin textarea-size' placeholder='Action Description' value={action.descr} onChange={onChange(`actions.${idx}.descr`)}/>
                            <button className='left-margin' onClick={this.onRemoveElement('actions', idx)}>Delete</button>
                        </div>
                    ))}
                </div>
            );
        } else if(monster.actions.length === 0) {
            return null;
        }
        return (
            <div className='monster-form-section border-bottom'>
                <div className='red-text bold-text'>Actions</div>
                {monster.actions.map((action, idx) => (
                    <div className='top-margin mm-align-left' key={idx}>
                        <span className='bold-text'>{action.name}&nbsp;</span>
                        <span>{action.descr}</span>
                    </div>
                ))}
            </div>
        );
    }
};

ActionsSection.propTypes = {
    onChange: PropTypes.func.isRequired,
    monster: PropTypes.shape({}).isRequired,
    editable: PropTypes.bool.isRequired
}

ActionsSection.defaultProps = {
}

export default ActionsSection;