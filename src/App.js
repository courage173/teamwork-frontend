import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route} from 'react-router-dom';
import Navbar from './components/pages/Navbar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import {privateRoute} from './components/route/userRoute'
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
   typography: {
     useNextVariants: true,
   }
})

const App =() => {
  return (
    <React.Fragment>
     <MuiThemeProvider theme={theme}> 
     <Navbar />
      <div className="container">      
      <Switch>
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/home' exact component={Homepage} />
        <Route path='/' exact component={Login} />   
        <Route path='/about' exact component={About} />
        <Route path='/admin' exact component={AdminDashboard} />
        <Route path='/update' exact component={updateForm} />
        <Route path='/article' exact component={postArticle} />
        <Route path='/details' exact component={FeedDetails} />
          
      </Switch>
      </div>
     </MuiThemeProvider>
    </React.Fragment>
  );
}

export default App;
