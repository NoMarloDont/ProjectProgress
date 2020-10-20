import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import SettingsIcon from '@material-ui/icons/Settings';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import './UpdateCard.css';

const useStyles = makeStyles({
    root: {
        marginLeft: '50%',
        marginBottom: 24,
        transform: 'translateX(-50%)',
        width: '85vw',
        minWidth: 320,
        height: 112,
        display: 'flex',
        position: 'relative'
    },
    media: {
        width: 150,
        height: 'auto'
    },
    content: {
        textAlign: 'center',
        fontSize: 18
    },
    settingsIcon: {
        float: 'right',
        marginTop: - 3,
        marginLeft: 5
    },
    button: {
        '& .MuiButton-root': {
            margin: '5px',
            width: 100
        },
    }
});


const UpdateCard = (props) => {
    const classes = useStyles();

    const updateDate = new Date(props.updateDate);
    const [showSettings, setShowSettings] = useState(false);


    const handleShowSettings = () => {
        setShowSettings(!showSettings);
    };

    const settingsCard = (
        <div class="content">
            <div class="settingsIcon">
                <SettingsIcon onClick={handleShowSettings} className={classes.settingsIcon} />
            </div>
            <div className={classes.button + ' settingsButtons'}>
                <Button
                    variant="contained"
                    color="primary"
                // onClick={() => props.handleOpenModal(editModalContent)}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                // onClick={() => props.handleOpenModal(deleteModalContent)}
                >
                    Delete
                </Button>
            </div>
        </div>
    );

    const updateCard = (
        <React.Fragment>
            <CardMedia
                className={classes.media}
                image={props.updateImage}
                title="Contemplative Marlo"
            />
            <div className="content">
                <div className="content-header">
                    <div className="header-title">
                        {props.updateTitle}
                    </div>
                    <div className="date-and-settings">
                        <span>
                            {updateDate.toLocaleDateString("en-US")}
                        </span>
                        <SettingsIcon onClick={handleShowSettings} className={classes.settingsIcon} />
                    </div>
                </div>

                <div className="content-description">
                    {props.updateDescription}
                </div>
            </div>
        </React.Fragment>
    );

    return (
        <Card className={classes.root}>
            {showSettings ? settingsCard : updateCard}
        </Card>
    );
};

export default UpdateCard;