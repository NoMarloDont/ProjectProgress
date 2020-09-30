import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import { classes } from './AddUpdate.css';
import { makeStyles } from '@material-ui/core/styles';

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
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();

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
        props.firebase.createUpdate(title, description, category, props.projectId).then(resp => {
            props.handleClose();
            props.getUpdates();
        }).catch(err => console.error(err));
    }

    const classes = useStyles();
    let isDisabled = !(title && description && category);
    return (
        <div className="add-update__container">
            <div className="add-update__title">
                Create Update
            </div>
            <form className={classes.root + ' add-update__form'}>
                <TextField
                    type="text"
                    id="title"
                    label="Title"
                    variant="outlined"
                    size="small"
                    onChange={titleChangedHandler}
                />
                <TextField
                    type="text"
                    id="description"
                    label="Description"
                    variant="outlined"
                    size="small"
                    onChange={descriptionChangedHandler}
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
                    onClick={handleCreateUpdate}
                    disabled={isDisabled}
                >
                    Create
                </Button>
            </form>
        </div>
    );
}

export default withFirebase(AddUpdate);