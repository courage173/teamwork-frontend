import React, { Component } from 'react'
import {uploadProfilePic} from '../../actions/auth'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core'
import {connect} from "react-redux"
import CircularProgress from '@material-ui/core/CircularProgress'; 

const styles = {
    form: {
        textAlign: 'center',
        marginTop: 100,
        height: 510

    },
    image: {
        height: '200px',
        width: '200px',
        borderRadius: '1000px',
        float: 'left'
    },
    pageTitle: {
        margin: '50px auto 50px auto',
        
    },
    textField: {
        margin: '10px auto 10px auto',
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    },
    customSuccess: {
        color: 'green',
        fontSize: '0.8rem'
    },
    progress: {
        position: 'absolute'
    },
    frm: {
        float: null,
        width: '300px'
    },
    update: {
        float: 'left',
        
    }
  
}
class updateForm extends Component {
    constructor(){
        super();
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            jobRoles: '',
            isAdmin: false,
            department: '',
            address: '',
            gender: '',
            error: {},
            image: null,
            message: null
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      };
   
   handleImageChange = (event) => {

    this.setState({image: event.target.files[0]})
   }

   handleSubmit = (event) => {
    event.preventDefault()
    let form_data = new FormData();
    form_data.append('image', this.state.image);
    
    this.props.uploadProfilePic(form_data).then(res => {
        if(res.payload.status === "success"){
            this.setState({message: "Uploaded Successfully"})
        }else{
            this.setState({message: "Image Upload fail"})
        }
    })
     
    
   }



    render() {
        const {classes,user} =this.props;
        const photoUrl = user.imageUrl
        const {error,loading,message} = this.state
    
        return (
            <form noValidate onSubmit={this.handleSubmit} className={classes.frm}>
                    <img className={classes.image} alt="Default" src={photoUrl? photoUrl : "https://res.cloudinary.com/dm4gkystq/image/upload/v1577129448/wxovzrmx7onvd5fsktzk.jpg"} />
                    <input
                type="file"
                id="imageInput"
                onChange={this.handleImageChange}

              />
              {message && (
                            <Typography variant="body2" className={message === "Image Upload fail"? classes.customError: classes.customSuccess}>
                                {message}
                            </Typography>
                        )}
                        <TextField id="first_name" name='first_name' label='First Name' className={classes.textField}
                        value={this.state.first_name} helperText={error.first_name}
                        error={error.first_name ? true : false} 
                        onChange={this.handleChange} fullWidth />
                        <TextField id="last_name"  name='last_name' label='Last Name' className={classes.textField}
                        value={this.state.last_name} 
                        helperText={error.last_name}
                        error={error.last_name ? true : false}
                        onChange={this.handleChange} fullWidth />
                        <TextField id="department" name='department' label='Department' className={classes.textField}
                        value={this.state.department} helperText={error.department}
                        error={error.first_name ? true : false} 
                        onChange={this.handleChange} fullWidth />
                        <TextField id="jobRoles" name='jobRoles' label='Job Role' className={classes.textField}
                        value={this.state.jobRoles} helperText={error.jobRoles}
                        error={error.jobRoles ? true : false} 
                        onChange={this.handleChange} fullWidth />
                        <TextField id="address" name='address' label='Address' className={classes.textField}
                        value={this.state.address} helperText={error.address}
                        error={error.first_name ? true : false} 
                        onChange={this.handleChange} fullWidth />
                        {error.message && (
                            <Typography variant="body2" className={classes.customError}>
                                {error.message}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color='primary' className={classes.button}>update
                        {loading &&(
                            <CircularProgress size={27} className={classes.progress}/>
                        )}
                        </Button>
                   </form>
        )
    }
}


const mapStateToProps =(state) =>{
    return {
      user:  state.user
    }
    
}
updateForm.propTypes = {
    uploadProfilePic: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
   
  };

export default connect(mapStateToProps,{uploadProfilePic})(withStyles(styles)(updateForm))