import React, {Component} from 'react';
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


class Navbar extends Component {
    constructor(){
        super();
        this.state = {
           active: false
        }
    }

    handleClick = () => {
        this.setState({active: !this.state.active})
       
    }
    
    render(){
        const {isAuthenticated, logout,isAdmin} = this.props
        const sideNav = this.state.active ? 'nav-active' : 'navLinks'
        const toggle = this.state.active ? 'toggle' : ' '
        const loginNav = isAuthenticated ? null : "cont"

    return (
        <AppBar position="fixed" className={ "appBarr " + loginNav }>
        
        <Toolbar className="left">
        
    
        
        <div className='fullNavs' onClick= { this.handleClick} >
              <ul className={sideNav}>
    
               <li> {isAuthenticated ? <Button onClick= { this.handleClick} className="coll" color="inherit"  component={Link} to="/home" >Home</Button>: null}</li>
               <li> {isAuthenticated ? <Button onClick= { this.handleClick} className="coll"  color="inherit" component={Link} to={isAdmin ? "admin":"/dashboard"} >Dashboard</Button>: null}</li>
               <li> {isAuthenticated ?<Button onClick= { this.handleClick} className="coll"  onClick={()=> logout()} component={Link} to="/" color="inherit">Logout</Button>:  <Button color="inherit" className="coll" component={Link} to="/">Login</Button> }</li>
               <li> <Button color="inherit" onClick= { this.handleClick} className=" coll"  component={Link} to="/about" >About</Button></li>
               
               </ul>
            </div>
           <div className='navs'>
            {isAuthenticated ? <Button  className="icon navIcon" color="inherit"  component={Link} to="/home" ><HomeIcon /></Button>: null}
            {isAuthenticated ? <Button className="icon navIcon"  color="inherit" component={Link} to={isAdmin ? "admin":"/dashboard"} ><PersonIcon/></Button>: null}
            <Button color="inherit" className="icon navIcon"  component={Link} to="/about" ><InfoIcon /></Button>
            </div>
           
            <div className={"burger " + toggle} onClick= { this.handleClick}>
            <div className="line1" />
            <div className="line2" />
            <div className="line3" />
        </div>
        </Toolbar>
    </AppBar>
    )
    }
}
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