import React, { Component, Fragment} from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/button'
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {feeds} from '../../actions/userAction'
import {getAllGif} from '../../actions/userAction'
import {getUser} from '../../actions/auth';
import postArticles from './postArticle';
import Profile from './updateForm';
import './styles/dashboardStyle.css';
import {Link} from 'react-router-dom';
import PostArticles from './postArticle'
import {getUserArticles} from '../../actions/articleActions'
import PostGif from './postGif'
import Feeds from '../Feeds'



const styles = {
    update: {
        margin: '10px auto 30px auto',
    },
    image: {
        height: '500px',
        width: '550px',
        
       paddingLeft: '50px',
       borderRadius: '10px'
    },
    name: {
        paddingBottom: '10px',
        paddingLeft: '10px'
    },
    profile: {
        paddingTop: '10px',
        
    },
    edit: {
        paddingBottom: '10px',
        position: 'center',
        textDecoration: 'none',
        paddingLeft: '10px',
        
    }
}
class Dashboard extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        department: '',
        jobRole: '',
        user_id: null,
        data: null
    }
    componentDidMount() {
        this.props.getUser().then(res => this.setState({first_name: res.user.data.first_name, last_name: res.user.data.last_name,
            email: res.user.data.email, department: res.user.data.department, jobRole: res.user.data.jobrole,userId: res.user.data.user_id
        }))
        this.props.feeds().then(res => console.log(res))
        this.props.getAllGif().then(res => console.log(res))
        const userId = this.state.user_id
        this.props.getUserArticles(userId).then(res => this.setState({data: res.payload.data}))
    }
   

        
    
   
    render() {
        console.log(this.state.data)
        let articles = this.state.data ? (
            this.state.data.map((dat) => <Feeds key={dat.id} data={dat}/>) 
        ) : (<p>Loading...</p>)
        const {error,loading} = this.state
        //const {user:{first_name,last_name,is_admin,email,created_on}} = this.props
        const first_name = this.state.first_name
        const last_name = this.state.last_name
        const email = this.state.email
        const department = this.state.department 
        const jobRole =  this.state.jobRole
         const {classes,user} =this.props
        //console.log(this.props.user.data.email)
        
        return (
            <Grid container spacing={5}>
                <Grid item sm={10} xs={14}>
                <div className='editp'>
                <div id='editProfile'>
                <Typography size="small" color='primary' className={classes.edit}  component={Link} to='/update'>
                        Edit Profile
                    </Typography>
                </div>
                <Typography variant="h4"  className={classes.name}>{first_name + ' ' + last_name}</Typography>
                
                    <img alt='dashImage' className="img-fluid img-responsive img-rounded card-img-topin" src={user.imageUrl? user.imageUrl : "https://res.cloudinary.com/dm4gkystq/image/upload/v1577129448/wxovzrmx7onvd5fsktzk.jpg"} />
                    </div>
                 <div className='containe'>
                 {/* <Typography variant="h5" className={classes.profile}>Profile details</Typography> */}
                    <Typography  className={classes.update}>{email}</Typography>
                    <Typography  className={classes.update}>{department} </Typography>
                    <Typography  className={classes.update}>{jobRole}</Typography>
                 </div>
                 <div className='main'>
                 <PostArticles/>
                 <div className='art'>
                    {articles}
                 </div>
                    
                 </div>
                </Grid>
                <Grid item sm={2} xs={10}>
                    
                        <postArticles />
                        
                        
                   
                </Grid>
            </Grid>
            
        )
    }
}

const mapStateToProps =(state) =>{
    return {
      user:  state.user
    }
    
}
Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    feeds: PropTypes.func.isRequired,
    getAllGif: PropTypes.func.isRequired,
    getUserArticles: PropTypes.func.isRequired
    
    
}

export default connect(mapStateToProps,{feeds,getAllGif,getUser,getUserArticles})(withStyles(styles)(Dashboard))
