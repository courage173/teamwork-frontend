import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Stuff

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'
// Redux stuff
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';


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
  },
  image: {
    width: 200,
},
});

class FeedDetails extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      open: this.props.open,
      data: null
    }
  }
  
componentDidMount(){
  const {
     title, article
  } = this.props;
  
  if(title===undefined){
     this.setState({data: null})
  }else{
    this.setState({data: title.ArticleId})
  }
}
 
 
  render() {
   let id;
   let tit;
   let art
   let name
   let gifUrl
   
    const {classes,title} = this.props
    
    if(title===undefined){
      console.log(title)
    }else{
      id = title.ArticleId
      tit = title.title
      art = title.article
      name = title.createdBy
      gifUrl = title.gifUrl

      
    }
    
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
          <Card>
           <CardActionArea>
             <CardContent>
             <Typography variant="h5">Author: {name}</Typography>
              <Typography variant="h5">Title: {tit}</Typography>
              {art &&
                <div>
                <Typography variant="h5">Article-Content:</Typography>
                <Typography variant="body1">{art}</Typography>
                </div>
                }
              
              
             </CardContent>
             {gifUrl &&
              
              <CardMedia
          component="img"
          alt="Profile Photo"
          height="auto"
          image={gifUrl}
          title="Photo"
        />}
           </CardActionArea>
           </Card>
           
            
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

FeedDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  
}),
 
};

const mapStateToProps =(state) =>{
   const title = state.articles.data  
   return {
    title
  }
}



export default connect(mapStateToProps,
  
)(withStyles(styles)(FeedDetails));