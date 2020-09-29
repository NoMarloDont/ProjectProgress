import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import { classes } from './AddProject.css';
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

    const classes = useStyles();
    let isDisabled = !(name && category);
    return (
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

            </form>
        </div>
    );
}

export default withFirebase(AddProject);