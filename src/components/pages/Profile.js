import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getUser} from '../../actions/auth'
import './styles/homeStyle.css';
import EditIcon from '@material-ui/icons/Edit'

const styles = {
    card: {
      maxWidth: 345,
      position: 'fixed'
    },
  };

class Profile extends Component {
  constructor(props){
    super(props)
    this.state= {
      firstName: '',
        loading: false
    }
  }
  componentDidMount(){
    
    this.props.getUser().then(res => {
      if(res.user){
        this.setState({
          loading: true,
          firstName: res.user.data.first_name ?  res.user.data.first_name : "Undefined"})
      }
     
    } ).catch(err => console.log(err) )
  }
  
  
    render() {
        const firstName = this.state.firstName
        console.log(firstName)
        const loading = this.state.loading
         const {classes} = this.props
         const {user} = this.props
         const photoUrl = user.imageUrl
         
        return (
            <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Profile Photo"
          
          className="img-fluid card-img-top embed-responsive-item"
          image={photoUrl? photoUrl : "https://res.cloudinary.com/dm4gkystq/image/upload/v1577129448/wxovzrmx7onvd5fsktzk.jpg"}
          title="Photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {loading ? firstName : null}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            this place is going to take a short bio of the current logged in user
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" component={Link} to='/update'>
          < EditIcon />
        </Button>
      
      </CardActions>
    </Card>
        )
    }
}


const mapStateToProps =(state) =>{
    return {
      user:  state.user
    }
    
}

Profile.propTypes = {
    getUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}


export default connect(mapStateToProps,{getUser})(withStyles(styles)(Profile))