import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/button'
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {feeds} from '../../actions/userAction'
import {getAllGif} from '../../actions/userAction'



const styles = {
    update: {
        margin: '30px auto 30px auto',
    },
    image: {
        height: '200px',
        width: '200px',
        borderRadius: '1000px'
    }
}
class Dashboard extends Component {
    componentDidMount() {
        this.props.feeds().then(res => console.log(res))
        this.props.getAllGif().then(res => console.log(res))
    }
    constructor(){
        super();
        this.state = {
            first_name: '',
            last_name: '',
            loading: false,
            error: {}
        }

        
    }
   
    render() {
        const {error,loading} = this.state
        const {user:{first_name,last_name,is_admin,email,created_on}} = this.props
        const {classes} =this.props
        //console.log(this.props.user.data.email)
        
        return (
            <Grid container spacing={5}>
                <Grid item sm={8} xs={14}>
                    
                    <Typography color="primary" variant="h5" className={classes.update}>Welcome {first_name + ' ' + last_name}</Typography>
                    <img className={classes.image} alt="Default" src="https://res.cloudinary.com/dm4gkystq/image/upload/v1573881164/i9juuv6wgtcid02d7e92.png" />
                    <Typography variant="h6"  className={classes.update}>Update Your Profile</Typography>
                    <form noValidate>
                        <TextField id="first_name" name='first_name' label='First Name' className={classes.textField}
                        value={this.state.first_name} helperText={error.first_name}
                        error={error.first_name ? true : false} 
                        onChange={this.handleChange} fullWidth />
                        <TextField id="last_name"  name='last_name' label='Last Name' className={classes.textField}
                        value={this.state.last_name} 
                        helperText={error.last_name}
                        error={error.last_name ? true : false}
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
                </Grid>
                <Grid item sm={4} xs={10}>
                    <h1>Grid 2</h1>
                </Grid>
            </Grid>
            
        )
    }
}

const mapStateToProps =(state) =>({
    user: state.user
})
Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    feeds: PropTypes.func.isRequired,
    getAllGif: PropTypes.func.isRequired,
    
    
}

export default connect(mapStateToProps,{feeds,getAllGif})(withStyles(styles)(Dashboard))
