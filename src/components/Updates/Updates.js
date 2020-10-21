import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UpdateCard from '../UpdateCard/UpdateCard';
import Modal from '../Modal/Modal';
import AddUpdate from '../AddUpdate/AddUpdate';
import { Grid } from '@material-ui/core';
import { withFirebase } from '../Firebase';
import { useParams } from 'react-router-dom';
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
    const [modal, setModal] = useState(false);
    const [modalContent, setModalContent] = useState();

    const getProject = (projectId) => {
        props.firebase.getProject(projectId).then(val => {
            setProject(val);
        })
    }

    const getUpdates = () => {
        props.firebase.getUpdates(projectId).then(val => {
            setUpdates(val);
        });
    };

    useEffect(() => {
        getProject(projectId);
        getUpdates();
    }, [projectId, props.firebase, modal]);

    const handleOpenModal = (modalContent) => {
        setModal(true);
        setModalContent(modalContent);
    };

    const handleCloseModal = () => {
        setModal(false);
    };

    let updateList;
    if (updates) {
        updateList = Object.keys(updates).map((key) =>
            <Grid item xs={12} key={key}>
                <UpdateCard
                    handleOpenModal={handleOpenModal}
                    handleCloseModal={handleCloseModal}
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
        <AddUpdate projectId={projectId} handleClose={handleCloseModal} getUpdates={getUpdates} />
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
            <Fab aria-label='Add' className={classes.fab} color='primary' onClick={() => handleOpenModal(defaultModalContent)}>
                <AddIcon />
            </Fab>
            <Modal open={modal} handleClose={handleCloseModal}>
                {modalContent}
            </Modal>
        </div >
    );
};

export default withFirebase(Updates);