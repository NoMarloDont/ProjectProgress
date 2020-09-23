import React, { useEffect, useState } from 'react';
import { withFirebase } from '../Firebase';
import './Projects.css';

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
            <div key={`project-${key}`}>{projects[key].projectName}</div>    
        );
    }

    return (
        <div>
            Projects

            {projectList}
        </div>
    );
};

export default withFirebase(Projects);