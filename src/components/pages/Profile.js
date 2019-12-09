import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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


const styles = {
    card: {
      maxWidth: 345,
    },
  };

class Profile extends Component {
    render() {
        const firstName = this.props.user.first_name
         const {classes, } = this.props
        return (
            <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Profile Photo"
          height="140"
          image="https://res.cloudinary.com/dm4gkystq/image/upload/v1573881164/i9juuv6wgtcid02d7e92.png"
          title="Photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {firstName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            this place is going to take a short bio of the current logged in user
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" component={Link} to='/update'>
          Edit Profile
        </Button>
      
      </CardActions>
    </Card>
        )
    }
}


const mapStateToProps =(state) =>({
    user: state.user.data
})

Profile.propTypes = {
    user: PropTypes.object.isRequired
}


export default connect(mapStateToProps,null)(withStyles(styles)(Profile))