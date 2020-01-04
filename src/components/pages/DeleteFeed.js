import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import myButton from './utils/myButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'
// Redux stuff
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import {deleteArt} from '../../actions/articleActions'
import {deleteGif} from '../../actions/userAction'
import {feeds} from '../../actions/userAction'


const styles = (theme) => ({
 
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  },
  button: {
    color: '#33c9dc'
  }
});

class DeleteFeed extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: this.props.open,
      data: null,
      message: null
    }
  }
  
  handleClick = () => {
      const article = this.props.article
      const id = this.props.id
      const gif = this.props.gif
      if(!gif){       
        this.props.deleteArt(id).then(res => this.setState({message: res.payload.data.message}))
      }else{
        this.props.deleteGif(id).then(res => this.setState({message: res.payload.data.message}))
      }
      
      
      this.props.feeds()
      
  }
 
 
  render() {
   
    const {classes} = this.props
    console.log(this.props.id)
   
    
    return (
      <Fragment>
        <Dialog
          open={this.props.open}
          onClose={this.props.close}
          fullWidth
          maxWidth="sm"
        >
          <myButton
            tip="Close"
            onClick={this.props.close}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </myButton>
          <DialogContent>
           <CardActionArea>
             <CardContent>
             <Typography variant="h6">Confirm Delete or click X to cancel</Typography>
             <Button type="submit" color='primary' onClick={() => { this.handleClick(); }} className={classes.button}>Yes, Delete</Button>
             <Typography variant="h6">{this.state.message}</Typography>
             
             </CardContent>
           </CardActionArea>
         
           
            
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteFeed.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  
}),
deleteArt: PropTypes.func.isRequired,
deleteGif: PropTypes.func.isRequired,
feeds: PropTypes.func.isRequired
 
};

const mapStateToProps =(state) =>{
   const title = state.articles.data  
   return {
    title
  }
}



export default connect(mapStateToProps,{deleteArt,deleteGif,feeds}
  
)(withStyles(styles)(DeleteFeed));