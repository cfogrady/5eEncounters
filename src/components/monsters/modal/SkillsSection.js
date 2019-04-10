import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { calculateModStr } from '../UnitConversionCalculator';
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
                <div className="column-container">
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
            <div className="row-container center-container">
                <div className="col-continer center-container side-margin">
                    <div className="red-text bold-text">STR</div>
                    <div className="red-text">{`${monster.stats.str} (${calculateModStr(monster.stats.str)})`}</div>
                </div>
                <div className="col-continer center-container side-margin">
                    <div className="red-text bold-text">DEX</div>
                    <div className="red-text">{`${monster.stats.dex} (${calculateModStr(monster.stats.dex)})`}</div>
                </div>
                <div className="col-continer center-container side-margin">
                    <div className="red-text bold-text">CON</div>
                    <div className="red-text">{`${monster.stats.con} (${calculateModStr(monster.stats.con)})`}</div>
                </div>
                <div className="col-continer center-container side-margin">
                    <div className="red-text bold-text">INT</div>
                    <div className="red-text">{`${monster.stats.int} (${calculateModStr(monster.stats.int)})`}</div>
                </div>
                <div className="col-continer center-container side-margin">
                    <div className="red-text bold-text">WIS</div>
                    <div className="red-text">{`${monster.stats.wis} (${calculateModStr(monster.stats.wis)})`}</div>
                </div>
                <div className="col-continer center-container side-margin">
                    <div className="red-text bold-text">CHA</div>
                    <div className="red-text">{`${monster.stats.cha} (${calculateModStr(monster.stats.cha)})`}</div>
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