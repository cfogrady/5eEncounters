import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { numberToString, calculateCR } from '../UnitConversionCalculator';
import SkillSelector from '../selectors/SkillSelector';
import DamageTypeSelector from '../selectors/DamageTypeSelector';
import ConditionSelector from '../selectors/ConditionSelector';

import './MonsterModal.css';
import CRSelector from '../selectors/CRSelector';

class SkillsSection extends Component {
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
        const {editable, monster, onChange, onChangeNumber} = this.props;
        if(editable) {
            return (
                <div className='monster-form-section border-bottom'>
                    <div className="column-continer">
                        <div className="row-container">Skills <button onClick={this.onAddElement('skills', {skill: 'None', modifier: 0})} className="left-margin">Add Skill</button></div> 
                        {monster.skills.map((skill, idx) => (
                            <div className='row-container top-margin' key={idx}>
                                <SkillSelector value={skill.skill} onChange={onChange(`skills.${idx}.skill`)}/>
                                <input className='left-margin number-size' type='number' value={skill.modifier} onChange={onChangeNumber(`skills.${idx}.modifier`)}/>
                                <button className='left-margin' onClick={this.onRemoveElement('skills', idx)}>Delete</button>
                            </div>
                        ))}
                    </div>
                    <div className="column-continer top-margin">
                        <div className="row-container">Damage Vulnerabilities <button onClick={this.onAddElement('damageVulnerabilities', 'None')} className="left-margin">Add Vulnerability</button></div> 
                        {monster.damageVulnerabilities.map((vulnerability, idx) => (
                            <div className='row-container top-margin' key={idx}>
                                <DamageTypeSelector value={vulnerability} onChange={onChange(`damageVulnerabilities.${idx}`)}/>
                                <button className='left-margin' onClick={this.onRemoveElement('damageVulnerabilities', idx)}>Delete</button>
                            </div>
                        ))}
                    </div>
                    <div className="column-continer top-margin">
                        <div className="row-container">Damage Resistances <button onClick={this.onAddElement('damageResistances', 'None')} className="left-margin">Add Resistance</button></div> 
                        {monster.damageResistances.map((resistance, idx) => (
                            <div className='row-container top-margin' key={idx}>
                                <DamageTypeSelector value={resistance} onChange={onChange(`damageResistances.${idx}`)}/>
                                <button className='left-margin' onClick={this.onRemoveElement('damageResistances', idx)}>Delete</button>
                            </div>
                        ))}
                    </div>
                    <div className="column-continer top-margin">
                        <div className="row-container">Damage Immunities <button onClick={this.onAddElement('damageImmunities', 'None')} className="left-margin">Add Immunity</button></div> 
                        {monster.damageImmunities.map((immunity, idx) => (
                            <div className='row-container top-margin' key={idx}>
                                <DamageTypeSelector value={immunity} onChange={onChange(`damageImmunities.${idx}`)}/>
                                <button className='left-margin' onClick={this.onRemoveElement('damageImmunities', idx)}>Delete</button>
                            </div>
                        ))}
                    </div>
                    <div className="column-continer top-margin">
                        <div className="row-container">Condition Immunities <button onClick={this.onAddElement('conditionImmunities', 'None')} className="left-margin">Add Immunity</button></div> 
                        {monster.conditionImmunities.map((immunity, idx) => (
                            <div className='row-container top-margin' key={idx}>
                                <ConditionSelector value={immunity} onChange={onChange(`conditionImmunities.${idx}`)}/>
                                <button className='left-margin' onClick={this.onRemoveElement('conditionImmunities', idx)}>Delete</button>
                            </div>
                        ))}
                    </div>
                    <textarea className='top-margin textarea-size' value={monster.senses} onChange={onChange('senses')} placeholder='Senses'/>
                    <textarea className='top-margin textarea-size' value={monster.languages} onChange={onChange('languages')} placeholder='Languages'/>
                    <div className='row-container top-margin'>
                        CR:
                        <div className='left-margin'><CRSelector value={monster.xp.toString()} onChange={onChangeNumber('xp')}/></div>
                    </div>
                </div>
            );
        }
        return (
            <div className='monster-form-section border-bottom'>
                {monster.skills.length !== 0 && (
                    <div className='row-container mm-align-left'>
                        <span className='red-text bold-text'>Skills&nbsp;</span>
                        <span className='red-text'>{monster.skills.map((skill, idx) => `${idx === 0 ? '' : ', '}${skill.skill} ${numberToString(skill.modifier)}`)}</span>
                    </div>
                )}
                {monster.damageVulnerabilities.length !== 0 && (
                    <div className='row-container mm-align-left'>
                        <span className='red-text bold-text'>Damage Vulnerabilities&nbsp;</span>
                        <span className='red-text'>{monster.damageVulnerabilities.map((vulnerability, idx) => `${idx === 0 ? '' : ', '}${vulnerability}`)}</span>
                    </div>
                )}
                {monster.damageResistances.length !== 0 && (
                    <div className='row-container mm-align-left'>
                        <span className='red-text bold-text'>Damage Resistances&nbsp;</span>
                        <span className='red-text'>{monster.damageResistances.map((resistance, idx) => `${idx === 0 ? '' : ', '}${resistance}`)}</span>
                    </div>
                )}
                {monster.damageImmunities.length !== 0 && (
                    <div className='row-container mm-align-left'>
                        <span className='red-text bold-text'>Damage Immunities&nbsp;</span>
                        <span className='red-text'>{monster.damageImmunities.map((immunity, idx) => `${idx === 0 ? '' : ', '}${immunity}`)}</span>
                    </div>
                )}
                {monster.conditionImmunities.length !== 0 && (
                    <div className='row-container mm-align-left'>
                        <span className='red-text bold-text'>Condition Immunities&nbsp;</span>
                        <span className='red-text'>{monster.conditionImmunities.map((immunity, idx) => `${idx === 0 ? '' : ', '}${immunity}`)}</span>
                    </div>
                )}
                {monster.senses !== '' && monster.senses != null && (
                    <div className='mm-align-left'>
                        <span className='red-text bold-text'>Senses&nbsp;</span>
                        <span className='red-text'>{monster.senses}</span>
                    </div>
                )}
                {monster.languages !== '' && monster.languages != null && (
                    <div className='mm-align-left'>
                        <span className='red-text bold-text'>Languages&nbsp;</span>
                        <span className='red-text'>{monster.languages}</span>
                    </div>
                )}
                <div className='mm-align-left'>
                        <span className='red-text bold-text'>Challenge&nbsp;</span>
                        <span className='red-text'>{`${calculateCR(monster.xp)} (${monster.xp} XP)`}</span>
                </div>

            </div>
        );
    }
};

SkillsSection.propTypes = {
    onChange: PropTypes.func.isRequired,
    onChangeNumber: PropTypes.func.isRequired,
    monster: PropTypes.shape({}).isRequired,
    editable: PropTypes.bool.isRequired
}

SkillsSection.defaultProps = {
}

export default SkillsSection;