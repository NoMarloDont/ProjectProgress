import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ProjectCard from '../ProjectCard/ProjectCard';
import AddProject from '../AddProject/AddProject';
import { Grid } from '@material-ui/core';
import { withFirebase } from '../Firebase';
import { UIContext } from '../UIContext';
import './Projects.css';

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

const Projects = (props) => {
    const [projects, setProjects] = useState();
    const [triggerGetProjects, setTriggerGetProjects] = useState(false);

    const history = useHistory();

    const classes = useStyles();

    const UI = useContext(UIContext);

    useEffect(() => {
        props.firebase.getProjects(props.userId).then(val => {
            setProjects(val);
        });
    }, [props.userId, props.firebase, triggerGetProjects]);

    const handleOpenModal = (modalContent) => {
        UI.setModalContent(modalContent);
    };

    const handleProjectsReTrigger = () => {
        setTriggerGetProjects(!triggerGetProjects);
    };

    const handleSelectProject = (projectId) => {
        history.push(`/project/${projectId}`);
    };

    let projectList;
    if (projects) {
        projectList = Object.keys(projects).map((key) =>
            <Grid item xs={12} sm={6} md={4} key={key}>
                <ProjectCard
                    onClick={() => handleSelectProject(key)}
                    projectName={projects[key].projectName}
                    projectImage={projects[key].projectImage ? projects[key].projectImage
                        : "/static/images/guitarMarlo.jpg"}
                    projectKey={key}
                    project={projects[key]}
                    userId={props.userId}
                    handleProjectsReTrigger={handleProjectsReTrigger}
                />
            </Grid>
        );
    }

    let projectsTitle;
    if (props.userName) {
        projectsTitle = (
            <div className="updates-list__title">
                Hi {props.userName}, here are your projects
            </div>
        );
    }

    const appProjectModalContent = (
        <AddProject userId={props.userId} />
    );

    return (
        <div className={classes.root + ' project-list'}>
            {projectsTitle}
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                {projectList}
            </Grid >
            <Fab aria-label='Add' className={classes.fab} color='primary' onClick={() => handleOpenModal(appProjectModalContent)}>
                <AddIcon />
            </Fab>
        </div >
    );
};

export default withFirebase(Projects);