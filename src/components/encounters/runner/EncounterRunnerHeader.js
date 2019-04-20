import React, { Fragment } from 'react';

import './EncounterRunnerHeader.scss';

const EncounterRunnerHeader = ({
    onStartTracking,
    onNextTurn,
    onPreviousTurn,
    toggleShowInitiative,
    rollCreatureInitiatives,
    sortByInitiative,
    showInitiative,
    currentTurnIdx,
}) => {
    return (
      <div className='erh-container'>
        { currentTurnIdx == null ? <div/> :
            <button className='erh-margin' onClick={onPreviousTurn}>Previous</button>
        }
        <div className='erh-initiative'>
            <div>
                <input className='erh-margin' type="checkbox" checked={showInitiative} onChange={toggleShowInitiative}/>
                <span className='erh-margin'>Show Initiative</span>
            </div>
            {showInitiative && <Fragment>
                <button className='erh-margin' onClick={rollCreatureInitiatives}>Roll</button>
                <button className='erh-margin' onClick={sortByInitiative}>Sort</button>
            </Fragment>}
        </div>
        { currentTurnIdx == null ? 
            <button className='erh-margin' onClick={onStartTracking}>Start</button> :
            <button className='erh-margin' onClick={onNextTurn}>Next</button>
        }
      </div>
    );
};

export default EncounterRunnerHeader;