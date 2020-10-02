import React, { useState } from 'react';
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
            margin: '5px'
        },
        '& .MuiButton-root': {
            margin: '5px'
        }
    }
});

const AddProject = (props) => {
    const [name, setName] = useState();
    const [category, setCategory] = useState();

    const nameChangedHandler = (event) => {
        setName(event.target.value)
    }

    const categoryChangedHandler = (event) => {
        setCategory(event.target.value)
    }

    const handleCreateProject = () => {
        props.firebase.createProject(name, props.userId, category).then(resp => {

        }).catch(err => console.error(err));
    }

    const beginUpload = (event) => {
        event.preventDefault();
        const uploadOptions = {
            cloudName: "dpzfuel4y",
            tags: ['image', 'anImage'],
            uploadPreset: "lt0svpvk"
        };
        openUploadWidget(uploadOptions, (error, photos) => {
            if (!error) {
                console.log(photos);
            } else {
                console.log(error);
            }
        })
        //path to url event:queues-end -> data -> info -> files -> 'the file object' -> upload info -> url
    };

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
                        onClick={handleCreateProject}
                        disabled={isDisabled}
                    >
                        Create
                </Button>
                    <button
                        variant="contained"
                        color="primary"
                        onClick={beginUpload}
                    >
                        Upload Image
                </button>
                </form>
            </div>
        </CloudinaryContext>
    );
}

export default withFirebase(AddProject);