import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {Toolbar} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth'
import PersonIcon from '@material-ui/icons/Person';
import InfoIcon from '@material-ui/icons/Info';
import './styles/NavStyle.css'


const Navbar = ({isAuthenticated, logout,isAdmin})=>(
    <AppBar position="fixed" className="appBar ">
        
        <Toolbar className="nav-container ">
    
            <div id='nav' class="navbar navbar-expand-lg navbar-light  ">
            <nav class="navbar navbar-expand-md  ">
            
 
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>
  
</nav>
<div  className="collapse navbar-collapse" id="collapsibleNavbar" >
    
            {isAuthenticated ? <Button  className="nav-link col" color="primary"  component={Link} to="/home" >Home</Button>: null}
            {isAuthenticated ? <Button className="nav-link col"  color="inherit" component={Link} to={isAdmin ? "admin":"/dashboard"} >Dashboard</Button>: null}
        {isAuthenticated ?<Button className="nav-link col"  onClick={()=> logout()} component={Link} to="/" color="inherit">Logout</Button>:  <Button color="inherit" className="nav-link col" component={Link} to="/">Login</Button> }
            <Button color="inherit" className="nav-link col"  component={Link} to="/about" >About</Button>
            
            </div>
            </div>
            {isAuthenticated ? <Button  className="icon" color="inherit"  component={Link} to="/home" ><HomeIcon /></Button>: null}
            {isAuthenticated ? <Button className="icon"  color="inherit" component={Link} to={isAdmin ? "admin":"/dashboard"} ><PersonIcon/></Button>: null}
            <Button color="inherit" className="icon"  component={Link} to="/about" ><InfoIcon /></Button>
        </Toolbar>
    </AppBar>
)
Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}
function mapStateToProps(state){
    return {
        isAuthenticated: !!state.user.authenticated,
        isAdmin: !!state.user.is_admin
    }
}

export default connect(mapStateToProps,{logout})(Navbar)