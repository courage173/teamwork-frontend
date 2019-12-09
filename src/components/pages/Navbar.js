import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth'
let token = localStorage.getItem('krealaxJWT')
const Navbar = ({isAuthenticated, logout})=>(
    <AppBar position="fixed">
        <ToolBar className="nav-container">
            <div id='nav'>
            <Button color="inherit" component={Link} to="/" >Home</Button>
            {isAuthenticated ? <Button color="inherit" component={Link} to="/dashboard" >Dashboard</Button>: null}
        {isAuthenticated ?<Button onClick={()=> logout()} component={Link} to="/login" color="inherit">Logout</Button>:  <Button color="inherit" component={Link} to="/login">Login</Button> }
            <Button color="inherit" component={Link} to="/about">About</Button>
            </div>
        </ToolBar>
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