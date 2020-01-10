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
import EditIcon from '@material-ui/icons/Edit'
// Redux stuff
import { connect } from 'react-redux';
import { postGif } from '../../actions/userAction';
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
    color: '#33c9dc',
    marginLeft: '10px'
  }
});

class PostGif extends Component {
  state = {
    open: false,
    title: '',
    image: null,
    loading: false,
    success: "",
    flagged: false
   
  };

  handleImageChange = (event) => {
    
    this.setState({image: event.target.files[0]})
  };
 
  handleLogout = () => {
    this.props.logoutUser();
  }
  
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
  
    let form_data = new FormData();
    form_data.append('image', this.state.image);
    
    form_data.append('title', this.state.title);
    form_data.append('flagged', this.state.flagged);
    //console.log(...form_data)
    //console.log(username)
    
    this.props.postGif(
        form_data
    ).then(res => this.setState({
      loading: true,
      success: "Article Posted!!"
    }))
    .catch(err => console.log(err));
  };
  render() {
   
    const {
      classes
    } = this.props;
    return (
      <Fragment>
        <Button variant='contained' className='button' onClick={this.handleOpen} tip="Post Gif!">
          Post Gif
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <myButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </myButton>
          <DialogTitle>Post a new GIf</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="title"
                type="text"
                label="title"
                multiline
                rows="3"
                placeholder="title"
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <input
                type="file"
                id="imageInput"
                onChange={this.handleImageChange}
              />
            
              <Button
                onSubmit={this.handleSubmit}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
               // disabled={loading}
              >
                Submit
                {/* {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )} */}
              </Button>
              {this.state.loading ? <Typography color='primary' >{this.state.success}</Typography>: null}
            </form>
            
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostGif.propTypes = {
  postGif: PropTypes.func.isRequired,
 
};



export default connect(null,
  { postGif}
)(withStyles(styles)(PostGif));