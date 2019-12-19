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
import { postArticles } from '../../actions/articleActions';
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
    gifUrl: '',
    loading: false,
    success: "",
    flagged: false
   
  };

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  }
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
    const title = this.state.title;
    const flagged = this.state.flagged
    const gifUrl = this.state.article
    this.props.postArticles(
        title,flagged
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
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <myButton
                tip="Edit profile picture"
                onClick={this.handleEditPicture}
                btnClassName="button"
              >
                <EditIcon color="primary" />
              </myButton>
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
  postArticles: PropTypes.func.isRequired,
 
};



export default connect(null,
  { postArticles}
)(withStyles(styles)(PostGif));