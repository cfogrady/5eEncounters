import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import './EncounterTracker2.css';

const IMG_STORAGE = "img_storage";

class EncounterTracker2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: [],
            pictures: [],
            pictureURLS: [],
        };
        this.onDrop = this.onDrop.bind(this);
        this.onDownload = this.onDownload.bind(this);
        this.onUpload = this.onUpload.bind(this);
    }

    componentDidMount(props) {
        const img = localStorage.getItem(IMG_STORAGE);
        if(img != null) {
            this.setState({
                pictureURLS: [img],
            });
        }
    }

    addParticipant(participant) {
        const { participants } = this.state;
        this.setState({
            participants: [...participants, participant]
        });
    }

    onDrop(picture) {
        const reader = new FileReader();
        console.log(picture[0]);
        reader.onload = _ => {
            this.setState({
                pictureURLS: this.state.pictureURLS.concat(reader.result),
            });
            localStorage.setItem(IMG_STORAGE, reader.result);
        }
        reader.readAsDataURL(picture[0]);
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    onDownload() {
        const data = {
            pictureURL: this.state.pictureURLS[0],
        };
        const a = document.createElement("a");
        const content = JSON.stringify(data, null, 2);
        const file = new Blob([content], {type: 'application/json'});
        a.href = URL.createObjectURL(file);
        a.download = 'EncounterTracker.json';
        a.click();
        a.remove();
    }

    onUpload(e) {

    }

    render() {
        const { pictureURLS } = this.state;
        return(
        <div className="encounter-tracker-page">
            <button onClick={_ => localStorage.clear()}>Clear</button>
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
            {pictureURLS.length > 0 && <img alt="Failed To Load" src={pictureURLS[0]}/>}
        </div>
        );
    }
}

export default EncounterTracker2;