import React, { Component, Fragment} from 'react'
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
import {getUser} from '../../actions/auth';
import postArticles from './postArticle';
import Profile from './updateForm';
import './styles/dashboardStyle.css';
import {Link} from 'react-router-dom';



const styles = {
    update: {
        margin: '10px auto 30px auto',
    },
    image: {
        height: '500px',
        width: '700px',
        borderRadius: '10px'
    },
    name: {
        fontWeight: 'bold',
        paddingBottom: '10px'
    },
    profile: {
        paddingTop: '10px'
    },
    edit: {
        paddingBottom: '10px',
        position: 'center',
        textDecoration: 'none'
    }
}
class Dashboard extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        department: '',
        jobRole: ''
    }
    componentDidMount() {
        this.props.getUser().then(res => this.setState({first_name: res.user.data.first_name, last_name: res.user.data.last_name,
            email: res.user.data.email, department: res.user.data.department, jobRole: res.user.data.jobrole
        }))
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
        //const {user:{first_name,last_name,is_admin,email,created_on}} = this.props
        const first_name = this.state.first_name
        const last_name = this.state.last_name
        const email = this.state.email
        const department = this.state.department === undefined ? this.state.department : "Department not assigned, Update profile"
        const jobRole =  this.state.jobRole === undefined ? this.state.jobRole : "JobRole not assigned, Update profile"
         const {classes} =this.props
        //console.log(this.props.user.data.email)
        
        return (
            <Grid container spacing={5}>
                <Grid item sm={10} xs={16}>
                <Typography size="small"  className={classes.edit} color="primary" component={Link} to='/update'>
                        Edit Profile
                    </Typography>
                <Typography variant="h4" color="primary" className={classes.name}>{first_name + ' ' + last_name}</Typography>
                
                    <img alt='dashImage' className={classes.image} src="https://res.cloudinary.com/dm4gkystq/image/upload/v1575044885/r7t7cn4s7xqctfq0fzch.png" />
                    
                    <Typography variant="h5" className={classes.profile}>Profile details</Typography>
                    <Typography variant="h6" color="primary" className={classes.update}>First Name - {first_name}</Typography>
                    <Typography variant="h6" color="primary" className={classes.update}>Last Name - {last_name}</Typography>
                    <Typography variant="h6" color="primary" className={classes.update}>Email - {email}</Typography>
                    <Typography variant="h6" color="primary" className={classes.update}>Department - {department} </Typography>
                    <Typography variant="h6" color="primary" className={classes.update}>Job roles - {jobRole}</Typography>
                    <Typography variant="h6" color="primary" className={classes.update}>Age</Typography>
                    
                </Grid>
                <Grid item sm={2} xs={8}>
                    
                        <postArticles />
                   
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

export default connect(mapStateToProps,{feeds,getAllGif,getUser})(withStyles(styles)(Dashboard))
