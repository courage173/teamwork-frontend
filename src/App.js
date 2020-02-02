import React from 'react';
import './App.css';

import {Switch, Route,Redirect} from 'react-router-dom';
import Navbar from './components/pages/Navbar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//pages
import Login from './components/pages/Login'
import Homepage from './components/pages/Homepage'
import About from './components/pages/About'
import Dashboard from './components/pages/Dashboard';
import AdminDashboard from './components/pages/AdminDashboard'
import updateForm from './components/pages/updateForm'
import postArticle from './components/pages/postArticle'
import FeedDetails from './components/pages/feedDetails'



const theme = createMuiTheme({
   palette: {
     primary: {
       light: '#33c9dc',
       main: '#00bcd4',
       dark: '#008394',
       contrastText: '#fff'
     },
     secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
   },
   invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20
  },
   typography: {
     useNextVariants: true,
   }
})
function detectmob() { 
  if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  ){
     return true;
   }
  else {
     return false;
   }
 }
 

const App =({isAuthenticated}) => {
  
  const style = isAuthenticated === false && detectmob() === true? '1vh' : null
  console.log(style)
  return (
    <React.Fragment>
     <MuiThemeProvider theme={theme}> 
      <Navbar />
      <div className="container" style={{marginTop: style}} >      
      <Switch>
        
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/home' exact component={Homepage} />
        <Route path='/' exact component={Login} />   
        <Route path='/about' exact component={About} />
        <Route path='/admin' exact component={AdminDashboard} />
        <Route path='/update' exact component={updateForm} />
        <Route path='/article' exact component={postArticle} />
        <Route path='/details' exact component={FeedDetails} />
        <Redirect from="*" to="/" />
          
      </Switch>
      </div>
     </MuiThemeProvider>
    </React.Fragment>
  );
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}
function mapStateToProps(state){
  return {
      isAuthenticated: !!state.user.authenticated,
  }
}

export default connect(mapStateToProps,null)(App);
