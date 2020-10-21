import React from 'react';
import { withFirebase } from '../Firebase';
import './DeleteUpdate.css';
import { makeStyles } from '@material-ui/core/styles';

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

const DeleteUpdate = (props) => {
    const handleDeleteUpdate = () => {
        props.firebase.deleteUpdate(props.updateId).then(resp => {
            props.handleClose();
        }).catch(err => console.error(err));
    }

    const handleDoNotDeleteUpdate = () => {
        props.handleClose();
    }

    const classes = useStyles();
    return (
        <div>
            <div className="add-project__container">
                <div className="add-project__title">
                    Are you sure you want to delete this update?
                </div>
                <form className={classes.root + ' add-project__form'}>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDeleteUpdate}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDoNotDeleteUpdate}
                    >
                        No
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default withFirebase(DeleteUpdate);