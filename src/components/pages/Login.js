import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/button'
import {connect} from "react-redux"
import CircularProgress from '@material-ui/core/CircularProgress'; 
import {login} from '../../actions/auth'
import Card from '@material-ui/core/Card';



const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: '30px auto 30px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
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
    card: {
        display: 'flex',
        marginBottom: 20,
        
    }
}




class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            error: {}
        }
    }
    

    handleSubmit = (event) => {
        
        event.preventDefault();
        this.setState({
            loading: true
        })
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        const email = this.state.email
        const password = this.state.password
        console.log(user)
        this.props.login(email,password).then(()=> {
            this.setState({loading: false})
            this.props.history.push("/")
        }).catch((err)=>{
            console.log(err)
            this.setState({error: err.response.data.errors, loading: false})
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
           <Grid container className={classes.form}>
               <Grid item sm/>
               <Grid item sm>
                  <Card className={classes.content}>
                  <Typography variant='h3' className={classes.pageTitle}>
                       Login
                   </Typography>
                   <form noValidate onSubmit={this.handleSubmit}>
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
                        <Button type="submit" variant="contained" color='primary' className={classes.button}>Login
                        {loading &&(
                            <CircularProgress size={27} className={classes.progress}/>
                        )}
                        </Button>
                   </form>
                  </Card>
               </Grid>
               <Grid item sm/>
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
