import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Feeds from '../Feeds';
import Login from './Login'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import Profile from './Profile';
import {feeds} from '../../actions/userAction'
import PostArticles from './postArticle'
import PostGif from './postGif'
import './styles/homeStyle.css';

class Homepage extends Component {
    state= {
        data: null
    };
        
        componentDidMount(){
            

            this.props.feeds().then(res => {
                console.log(res.payload.data)
                this.setState({data: res.payload.data})
            })
            
            // axios.get('https://krealax.herokuapp.com/v1/articles')
            //     .then(res => {
                    
            //         this.setState({data: res.data.data})
            //     })
            //     .catch(err => console.log(err))
        }
    render() {
        console.log(this.state.data)
        let articles = this.state.data ? (
            this.state.data.map((dat) => <Feeds key={dat.id} data={dat}/>) 
        ) : (<p>Loading...</p>)

        return (
           
            <Grid container spacing={5}>
                <Grid item sm={8} xs={14}>
                <div className="article">
                    <PostArticles/>
                    
                    <PostGif className='gif'/>
                   
                </div>
                
                    {articles}
                </Grid>
                <Grid item sm={4} xs={10}>

                    <Profile />
                    
                </Grid>
            </Grid>
        )
    }
}
Homepage.propTypes = {
    getUser: PropTypes.func.isRequired,
    feeds: PropTypes.func.isRequired
    
}



export default connect(null,{feeds})(Homepage)
