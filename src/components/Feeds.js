import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        width: 200,
    },
    content:{
        padding: 25 
    }  
}
class Feeds extends Component {
    render() {
        dayjs.extend(relativeTime)
        const {classes, data: {title,article,created_on,article_id}} = this.props
        return (
            <Card className={classes.card}>
                <CardMedia className={classes.image}
                image={article}
                title="Gif Upload"/>
                <CardContent className={classes.content}>
                    <Typography variant="h5"
                    component={Link}
                    to={`/users/${article_id}`}
                    color='primary'
                    >{title}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(created_on).fromNow()}</Typography>
                    <Typography variant="body1">{article}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Feeds)
