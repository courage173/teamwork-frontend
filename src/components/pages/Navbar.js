import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {Toolbar} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth'
let token = localStorage.getItem('krealaxJWT')
const Navbar = ({isAuthenticated, logout})=>(
    <AppBar position="fixed">
        <Toolbar className="nav-container">
            <div id='nav'>
            
            {isAuthenticated ? <Button color="inherit" component={Link} to="/home" >Home</Button>: null}
            {isAuthenticated ? <Button color="inherit" component={Link} to="/dashboard" >Dashboard</Button>: null}
        {isAuthenticated ?<Button onClick={()=> logout()} component={Link} to="/" color="inherit">Logout</Button>:  <Button color="inherit" component={Link} to="/">Login</Button> }
            <Button color="inherit" component={Link} to="/about">About</Button>
            </div>
        </Toolbar>
    </AppBar>
)
Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}
function mapStateToProps(state){
    return {
        isAuthenticated: !!state.user.authenticated
    }
}

export default connect(mapStateToProps,{logout})(Navbar)