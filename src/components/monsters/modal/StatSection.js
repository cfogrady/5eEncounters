import React from 'react';
import PropTypes from 'prop-types';
import { calculateModStr } from '../UnitConversionCalculator';

import './MonsterModal.css';

const StatSection = ({ onChangeNumber, monster, editable }) => {
    if(editable) {
        return (
            <div className='monster-form-section border-bottom'>
                <div className="row-container center-container">
                    <div className="physical-stat-section">
                        <div className="col-container center-container side-margin">
                            <input className="number-size" type='number' placeholder='STR' onChange={onChangeNumber('stats.str')} value={monster.stats.str || ''}/>
                            <div className="left-margin">{calculateModStr(monster.stats.str)}</div>
                        </div>
                        <div className="col-container center-container side-margin">
                            <input className="number-size" type='number' placeholder='DEX' onChange={onChangeNumber('stats.dex')} value={monster.stats.dex || ''}/>
                            <div className="left-margin">{calculateModStr(monster.stats.dex)}</div>
                        </div>
                        <div className="col-container center-container side-margin">
                            <input className="number-size" type='number' placeholder='CON' onChange={onChangeNumber('stats.con')} value={monster.stats.con || ''}/>
                            <div className="left-margin">{calculateModStr(monster.stats.con)}</div>
                        </div>
                    </div>
                    <div className="mental-stat-section">
                        <div className="col-container center-container side-margin">
                            <input className="number-size" type='number' placeholder='INT' onChange={onChangeNumber('stats.int')} value={monster.stats.int || ''}/>
                            <div className="left-margin">{calculateModStr(monster.stats.int)}</div>
                        </div>
                        <div className="col-container center-container side-margin">
                            <input className="number-size" type='number' placeholder='WIS' onChange={onChangeNumber('stats.wis')} value={monster.stats.wis || ''}/>
                            <div className="left-margin">{calculateModStr(monster.stats.wis)}</div>
                        </div>
                        <div className="col-container center-container side-margin">
                            <input className="number-size" type='number' placeholder='CHA' onChange={onChangeNumber('stats.cha')} value={monster.stats.cha || ''}/>
                            <div className="left-margin">{calculateModStr(monster.stats.cha)}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className='monster-form-section border-bottom'>
            <div className="row-container center-container">
                <div className="physical-stat-section">
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
                </div>
                <div className="mental-stat-section">
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
            </div>
        </div>
    );
};

StatSection.propTypes = {
    onChangeNumber: PropTypes.func.isRequired,
    monster: PropTypes.shape({}).isRequired,
    editable: PropTypes.bool.isRequired
}

StatSection.defaultProps = {
}

export default StatSection;