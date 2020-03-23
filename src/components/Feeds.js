import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
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
import AddCommentIcon from '@material-ui/icons/AddComment';
import {clearArt} from '../actions/articleActions'


const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        width: '100%'
    },
    image: {
        width: '25%',
        objectFit: 'cover',
        borderRadius: '50%',
        height: '15vh',
        margin: '20px',
        padding: 5
        
    },
    ima: {
        width: '10%',
        objectFit: 'cover',
        borderRadius: '50%',
        height: '10vh',
        float: 'left',
        
        marginLeft: '1.5vh'
        
        
    },
    comments:{
        color: 'red',
        marginBottom: "30px",
        
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        marginLeft: 100,
        width: "70%",
        borderRadius: '20px',
        cursor: 'pointer'
        
      },
      card2: {
        maxWidth: "100%",
        marginBottom: 20,
      },
      created: {
        marginLeft: '1vh'
      },
    imag: {
        width: '50%',
        objectFit: 'cover',
        position: 'bottom'
        
    },
    content:{
        padding: '1vh' ,
        width: '100%'
    },
    button: {
        marginTop: 20,
        //width
    },
    buttona: {
        marginTop: 20,
        //paddingLeft: '30%',
        marginLeft: '30%'
        
    }
}
class Feeds extends Component {
    state = {
        open: false,
        deleteOpen: false,
        deleteId: null,
        article: null,
        gif: null,
        loading: false
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
          this.props.clearArt()
      }

   


    render() {
        dayjs.extend(relativeTime)
        
        const {classes, data: {title,article_id, article,created_on,id,gifUrl,imagurl,coments}} = this.props
        
        
        return (
            <div>
            <Card className={classes.card}>
                  
            
              {article && 
                imagurl &&
              <CardMedia id='imageUrl' className={classes.image}
              image={imagurl}
              
              title="Profile pic"></CardMedia>}
              {article && <CardContent className={classes.content}>
                    <Typography variant='h6'
                    onClick={() => { this.handleClick(id,article_id,article,gifUrl); }}
                      style={{cursor: 'pointer'}}                 
                    className="titleMobile"
                    color='primary'
                    >{title}</Typography>
                    <Typography variant="body2"  color="textSecondary">{dayjs(created_on).fromNow()}</Typography>
                    <Typography variant="body1">{article}</Typography>
                    <div className="comment">
                    <Button  onClick={() => { this.handleClick(id,article_id,article,gifUrl); }} type="submit" color='primary' className={classes.butto}><AddCommentIcon/><span className={classes.comments}>{coments ? coments[0] === null ? null: coments.length : null}</span></Button>
                    
                    <Button type="submit" style={{color:'#d0583d'}} onClick={() => { this.handleDeleteOpen(id,article,gifUrl); }} className={classes.butto}><DeleteIcon /></Button>
                    
                    </div>
                </CardContent>}
                
            
                 
            
            
                
              
             
                
            </Card>
            {gifUrl &&
             <div>
                 
                 <Card className={classes.card2}>
                
      <CardHeader
        
        
        title={<Typography variant="h5" 
        onClick={() => { this.handleClick(id,article_id,article,gifUrl); }}
        style={{cursor: 'pointer'}}          
        className='titleMobil'
        color='primary'
        >{title}</Typography>}
        
        
        
      />
      <Typography variant="body2" className={classes.created} color="textSecondary">{dayjs(created_on).fromNow()}</Typography>
      <CardMedia id='imageUr' className={classes.ima}
              image={imagurl}
              title="Profile pic"/>
      
      <CardMedia
        className={classes.media}
        id='imageU'
        image={gifUrl}
        title="Gifs"
        onClick={() => { this.handleClick(id,article_id,article,gifUrl); }}
        
      />
      <Button  onClick={() => { this.handleClick(id,article_id,article,gifUrl); }} type="submit" color='primary' className={classes.buttona}><AddCommentIcon/><span className={classes.comments}>{coments ? coments[0] === null ? null: coments.length : null}</span></Button>
                    
                    <Button type="submit" style={{color:'#d0583d'}} onClick={() => { this.handleDeleteOpen(id,article,gifUrl); }} className={classes.button}><DeleteIcon /></Button>
      </Card>
             </div>
            }
            <FeedDetails open={this.state.open} close={this.handleClose}/>
            <DeleteFeed article={this.state.article} gif={this.state.gif} id= {this.state.deleteId} open={this.state.deleteOpen} close={this.handleDeleteClose} />
            </div>
        )
    }
}


Feeds.propTypes = {
    getSingleArticles: PropTypes.func.isRequired,
    getSingleGifs: PropTypes.func.isRequired,
    clearArt: PropTypes.func.isRequired
    
}

export default connect(null, {getSingleArticles,getSingleGifs,clearArt})(withStyles(styles)(Feeds))