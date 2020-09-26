import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import './ProjectCard.css';

const useStyles = makeStyles({
    root: {
        marginLeft: '50%',
        marginBottom: 24,
        transform: 'translateX(-50%)',
        width: 300
    },
    media: {
        margin: '18px 18px 0 18px',
        width: 266,
        height: 200
    },
    content: {
        textAlign: 'center',
        fontSize: 18
    }
});


const ProjectCard = (props) => {
    const classes = useStyles();

    console.log(props);
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.projectImage}
                    title="Contemplative Marlo"
                />
                <CardContent className={classes.content}>
                    {props.projectName}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProjectCard;