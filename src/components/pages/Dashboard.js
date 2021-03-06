import React, { Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/button'
import {connect} from 'react-redux';
import {feeds} from '../../actions/userAction'
import {getAllGif} from '../../actions/userAction'
import {getUser} from '../../actions/auth';

import './styles/dashboardStyle.css';
import {Link} from 'react-router-dom';
import PostArticles from './postArticle'
import {getUserArticles} from '../../actions/articleActions'
import {Image,Transformation} from 'cloudinary-react'


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
        this.props.feeds()
        this.props.getAllGif()
        const userId = this.state.user_id
        this.props.getUserArticles(userId).then(res => this.setState({data: res.payload.data}))
    }
   

        
    
   
    render() {
        
        let articles = this.state.data ? (
            this.state.data.map((dat,i) => <Feeds key={i} data={dat}/>) 
        ) : (<p>Loading...</p>)
        
        //const {user:{first_name,last_name,is_admin,email,created_on}} = this.props
        const first_name = this.state.first_name
        const last_name = this.state.last_name
        const email = this.state.email
        const department = this.state.department 
        const jobRole =  this.state.jobRole
         const {classes,user} =this.props
        
        
        return (
            <Grid container item spacing={5}>
                <Grid item  sm={8} xs={12}>
                <div className='editp'>
                <div id='editProfile'>
                <Typography variant='body1' size="small" color='primary' className={classes.edit}  component={Link} to='/update'>
                        Edit Profile
                </Typography>
                </div>
                <Typography variant="h4"  className={classes.name}>{first_name + ' ' + last_name}</Typography>
                
                    <Image alt='dashImage' className="img-fluid img-responsive img-rounded card-img-topin" cloudName="dm4gkystq" publicId={user.imageUrl? user.imageUrl : "https://res.cloudinary.com/dm4gkystq/image/upload/v1577129448/wxovzrmx7onvd5fsktzk.jpg"}>
                    <Transformation aspectRatio="4:3" crop="fill" />
                    <Transformation width="auto" dpr="auto" crop="scale" />
                    </Image>
                    </div>
                 <div className='containe'>
                    <Typography variant="body1"  className={classes.update}>{email}</Typography>
                    <Typography variant="body1" className={classes.update}>{department} </Typography>
                    <Typography variant="body1" className={classes.update}>{jobRole}</Typography>
                 </div>
                 <div className='main'>
                 
                 <PostArticles/>
                 </div>
                 <div className='art'>
                    {articles}
                 </div>
                    
                 
                </Grid>
                <Grid item sm={4} xs={12}>
                    
                        
                        
                        
                   
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
