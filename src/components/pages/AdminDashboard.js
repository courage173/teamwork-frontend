import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core'
import {connect} from "react-redux"
import CircularProgress from '@material-ui/core/CircularProgress'; 
import {register} from '../../actions/auth'
import './styles/loginStyle.css';
import {getUserArticles} from '../../actions/articleActions';
import Feeds from '../Feeds';
import Box from '@material-ui/core/Box';
import PostArticles from './postArticle'


const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    style: { width: '25rem', height: '60em' },
    color: '#33c9dc',
}

const defaultProp = {
    bgcolor: 'background.paper',
    m: 1,
    color: '#33c9dc',
}
const styles = {
   
    image: {
        height: '200px',
        width: '200px',
        borderRadius: '1000px',
        float: 'left'
    },
    pageTitle: {
        margin: '50px auto 50px auto',
        paddingLeft: '30px'
        
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
    frm: {
        float: null,
        width: '300px'
    },
    update: {
        float: 'left',
        
    },
    kr: {
        overflow:'hidden'
    },
    div: {
        float: 'left'
    },
    subMenu: {
        display: 'flex',
        padding: '10px',
        float: 'left',
        spacing: '5px',
        border: '1px solid #33c9dc',
        margin: '20px',
        width: '95%'
    },
    artMenu: {
        padding: '10px',
        spacing: '5px',
        overflow:'hidden'
    },
    cat: {
        paddingLeft: '20px',
        
    },
    postArt: {
        display: 'flex',
        padding: '10px',
        float: 'left',
        spacing: '5px',
        //border: '1px solid #33c9dc',
        margin: '20px',
        width: '95%',
        color: '#33c9dc'
    },
    area: {
        marginTop: '20px'
    },
  
}




class AdminDashboard extends Component {
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
            user_id: null,
            data: null,
            message: ''
        }
    }
    componentDidMount(){
        //this.setState({user_id: userId})
        
        this.props.getUserArticles(1).then(res => {
            
            this.setState({data: res.payload.data})
        })
        
    }
    

    handleSubmit = (event) => {
        
        event.preventDefault();
        this.setState({
            loading: true
        })
        const email = this.state.email
        const password = this.state.password
        const first_name = this.state.first_name
        const last_name =  this.state.last_name
        const jobroles= this.state.jobRoles
        const department = this.state.department
        const address = this.state.address
        const gender = this.state.gender
        const is_admin = this.state.isAdmin
        //console.log(isAdmin)
           
        
        this.props. register(
            email,
            password, 
            first_name,
            last_name,
            jobroles,
            is_admin ,
            department,
            address
           
                
                
        ).then(()=> {
            this.setState({loading: false,message: `Success! User with Email ${this.state.email} and password ${this.state.password} created successfully`})
        }).catch((err)=>{
            console.log(err)
            this.setState({error: err.response, loading: false})
        })
        
        
        
                                                
            
    }

    handleChange =(event)=>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleChecked =(event)=>{
        
        this.setState({
            isAdmin : event.target.checked
        })
    }
    render() {
        const {classes,user} =this.props;
        const photoUrl = user.imageUrl
        const {error,loading} = this.state
        let articles = this.state.data ? (
            this.state.data.map((dat) => <Feeds key={dat.article_id} data={dat}/>) 
        ) : (<p>Loading...</p>)
        return (
           <Grid container    className={classes.form}>
            <Grid item container sm={8} xs={12}>
               <Typography variant='h4' id='kr'>Welcome Admin</Typography>
              <div className={classes.div}>
              <img className={classes.image} alt="Default" src={photoUrl? photoUrl : "https://res.cloudinary.com/dm4gkystq/image/upload/v1577129448/wxovzrmx7onvd5fsktzk.jpg"} />
              
               <br />
               <div id='fle' border={4} {...defaultProp} className={classes.subMenu}>
               <Typography id='kr' className={classes.cat} component={Link} to='/update'>update Your Profile</Typography>
               <Typography  className={classes.cat} id='krd'>|</Typography>
               <Typography className={classes.cat} id='kr'>Create Categories</Typography>
               <Typography className={classes.cat} id='krd'>|</Typography>
               <Typography className={classes.cat} id='kr'>Manage Users</Typography>
               <Typography className={classes.cat} id='krd'>|</Typography>
               <Typography className={classes.cat} id='kr'>Flagged Comments</Typography>
               </div>
               
               
               
              </div>
              <div className={classes.artMenu}>
                  <PostArticles />
                    {articles}
                 </div>
               </Grid>
               <Grid  item sm={4} xs={12}>
            <Box id ='box' border={4} {...defaultProps}>
               <Typography variant='h3' className={classes.pageTitle}>
                       Create User
                   </Typography>
                   
                   <form id='form' noValidate onSubmit={this.handleSubmit}>
                        <TextField id="first_name" name='first_name' label='FirstName' className={classes.textField}
                        //value={this.state.first_name} helperText={error.first_name}
                        //error={error.first_name ? true : false} 
                        onChange={this.handleChange} fullWidth />

                        <TextField id="last_name" name='last_name' label='LastName' className={classes.textField}
                        value={this.state.last_name} //helperText={error.last_name}
                        //error={error.last_name ? true : false} 
                        onChange={this.handleChange} fullWidth />

                        <TextField id="email" name='email' label='Email' className={classes.textField}
                        value={this.state.email} //helperText={error.email}
                        //error={error.email ? true : false} 
                        onChange={this.handleChange} fullWidth />   

                        <TextField id="department" name='department' label='Department' className={classes.textField}
                        value={this.state.department} //helperText={error.department}
                        //error={error.department ? true : false} 
                        onChange={this.handleChange} fullWidth />
                        
                        <TextField id="jobroles" name='jobroles' label='JobRoles' className={classes.textField}
                        value={this.state.jobroles} //helperText={error.jobroles}
                        //error={error.jobroles ? true : false} 
                        onChange={this.handleChange} fullWidth />

                        <label>
                            isAdmin: 
                             <input
                                name="checked"
                                type="checkbox"
                                checked={this.state.isAdmin}
                                onChange={this.handleChecked} />
                        </label>

                        <TextField id="address" name='address' label='Address' className={classes.textField}
                        value={this.state.address} // helperText={error.address}
                       // error={error.address ? true : false} 
                        onChange={this.handleChange} fullWidth />

                        <TextField id="password" type="password" name='password' label='Password' className={classes.textField}
                        value={this.state.password} 
                        //helperText={error.password}
                        //error={error.password ? true : false}
                        onChange={this.handleChange} fullWidth />
                       
                       <Button type="submit" variant="contained" color='primary' className={classes.button}>Submit
                        {loading &&(
                            <CircularProgress size={27} className={classes.progress}/>
                        )}
                        </Button>
                        
                        <p style={{color: "green"}}>{this.state.message}</p>  
                   </form>
                </Box>

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
AdminDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
     register: PropTypes.func.isRequired,
     getUserArticles: PropTypes.func.isRequired
}

export default connect(mapStateToProps,{ register,getUserArticles})(withStyles(styles)(AdminDashboard))
