import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import { getMonsterImage } from '../data-store/MonsterImages';

import './MonsterModal.css';

class MonsterImageSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictureURL: null,
            loadingImage: false,
        };
        this.onDrop = this.onDrop.bind(this);
    }

    componentDidMount() {
        const { monster } = this.props;
        if(monster.imageKey != null) {
            getMonsterImage(monster.imageKey).then(result => {
                this.setState({
                    pictureURL: result,
                })
            }).catch(e => {
                monster.imageKey = null;
            });
            this.setState({
                loadingImage: true,
            });
        }
    }

    onDrop(picture) {
        const reader = new FileReader();
        reader.onload = _ => {
            this.props.onImageSet(reader.result);
            this.setState({
                pictureURL: reader.result,
                loadingImage: false,
            });
        }
        reader.readAsDataURL(picture[0]);
        this.setState({
            loadingImage: true,
        })
    }

    render() {
        const { loadingImage, pictureURL } = this.state;
        const { editable } = this.props;
        if(!loadingImage && pictureURL == null) {
            if(editable) {
                return (
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    />
                );
            }
            return null;
        }
        return (
            <div className="row-container center-container">
                <img style={{maxHeight: '20em'}} alt="Loading..." src={pictureURL}/>
            </div>
        );
    }
};

MonsterImageSection.propTypes = {
    monster: PropTypes.shape({}).isRequired,
    editable: PropTypes.bool,
    onImageSet: PropTypes.func,
}

MonsterImageSection.defaultProps = {
    editable: false,
    onImageSet: noop,
}

export default MonsterImageSection;