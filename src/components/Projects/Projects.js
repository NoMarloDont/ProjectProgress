import React, { useEffect, useState } from 'react';
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
        position: 'absolute',
        bottom: 18,
        right: 18
    }
}));

const Projects = (props) => {
    const [projects, setProjects] = useState();
    const [openAddProject, setOpenAddProject] = useState(false);
    
    const classes = useStyles();

    useEffect(() => {
        props.firebase.getProjects(props.userId).then(val => {
            setProjects(val);
        });
    }, [props.userId, props.firebase]);

    const handleAddProject = () => {
        setOpenAddProject(true);
    };

    const handleCloseAddProject = () => {
        setOpenAddProject(false);
    };

    let projectList;
    if (projects) {
        projectList = Object.keys(projects).map((key) =>
            <Grid item xs={12} sm={6} md={4} key={key}>
                <ProjectCard projectName={projects[key].projectName}
                    projectImage={projects[key].projectImage ? projects[key].projectImage
                        : "/static/images/guitarMarlo.jpg"} />
            </Grid>
        );
    }

    return (
        <div className={classes.root + ' project-list'}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
            >
                {projectList}
            </Grid >
            <Fab aria-label='Add' className={classes.fab} color='primary' onClick={handleAddProject}>
                <AddIcon />
            </Fab>
            <Modal open={openAddProject} handleClose={handleCloseAddProject}>
                <AddProject />
            </Modal>
        </div >
    );
};

export default withFirebase(Projects);