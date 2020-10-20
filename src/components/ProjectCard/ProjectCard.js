import React, { useEffect, useState } from 'react';

import AddProject from '../AddProject/AddProject';
import DeleteProject from '../DeleteProject/DeleteProject';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import './ProjectCard.css';

const useStyles = makeStyles({
    root: {
        marginLeft: '50%',
        marginBottom: 24,
        transform: 'translateX(-50%)',
        width: 300
    },
    button: {
        '& .MuiButton-root': {
            margin: '5px'
        }
    },
    media: {
        margin: '18px 18px 0 18px',
        width: 266,
        height: 200
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        fontSize: 18,
        '&:last-child': {
            paddingBottom: '12px'
        }
    }
});


const ProjectCard = (props) => {
    const classes = useStyles();
    const [showSettings, setShowSettings] = useState(false);

    const handleShowSettings = () => {
        setShowSettings(!showSettings);
    };

    const editModalContent = (
        <AddProject userId={props.userId} project={props.project} projectId={props.projectKey} handleClose={props.handleCloseModal} handleCloseSettings={handleShowSettings} />
    )

    const deleteModalContent = (
        <DeleteProject userId={props.userId} project={props.project} projectId={props.projectKey} handleClose={props.handleCloseModal} handleCloseSettings={handleShowSettings} />
    )


    const projectCard = (
        <div>
            <CardActionArea onClick={props.onClick}>
                <CardMedia
                    className={classes.media}
                    image={props.projectImage}
                    title="Contemplative Marlo"
                />
            </CardActionArea>
            <CardContent className={classes.content}>
                <div className='projectCardName'>
                    {props.projectName}
                </div>
                <div className='projectCardSetting'>
                    <SettingsIcon onClick={handleShowSettings} />
                </div>
            </CardContent>
        </div>
    );

    const settingsCard = (
        <div>
            <div className={classes.button + ' projectCardSettings'}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => props.handleOpenModal(editModalContent)}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => props.handleOpenModal(deleteModalContent)}
                >
                    Delete
                </Button>
            </div>
            <CardContent className={classes.content}>
                <div className='projectCardName'>
                    {props.projectName}
                </div>
                <div className='projectCardSetting'>
                    <SettingsIcon onClick={handleShowSettings} />
                </div>
            </CardContent>
        </div>
    );

    return (
        <Card className={classes.root}>
            {showSettings ? settingsCard : projectCard}
        </Card>
    );
};

export default ProjectCard;