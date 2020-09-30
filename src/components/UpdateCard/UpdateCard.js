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
    }
});


const UpdateCard = (props) => {
    const classes = useStyles();

    const updateDate = new Date(props.updateDate);
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
                        {updateDate.toLocaleDateString("en-US")}
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