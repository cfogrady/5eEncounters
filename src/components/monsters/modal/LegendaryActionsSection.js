import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { property } from 'underscore';

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
            const list = (property(prop.split('.'))(this.props.monster)).filter((element, idx) => idx !== index);
            this.props.onChange(prop)({
                target: {
                    value: list,
                }
            })
        };
    }

    onAddElement(prop, value) {
        return _ => {
            const list = (property(prop.split('.'))(this.props.monster)).concat([value]);
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
                <div className='column-container'>
                    <div className='row-container'>
                        Legendary Actions: <button className='left-margin' onClick={this.onAddElement('legendaryActions.actions', {name: '', descr: ''})}>Add Action</button>
                    </div>
                    <textarea className='top-margin textarea-size' placeholder='Legendary Action Summary and Restrictions' onChange={onChange('legendaryActions.summary')} value={monster.legendaryActions.summary}/>
                    {monster.legendaryActions.actions.map((action, idx) => (
                        <div key={idx} className='row-container top-margin'>
                            <input placeholder='Action Name' type='text' value={action.name} onChange={onChange(`legendaryActions.actions.${idx}.name`)}/>
                            <textarea className='left-margin textarea-size' placeholder='Action Description' value={action.descr} onChange={onChange(`legendaryActions.actions.${idx}.descr`)}/>
                            <button className='left-margin' onClick={this.onRemoveElement('legendaryActions.actions', idx)}>Delete</button>
                        </div>
                    ))}
                </div>
            );
        }
        return (
            <div className='column-container'>
                <div className='red-text bold-text'>Legendary Actions</div>
                <div>{monster.legendaryActions.summary}</div>
                {monster.legendaryActions.actions.map((action, idx) => (
                    <div className='top-margin' key={idx}>
                        <span className='bold-text'>{action.name}</span>
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