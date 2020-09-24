import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import './ProjectCard.css';

const useStyles = makeStyles({
    root: {
        width: 300,
        height: 300,
    },
    media: {
        height: 140,
    },
});


const ProjectCard = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.projectImage}
                    title="Contemplative Marlo"
                />
                <CardContent>
                    {props.projectName}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProjectCard;