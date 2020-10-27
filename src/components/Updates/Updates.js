import React, { useEffect, useState, useContext, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UpdateCard from '../UpdateCard/UpdateCard';
import AddUpdate from '../AddUpdate/AddUpdate';
import { Grid } from '@material-ui/core';
import { withFirebase } from '../Firebase';
import { useParams } from 'react-router-dom';
import { UIContext } from '../UIContext';
import './Updates.css';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
    fab: {
        position: 'fixed',
        bottom: 18,
        right: 18
    }
}));

const Updates = (props) => {
    const { projectId } = useParams();
    const [project, setProject] = useState();
    const [updates, setUpdates] = useState();

    const UI = useContext(UIContext);

    const getProject = useCallback((projectId) => {
        props.firebase.getProject(projectId).then(val => {
            setProject(val);
        })
    }, [props.firebase]);

    const getUpdates = useCallback(() => {
        props.firebase.getUpdates(projectId).then(val => {
            setUpdates(val);
        });
    }, [projectId, props.firebase]);

    useEffect(() => {
        getProject(projectId);
        getUpdates();
    }, [projectId, props.firebase, getProject, getUpdates]);

    let updateList;
    if (updates) {
        updateList = Object.keys(updates).map((key) =>
            <Grid item xs={12} key={key}>
                <UpdateCard
                    getUpdates={getUpdates}
                    projectId={projectId}
                    updateId={key}
                    update={updates[key]}
                />
            </Grid>
        );
    }

    let projectTitle;
    if (project && props.userName) {
        projectTitle = (
            <div className="updates-list__title">
                Hi {props.userName}, here is your progress on {project.projectName}
            </div>
        );
    }

    const defaultModalContent = (
        <AddUpdate projectId={projectId} getUpdates={getUpdates} />
    )

    const classes = useStyles();
    return (
        <div className={classes.root + ' updates-list'}>
            {projectTitle}
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                {updateList}
            </Grid>
            <Fab aria-label='Add' className={classes.fab} color='primary' onClick={() => UI.setModalContent(defaultModalContent)}>
                <AddIcon />
            </Fab>
        </div >
    );
};

export default withFirebase(Updates);