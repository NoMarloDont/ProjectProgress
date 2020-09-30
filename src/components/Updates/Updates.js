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
        position: 'absolute',
        bottom: 18,
        right: 18
    }
}));

const Updates = (props) => {
    const [updates, setUpdates] = useState();
    const [openAddUpdate, setOpenAddUpdate] = useState(false);

    let { projectId } = useParams();

    const classes = useStyles();

    const getUpdates = () => {
        props.firebase.getUpdates(projectId).then(val => {
            setUpdates(val);
        });
    };

    useEffect(() => {
        getUpdates();
    }, [projectId, props.firebase]);

    const handleAddUpdate = () => {
        setOpenAddUpdate(true);
    };

    const handleCloseAddUpdate = () => {
        setOpenAddUpdate(false);
    };

    let updateList;
    if (updates) {
        updateList = Object.keys(updates).map((key) =>
            <Grid item xs={12} key={key}>
                <UpdateCard updateTitle={updates[key].title}
                    updateImage={updates[key].image ? updates[key].image
                        : "/static/images/guitarMarlo.jpg"}
                    updateDate={updates[key].timestamp}
                    updateDescription={updates[key].description}
                />
            </Grid>
        );
    }

    return (
        <div className={classes.root + ' updates-list'}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                {updateList}
            </Grid>
            <Fab aria-label='Add' className={classes.fab} color='primary' onClick={handleAddUpdate}>
                <AddIcon />
            </Fab>
            <Modal open={openAddUpdate} handleClose={handleCloseAddUpdate}>
                <AddUpdate projectId={projectId} handleClose={handleCloseAddUpdate} getUpdates={getUpdates}/>
            </Modal>
        </div >
    );
};

export default withFirebase(Updates);