import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';


// MUI Stuff

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import ChatIcon from '@material-ui/icons/Chat'

import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'
// Redux stuff
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { typography } from '@material-ui/system';



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
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },
  image: {
    width: 200,
},
profileImage: {
  maxWidth: 200,
  height: 200,
  borderRadius: '50%',
  objectFit: 'cover'
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
   let createdAt
   let imageUrl
   
    const {classes,title} = this.props
    if(title===undefined){
      console.log(title)
    }else{
      id = title.ArticleId
      tit = title.title
      art = title.article
      name = title.createdBy
      gifUrl = title.gifUrl
      createdAt = title.createdOn
      imageUrl = title.imageUrl
      

      
    }

    const dialogMarkup = !name ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={imageUrl} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            
            color="primary"
            variant="h5"
            
          >
            {name}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          {art &&
                <div>
                <Typography variant="h5">{tit}</Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body1">{art}</Typography>
                </div>
                }
              
              
            
             {gifUrl &&
              <div>
                {
                  tit && <div>
                    <Typography variant="h5">{tit}</Typography>
                    <hr className={classes.invisibleSeparator} />
                  </div>
                  
                }
         <CardMedia
          component="img"
          alt="Profile Photo"
          height="auto"
          image={gifUrl}
          title="Photo"
          
        /> </div>}
        </Grid>
        <hr className={classes.visibleSeparator} />
      </Grid>

    )
    
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
            {dialogMarkup}
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
clearArt: PropTypes.func.isRequired
 
};

const mapStateToProps =(state) =>{
   const title = state.articles.data  
   return {
    title
  }
}



export default connect(mapStateToProps,
  
)(withStyles(styles)(FeedDetails));