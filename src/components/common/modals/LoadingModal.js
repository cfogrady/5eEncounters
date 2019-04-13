import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';

import './LoadingModal.css';

const LoadingModal = ({ show, children }) => {
    const showHideClassName = show ? "lm-modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName}>
        <div className='lm-modal-main'>
            <MoonLoader
                sizeUnit={'px'}
                size={200}
                loading={show}
                color={'#123abc'}
            />
            {children}
        </div>
      </div>
    );
};

export default LoadingModal;