import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import './AddUpdate.css';
import { makeStyles } from '@material-ui/core/styles';
import { openUploadWidget } from '../../utils/CloudinaryService';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        '& .MuiTextField-root': {
            margin: '5px'
        },
        '& .MuiButton-root': {
            margin: '5px'
        }
    }
});

const AddUpdate = (props) => {
    const [title, setTitle] = useState(props.update?.title);
    const [description, setDescription] = useState(props.update?.description);
    const [category, setCategory] = useState(props.update?.category);
    const [photo, setPhoto] = useState(props.update?.updateImage);

    const titleChangedHandler = (event) => {
        setTitle(event.target.value)
    }

    const descriptionChangedHandler = (event) => {
        setDescription(event.target.value)
    }

    const categoryChangedHandler = (event) => {
        setCategory(event.target.value)
    }

    const handleCreateUpdate = () => {
        props.firebase.createUpdate(title, description, category, props.projectId, photo).then(resp => {
            props.handleClose();
            props.getUpdates();
        }).catch(err => console.error(err));
    }

    const handleEditUpdate = () => {
        props.firebase.editUpdate(props.updateId, title, description, category, photo).then(resp => {
            props.handleClose();
            props.handleShowSettings();
            props.getUpdates();
        }).catch(err => console.error(err));
    }

    const beginUpload = (event) => {
        event.preventDefault();

        const uploadOptions = {
            cloudName: "dpzfuel4y",
            tags: ['image', 'anImage'],
            uploadPreset: "lt0svpvk",
            multiple: false
        };

        openUploadWidget(uploadOptions, (error, photos) => {
            if (!error) {
                if (photos.event === "queues-end") {
                    setPhoto(photos.data.info.files[0].uploadInfo.url);
                }
            } else {
                console.log(error);
            }
        })
    };

    let uploadedImage = (
        <div>
            No Photo Uploaded
        </div>
    );

    if (photo) {
        uploadedImage = (
            <img className="add-update__image-preview" src={photo} alt="" />
        )
    }

    const classes = useStyles();
    let isDisabled = !(title && description && category);
    return (
        <div className="add-update__container">
            <div className="add-update__title">
                {props.update ? 'Edit Update' : 'Create Update'}
            </div>
            <form className={classes.root + ' add-update__form'}>
                <TextField
                    type="text"
                    id="title"
                    label="Title"
                    variant="outlined"
                    size="small"
                    onChange={titleChangedHandler}
                    value={title}
                />
                <TextField
                    type="text"
                    id="description"
                    label="Description"
                    variant="outlined"
                    size="small"
                    onChange={descriptionChangedHandler}
                    value={description}
                />
                <TextField
                    type="text"
                    id="category"
                    label="Category"
                    variant="outlined"
                    size="small"
                    onChange={categoryChangedHandler}
                    value={category}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={beginUpload}
                    value={photo}
                >
                    Upload Image
                </Button>
                {uploadedImage}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={props.update ? handleEditUpdate : handleCreateUpdate}
                    disabled={isDisabled}
                >
                    Create
                </Button>
            </form>
        </div>
    );
}

export default withFirebase(AddUpdate);