import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import './UpdateCard.css';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        marginLeft: '50%',
        marginBottom: 24,
        transform: 'translateX(-50%)',
        width: '85vw',
        height: '15vw',
        display: 'flex'
    },
    media: {
        width: 150
    },
    content: {
        textAlign: 'center',
        fontSize: 18
    }
});


const UpdateCard = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
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
                    <div className="header-date">
                        {props.updateDate}
                    </div>
                </div>
                <div className="content-description">
                    {props.updateDescription}
                </div>
            </div>
        </Card>
    );
};

export default UpdateCard;