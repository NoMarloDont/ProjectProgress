import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProjectCard from '../ProjectCard/ProjectCard';
import { Grid } from '@material-ui/core';
import { withFirebase } from '../Firebase';
import './Projects.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    }
}));

const Projects = (props) => {
    const [projects, setProjects] = useState();

    useEffect(() => {
        props.firebase.getProjects(props.userId).then(val => {
            setProjects(val);
        });
    }, [props.userId, props.firebase]);

    let projectList;
    if (projects) {
        projectList = Object.keys(projects).map((key) =>
            <Grid item xs={12} sm={6} md={4} spacing={1}>
                <ProjectCard projectName={projects[key].projectName}
                    projectImage={projects[key].projectImage ? projects[key].projectImage
                        : "/static/images/guitarMarlo.jpg"} />
            </Grid>
        );
    }

    const classes = useStyles();

    return (
        <div className={classes.root + ' project-list'}>
            Projects
            < Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={2}
            >
                {projectList}
            </Grid >
        </div >
    );
};

export default withFirebase(Projects);