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
import DeleteFeed from '../components/pages/DeleteFeed'
import {getSingleGifs} from '../actions/userAction'
import CardHeader from '@material-ui/core/CardHeader';
import './pages/styles/homeStyle.css'
import DeleteIcon from '@material-ui/icons/Delete'


const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        width: '25%',
        objectFit: 'cover'
        
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        marginLeft: 100,
        width: "70%",
      },
      card2: {
        maxWidth: "100%",
        marginBottom: 20
      },
    imag: {
        width: '50%',
        objectFit: 'cover',
        position: 'bottom'
        
    },
    content:{
        padding: 25 ,
        width: '100%'
    },
    button: {
        marginTop: 20,
        //width
    },
    buttona: {
        marginTop: 20,
        paddingLeft: '30%'
        
    }
}
class Feeds extends Component {
    state = {
        open: false,
        deleteOpen: false,
        deleteId: null,
        article: null,
        gif: null
    }


    handleClick = (id,article_id,article,gifUrl) => {
       console.log(article_id)
       if(!gifUrl){
        this.props.getSingleArticles(id ? id : article_id)
       }else{
        this.props.getSingleGifs(id)
       }
        
        this.handleOpen()
    }



    handleDeleteOpen = (id,article,gifUrl) => {
        
        this.setState({
            deleteId: id,
            article: article,
            gif: gifUrl,
            deleteOpen: true
        })
    }
    handleDeleteClose = () => {
        this.setState({deleteOpen: false})
    }


    handleOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
          this.setState({open: false})
      }

   


    render() {
        dayjs.extend(relativeTime)
        const {classes, data: {title,article_id, article,created_on,id,gifUrl,imagurl}} = this.props
        
        
        return (
            <div>
            <Card className={classes.card}>
                  
            
              {article && 
                imagurl &&
              <CardMedia id='imageUrl' className={classes.image}
              image={imagurl}
              title="Gif Upload"/>}
              {article && <CardContent className={classes.content}>
                    <Typography variant="h5" 
                    onClick={() => { this.handleClick(id,article_id,article,gifUrl); }}
                    component={Link}                    
                    
                    color='primary'
                    >{title}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(created_on).fromNow()}</Typography>
                    <Typography variant="body1">{article}</Typography>
                    <div className="comment">
                    <Button type="submit" color='primary' className={classes.butto}>comment</Button>
                    <Button type="submit" color='primary' className={classes.butto}>flag</Button>
                    <Button type="submit" color='primary' onClick={() => { this.handleDeleteOpen(id,article,gifUrl); }} className={classes.butto}><DeleteIcon /></Button>
                    </div>
                </CardContent>}
                
            
                 
            
            
                
              
             
                
            </Card>
            {gifUrl &&
             <div>
                 <Card className={classes.card2}>
      <CardHeader
        
        
        title={<Typography variant="h5" 
        onClick={() => { this.handleClick(id,article_id,article,gifUrl); }}
        component={Link}                    
        
        color='primary'
        >{title}</Typography>}
        
      />
      <CardMedia
        className={classes.media}
        image={gifUrl}
        title="Gifs"
        onClick={() => { this.handleClick(id,article_id,article,gifUrl); }}
        component={Link}
      />
      <Button type="submit" color='primary' className={classes.buttona}>comment</Button>
                    <Button type="submit" color='primary' className={classes.button}>flag</Button>
                    <Button type="submit" color='primary' onClick={() => { this.handleDeleteOpen(id,article,gifUrl); }} className={classes.button}>delete</Button>
      </Card>
             </div>
            }
            <FeedDetails open={this.state.open} close={this.handleClose}/>
            <DeleteFeed article={this.state.article} gif={this.state.gif} id= {this.state.deleteId} open={this.state.deleteOpen} close={this.handleDeleteClose}/>
            </div>
        )
    }
}

Feeds.propTypes = {
    getSingleArticles: PropTypes.func.isRequired,
    getSingleGifs: PropTypes.func.isRequired
    
}

export default connect(null, {getSingleArticles,getSingleGifs})(withStyles(styles)(Feeds))
