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
// Redux stuff
import { connect } from 'react-redux';
import { postArticles } from '../../actions/articleActions';

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
  }
});

class PostArticles extends Component {
  state = {
    open: false,
    title: '',
    article: '',
    flagged: false,
    category: 'general'
   
  };
  
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
    const article = this.state.article
    const flagged = this.state.flagged;
    const category = this.state.category
    this.props.postArticles(
        title,article,flagged,category
    );
  };
  render() {
   
    const {
      classes
    } = this.props;
    return (
      <Fragment>
        <Button onClick={this.handleOpen} tip="Post an Article!">
          Add New Article
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
          <DialogTitle>Post a new Article</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="SCREAM!!"
                multiline
                rows="3"
                placeholder="Scream at your fellow apes"
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="body"
                type="text"
                label="SCREAM!!"
                multiline
                rows="3"
                placeholder="Scream at your fellow apes"
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
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
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostArticles.propTypes = {
  postArticles: PropTypes.func.isRequired,
 
};



export default connect(null,
  { postArticles}
)(withStyles(styles)(PostArticles));