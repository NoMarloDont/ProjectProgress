import React, { useContext } from 'react';
import { withFirebase } from '../Firebase';
import './DeleteProject.css';
import { makeStyles } from '@material-ui/core/styles';
import { UIContext } from '../UIContext';
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

const DeleteProject = (props) => {

    const UI = useContext(UIContext);

    const handleDeleteProject = () => {
        props.firebase.deleteProject(props.projectId).then(resp => {
            props.handleProjectsReTrigger();
            UI.handleModalClose();
        }).catch(err => console.error(err));
    }

    const handleDoNotDeleteProject = () => {
        UI.handleModalClose();
    }

    const classes = useStyles();
    return (
        <div>
            <div className="add-project__container">
                <div className="add-project__title">
                    Are you sure you want to delete this project?
                </div>
                <form className={classes.root + ' add-project__form'}>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDeleteProject}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDoNotDeleteProject}
                    >
                        No
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default withFirebase(DeleteProject);