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
  }
});

class PostArticles extends Component {
  state = {
    open: false,
    title: '',
    article: '',
    flagged: false,
    category: 'general',
    loading: false,
    success: "",
    load: false,
    loaded: true

   
  };
  
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    
    this.setState({ open: false, errors: {},success: "" });
    
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    if(this.state.title && this.state.article){
      this.setState({loaded: false})
    }else{this.setState({loaded: true})};
    
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({loading: true})
    const title = this.state.title;
    const article = this.state.article
    const flagged = this.state.flagged;
    const category = this.state.category
    
    this.props.postArticles(
        title,article,flagged,category
    ).then(res => {
      this.setState({
        loading: false,
        success: "Article Posted!!",
        load: true
      })
      
      setTimeout(() => {
        this.handleClose()
      },2000)
      
    })
    
    .catch(err => console.log(err));
  };
  render() {
   const {loading,loaded} = this.state
    const {
      classes
    } = this.props;
    return (
      <Fragment>
        <Button variant='contained' className='button' onClick={this.handleOpen} tip="Post an Article!">
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
              <TextField
                name="article"
                type="text"
                label="Article"
                multiline
                rows="3"
                placeholder="Article"
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                onSubmit={this.handleSubmit}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loaded}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
              {this.state.load ? <Typography color='primary' >{this.state.success}</Typography>: null}
            </form>
            
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostArticles.propTypes = {
  postArticles: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
}),
 
};



export default connect(null,
  { postArticles}
)(withStyles(styles)(PostArticles));
