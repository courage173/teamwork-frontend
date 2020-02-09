import React, { Component, Fragment} from 'react'
import {connect} from "react-redux"
import {Button} from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles';
import './styles/PostCommentStyle.css'
import { postArticleComment,getArticleComments,deleteArtComment } from '../../actions/articleActions';
import {getGifComment,postGifComments,deleteGifComments} from '../../actions/userAction'
import dayjs from 'dayjs';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete'


const styles = (theme) => ({
    button: {
        width: '10px',
        height: '4vh',
        marginBottom: '5px',
        borderRadius: '3vh',
        textTransform: "none",
        outline: 'none',
        position: 'relative',
    },
    progress: {
        position: 'absolute'
    },
    name: {
        marginLeft: '2vh'
      },
    textDiv: {
        width: '100%',
       
    },
    
    commentPost: {
        width: '100%'
      },
    profileImage: {
        width: '8vh',
        height: 70,
        borderRadius: '100%',
        objectFit: 'cover',
        marginLeft: '3vh'
      }
})
class PostComment extends Component {
    constructor(){
        super()
        this.state = {
            text: '',
            data: [],
            loading: false,
            load: true
        }
    }
    componentDidMount(){
        if(this.props.article){
            this.props.getArticleComments(this.props.id).then((res)=> this.setState({data: this.props.comments}))
        }else {
            this.props.getGifComment(this.props.id).then((res)=> this.setState({data: this.props.comments}))
        }
        
        
    }
    handleSubmit =(event) => {
        event.preventDefault()
        this.setState({loading: true, load: true,text: ''})
        const text = this.state.text
        if(this.props.article){
            this.props.postArticleComment(this.props.id,text).then((res) => {
           
                this.setState({loading: false})
            })
        }else{
            this.props.postGifComments(this.props.id,text).then((res) => {
           
                this.setState({loading: false})
            })
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps,prevState) {
            
        if(prevState === nextProps){
            return 
        }else{
            console.log(nextProps.comments)
            this.setState({data: nextProps.comments})
        }

      }

    handleChange =(e)=>{
        this.setState({
            [e.target.name] : e.target.value,
            load: false
        })
    }


    handleDelete = (comment_id) => {
        console.log(this.props.userId)
        if(this.props.article){
            this.props.deleteArtComment(comment_id).then((res) => console.log(res))
            this.props.getArticleComments(this.props.id)
        }else{
            this.props.deleteGifComments(comment_id).then((res)=> console.log(res))
            this.props.getGifComment(this.props.id)
        }
    }

    

    render() {
        const {classes} = this.props
       const {loading,load} = this.state
        
        const comments = this.state.data.map((com) => (
            
            <Grid container spacing={16} className={classes.mainDiv}>
            <img src={com.image_url ? com.image_url : "https://res.cloudinary.com/dm4gkystq/image/upload/v1577129448/wxovzrmx7onvd5fsktzk.jpg"} 
            alt="Profile" className={classes.profileImage} id='profilePic' />
        
          <Typography           
              color="primary"
              className={classes.name} 
              id='nam' 
            >
              {com.first_name}  <span variant="body2" className='creatDate'> {dayjs(com.created_on).format('h:mm a, MMMM DD YYYY')}</span>
            </Typography>
            <div className='content'>
           
            <Typography           
              color="primary"
              className={classes.name} 
              id='names' 
            >
              {com.first_name}  <span variant="body2" className='creatDate'> {dayjs(com.created_on).format('h:mm a, MMMM DD YYYY')}</span>
            </Typography>
           
            <div>
                
                <Typography id='text1' className={classes.name} variant="body1">{com.comments}</Typography>
                <Button type="submit" style={{color:'#d0583d', float: 'right'}} 
                onClick={() => { this.handleDelete(com.comment_id); }}
                className={classes.button}><DeleteIcon /></Button>
                
                </div>
                </div>
                
                
           
            <hr id='invisibleSeparator' className={classes.commentPost}/>
            </Grid>
        ))
        return (
            <Fragment>
                {comments}
                <div className={classes.textDiv}>
                    <textarea name='text' value={this.state.text}
                    onChange={this.handleChange}
                    className='textA' placeholder="Reply" >
                    
                    </textarea>
                <Button className={classes.button} disabled={load} variant="contained" onClick={this.handleSubmit} color='primary'
                >Submit {loading &&(
                    <CircularProgress size={15} className={classes.progress}/>
                )}</Button >
                
                </div>

            </Fragment>
        )
    }
}


const mapStateToProps =(state) =>{
    const {comments,user} = state
    return {
     comments: comments.comments,
     userId: user.user_id
   }
}

export default connect(mapStateToProps,{postArticleComment,
    getArticleComments,
    getGifComment,
    deleteArtComment,
    deleteGifComments,
    postGifComments})(withStyles(styles)(PostComment))  