import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core'
import {connect} from "react-redux"
import CircularProgress from '@material-ui/core/CircularProgress'; 
import {login} from '../../actions/auth'
import team1 from './images/team1.jpg'

import './styles/loginStyle.css';
import Box from '@material-ui/core/Box';


const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    color: '#33c9dc',
  }

const styles = {
    form: {
        textAlign: 'center',
        marginTop: 100,
        height: 510

    },
    pageTitle: {
        margin: '50px auto 50px auto',
        fontSize: "4vw"
        
    },
    textField: {
        margin: '10px auto 10px auto',
    },
    button: {
        marginTop: 20,
        position: 'relative',
        
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    },
    progress: {
        position: 'absolute'
    },
    serverError:{
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    forgotPass: {
        marginTop: '2vh'
    }
  
}




class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            error: {},
            serverError: ''
        }
    }
    
//
    handleSubmit = (event) => {
        
        event.preventDefault();
        this.setState({
            loading: true
        })
        
        const email = this.state.email
        const password = this.state.password
        
        this.props.login(email,password).then((res)=> {
            //console.log(res.user.token)
            this.setState({loading: false, serverError: ''})
            if(res.user.data.is_admin){
                return this.props.history.push("/admin")
            }
            return this.props.history.push("/home")
        }).catch((err)=>{
            if(err.response && err.response.data){
                this.setState({error: err.response.data.errors, loading: false})
               }else{
                   this.setState({loading: false, serverError: 'Internal Server Error!! Check your Internet Connection'})
               }
        })
        
        
        
                                                
            
    }

    handleChange =(event)=>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    render() {
        const {classes} =this.props;
        const {error,loading} = this.state
        
        return (
           <Grid container  id='how'  className={classes.form}>
               <Grid item className="i"  sm={8} xs={12}>
               <Typography variant='h4' id='kr'>Teamwork</Typography>
               </Grid>
               <Grid item sm={4} xs={12}>
                <Box border={4} {...defaultProps} className="bod">
                
                <img class='mobileLogo' src={team1} alt="team work"/>
               <Typography variant='h3' id='pageTitle'  className={classes.pageTitle}>
                       Welcome Back
                   </Typography>
                   
                   <form id='form' noValidate onSubmit={this.handleSubmit}>
                        <Typography>
                            Please Log In
                        </Typography>
                        <TextField id="email" name='email' label='Email' className={classes.textField}
                        value={this.state.email} helperText={error.email}
                        error={error.email ? true : false} 
                        onChange={this.handleChange} fullWidth />
                        <TextField id="password" type="password" name='password' label='Password' className={classes.textField}
                        value={this.state.password} 
                        helperText={error.password}
                        error={error.password ? true : false}
                        onChange={this.handleChange} fullWidth />
                        {error.message && (
                            <Typography variant="body2" className={classes.customError}>
                                {error.message}
                            </Typography>
                        )}
                        <Button type="submit" disabled={loading} id="submitButton" variant="contained" color='primary' className={classes.button}>Login
                        {loading &&(
                            <CircularProgress size={20} className={classes.progress}/>
                        )}
                        </Button>
                        <Typography varaint='body2' className={classes.forgotPass}>Forgot password?</Typography>
                        <Typography className={classes.serverError}> {this.state.serverError} </Typography>
                   </form>
                   </Box>

               </Grid>
           </Grid>
        )
    }
}


Login.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
    login: PropTypes.func.isRequired
}

export default connect(null,{login})(withStyles(styles)(Login))
