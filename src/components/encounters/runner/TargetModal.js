import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimpleModal from '../../common/modals/SimpleModal';
import { DAMAGE, HEAL, TEMP_HEALTH } from './TargetTypes';

import './TargetModal.css';

class TargetModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: DAMAGE,
            qty: 0,
        };
        this.changeDmg = this.changeDmg.bind(this);
        this.changeType = this.changeType.bind(this);
    }

    changeDmg(event) {
        const qty = parseInt(event.target.value);
        this.setState({
            qty,
        });
    }

    changeType(event) {
        const type = event.target.value;
        this.setState({
            type,
        });
    }

    render() {
        const { show, dealToTarget } = this.props;
        const { type, qty } = this.state;
        return (
            <SimpleModal show={show}>
                <div className='tm-container'>
                    <input className='tm-number-element' type='number' value={qty} onChange={this.changeDmg}/>
                    <div>
                        Damage
                        <input
                            type='radio'
                            value={DAMAGE}
                            checked={type === DAMAGE}
                            onChange={this.changeType}
                        />
                    </div>
                    <div>
                        Heal
                        <input
                            type='radio'
                            value={HEAL}
                            checked={type === HEAL}
                            onChange={this.changeType}
                        />
                    </div>
                    <div>
                        Temporary Hp
                        <input
                            type='radio'
                            value={TEMP_HEALTH}
                            checked={type === TEMP_HEALTH}
                            onChange={this.changeType}
                        />
                    </div>
                    <button className='tm-element' onClick={_ => dealToTarget(this.state)}>Ok</button>
                </div>
            </SimpleModal>
        );
    }
}

TargetModal.propTypes = {
    show: PropTypes.bool.isRequired,
    dealToTarget: PropTypes.func,
}

TargetModal.defaultProps = {
}

export default TargetModal;