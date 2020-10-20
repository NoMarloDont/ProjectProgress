import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ProjectCard from '../ProjectCard/ProjectCard';
import Modal from '../Modal/Modal';
import AddProject from '../AddProject/AddProject';
import { Grid } from '@material-ui/core';
import { withFirebase } from '../Firebase';
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
    const [modal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState();
    const history = useHistory();

    const classes = useStyles();

    useEffect(() => {
        props.firebase.getProjects(props.userId).then(val => {
            setProjects(val);
        });
    }, [props.userId, props.firebase, modal]);

    const handleOpenModal = (modalContent) => {
        setModal(true);
        setModalContent(modalContent);
    };

    const handleCloseModal = () => {
        setModal(false);
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
                    handleOpenModal={handleOpenModal}
                    handleCloseModal={handleCloseModal}
                    projectName={projects[key].projectName}
                    projectImage={projects[key].projectImage ? projects[key].projectImage
                        : "/static/images/guitarMarlo.jpg"}
                    projectKey={key}
                    project={projects[key]}
                    userId={props.userId}
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


    const defaultModalContent = (
        <AddProject userId={props.userId} handleClose={handleCloseModal} />
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
            <Fab aria-label='Add' className={classes.fab} color='primary' onClick={() => handleOpenModal(null, defaultModalContent)}>
                <AddIcon />
            </Fab>
            <Modal open={modal} handleClose={handleCloseModal}>
                {modalContent}
            </Modal>
        </div >
    );
};

export default withFirebase(Projects);