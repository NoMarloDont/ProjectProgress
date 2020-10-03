import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { classes } from './AddProject.css';
import { makeStyles } from '@material-ui/core/styles';
import { CloudinaryContext } from "cloudinary-react";
import { openUploadWidget } from '../../utils/CloudinaryService';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        '& .MuiTextField-root': {
            margin: '5px',
            minWidth: 300
        },
        '& .MuiButton-root': {
            margin: '5px'
        }
    }
});

const AddProject = (props) => {
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [photo, setPhoto] = useState();

    const history = useHistory();

    const nameChangedHandler = (event) => {
        setName(event.target.value)
    }

    const categoryChangedHandler = (event) => {
        setCategory(event.target.value)
    }

    const handleCreateProject = () => {
        props.firebase.createProject(name, props.userId, category, photo).then(resp => {
            console.log(resp);
            history.push(`/project/${resp.path.pieces_[1]}`);
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
                console.log(photos);
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
            <img className="add-project__image-preview" src={photo} alt="" />
        )
    }

    const classes = useStyles();
    let isDisabled = !(name && category);
    return (
        <CloudinaryContext cloudName="dpzfuel4y">
            <div className="add-project__container">
                <div className="add-project__title">
                    Create Project
            </div>
                <form className={classes.root + ' add-project__form'}>
                    <TextField
                        type="text"
                        id="name"
                        label="Name"
                        variant="outlined"
                        size="small"
                        onChange={nameChangedHandler}
                    />
                    <TextField
                        type="text"
                        id="category"
                        label="Category"
                        variant="outlined"
                        size="small"
                        onChange={categoryChangedHandler}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={beginUpload}
                        disabled={!!photo}
                    >
                        Upload Image
                    </Button>
                    {uploadedImage}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateProject}
                        disabled={isDisabled}
                    >
                        Create
                    </Button>
                </form>
            </div>
        </CloudinaryContext>
    );
}

export default withFirebase(AddProject);