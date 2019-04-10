import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MonsterModal.css';

class AbilitiesSection extends Component {
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
                        Abilities: <button className='left-margin' onClick={this.onAddElement('abilities', {name: '', descr: ''})}>Add Ability</button>
                    </div>
                    {monster.abilities.map((ability, idx) => (
                        <div key={idx} className='row-container top-margin'>
                            <input type='text' placeholder='Ability Name' value={ability.name} onChange={onChange(`abilities.${idx}.name`)}/>
                            <textarea className='left-margin textarea-size' placeholder='Ability Description' value={ability.descr} onChange={onChange(`abilities.${idx}.descr`)}/>
                            <button className='left-margin' onClick={this.onRemoveElement('abilities', idx)}>Delete</button>
                        </div>
                    ))}
                </div>
            );
        } else if (monster.abilities.length === 0) {
            console.log('No abilities');
            return null;
        }
        return (
            <div className='monster-form-section border-bottom mm-align-left'>
                {monster.abilities.map((ability, idx) => (
                    <div key={idx}>
                        <span className='bold-text'>{ability.name}&nbsp;</span>
                        <span>{ability.descr}</span>
                    </div>
                ))}
            </div>
        );
    }
};

AbilitiesSection.propTypes = {
    onChange: PropTypes.func.isRequired,
    monster: PropTypes.shape({}).isRequired,
    editable: PropTypes.bool.isRequired
}

AbilitiesSection.defaultProps = {
}

export default AbilitiesSection;