import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { classes } from './AddProject.css';
import { makeStyles } from '@material-ui/core/styles';
import { openUploadWidget } from '../../utils/CloudinaryService';
import { UIContext } from '../UIContext';

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
    const [name, setName] = useState(props.project?.projectName);
    const [category, setCategory] = useState(props.project?.category);
    const [photo, setPhoto] = useState(props.project?.projectImage);

    const UI = useContext(UIContext);
    const history = useHistory();

    const nameChangedHandler = (event) => {
        setName(event.target.value)
    }

    const categoryChangedHandler = (event) => {
        setCategory(event.target.value)
    }

    const handleCreateProject = () => {
        props.firebase.createProject(name, props.userId, category, photo).then(resp => {
            history.push(`/project/${resp.path.pieces_[1]}`);
            UI.handleModalClose();
        }).catch(err => console.error(err));
    }

    const handleEditProject = () => {
        props.firebase.editProject(name, props.userId, category, photo, props.projectId).then(resp => {
            UI.handleModalClose();
            props.handleCloseSettings();
            props.handleProjectsReTrigger();
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
            <img className="add-project__image-preview" src={photo} alt="" />
        )
    }

    const classes = useStyles();
    let isDisabled = !(name && category);
    return (
        <div>
            <div className="add-project__container">
                <div className="add-project__title">
                    {props.project ? "Edit Project" : "Create Project"}
                </div>
                <form className={classes.root + ' add-project__form'}>
                    <TextField
                        type="text"
                        id="name"
                        label="Name"
                        variant="outlined"
                        size="small"
                        onChange={nameChangedHandler}
                        value={name}
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
                    >
                        Upload Image
                    </Button>
                    {uploadedImage}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.project ? handleEditProject : handleCreateProject}
                        disabled={isDisabled}
                    >
                        {props.project ? "Edit" : "Create"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default withFirebase(AddProject);