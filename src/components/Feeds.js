import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Button from '@material-ui/core/Button'; 
import {getSingleArticles} from '../actions/articleActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import FeedDetails from '../components/pages/feedDetails'

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
    },
    button: {
        marginTop: 20,
        //width
    } 
}
class Feeds extends Component {
    state = {
        open: false
    }


    handleClick = (id) => {
        console.log(id)
        this.props.getSingleArticles(id)
        this.handleOpen()
    }
    handleOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
          this.setState({open: false})
      }

   


    render() {
        dayjs.extend(relativeTime)
        const {classes, data: {title,article,created_on,id,gifUrl}} = this.props
        
        
        return (
            <div>
            <Card className={classes.card}>
                {gifUrl &&
              <CardMedia className={classes.image}
              image={gifUrl}
              title="Gif Upload"/>   
            }
            
            
                <CardContent className={classes.content}>
                    <Typography variant="h5" 
                    onClick={() => { this.handleClick(id); }}
                    component={Link}                    
                    
                    color='primary'
                    >{title}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(created_on).fromNow()}</Typography>
                    <Typography variant="body1">{article}</Typography>
                    <Button type="submit" color='primary' className={classes.button}>comment</Button>
                    <Button type="submit" color='primary' className={classes.button}>flag</Button>
                    <Button type="submit" color='primary' className={classes.button}>delete</Button>
                </CardContent>
                
            </Card>
            <FeedDetails open={this.state.open} close={this.handleClose}/>
            </div>
        )
    }
}

Feeds.propTypes = {
    getSingleArticles: PropTypes.func.isRequired,
    
}

export default connect(null, {getSingleArticles})(withStyles(styles)(Feeds))
