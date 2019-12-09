import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/button'
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
            error: {}
        }
    }
    render() {
        const {classes} =this.props;
        const {error,loading} = this.state
        return (
            <form noValidate className={classes.frm}>
                    <img className={classes.image} alt="Default" src="https://res.cloudinary.com/dm4gkystq/image/upload/v1573881164/i9juuv6wgtcid02d7e92.png" />
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


export default withStyles(styles)(updateForm)