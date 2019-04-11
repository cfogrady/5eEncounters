import React from 'react';
import PropTypes from 'prop-types';
import SimpleModal from './SimpleModal';

import './SelectOrEditModal.css';

const SelectOrEditModal = ({ onSelect, onView, addText, viewText, show }) => {
    return (
        <SimpleModal show={show}>
            <div className='soem-container'>
                <div className='soem-element'>{`${addText} or ${viewText.toLowerCase()} element.`}</div>
                <div className='soem-button-row'>
                    <button className='soem-element' onClick={onSelect}>{addText}</button>
                    <button className='soem-element' onClick={onView}>{viewText}</button>
                </div>
            </div>
        </SimpleModal>
    );
};

SelectOrEditModal.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    addText: PropTypes.string,
    viewText: PropTypes.string,
}

SelectOrEditModal.defaultProps = {
    addText: 'Select',
    viewText: 'View',
}

export default SelectOrEditModal;