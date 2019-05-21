import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MonsterModal.css';

class ReactionsSection extends Component {
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
            const list = (this.props.monster[prop] || []).concat([value]);
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
                        Reactions: <button className='left-margin' onClick={this.onAddElement('reactions', {name: '', descr: ''})}>Add Reaction</button>
                    </div>
                    {(monster.reactions || []).map((reaction, idx) => (
                        <div key={idx} className='row-container top-margin'>
                            <input className='mm-margin-element' type='text' placeholder='Reaction Name' value={reaction.name} onChange={onChange(`reactions.${idx}.name`)}/>
                            <textarea className='textarea-size mm-margin-element' placeholder='Reaction Description' value={reaction.descr} onChange={onChange(`reactions.${idx}.descr`)}/>
                            <button className='mm-margin-element' onClick={this.onRemoveElement('reactions', idx)}>Delete</button>
                        </div>
                    ))}
                </div>
            );
        } else if(!monster.reactions || monster.reactions.length === 0) {
            return null;
        }
        return (
            <div className='monster-form-section border-bottom'>
                <div className='red-text bold-text'>Reactions</div>
                {monster.reactions.map((reaction, idx) => (
                    <div className='top-margin mm-align-left' key={idx}>
                        <span className='bold-text'>{reaction.name}&nbsp;</span>
                        <span>{reaction.descr}</span>
                    </div>
                ))}
            </div>
        );
    }
};

ReactionsSection.propTypes = {
    onChange: PropTypes.func.isRequired,
    monster: PropTypes.shape({}).isRequired,
    editable: PropTypes.bool.isRequired
}

ReactionsSection.defaultProps = {
}

export default ReactionsSection;