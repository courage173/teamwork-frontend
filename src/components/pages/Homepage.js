import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Feeds from '../Feeds';
import Login from './Login'
import {getUser} from '../../actions/auth';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';


class Homepage extends Component {
    state= {
        data: null
    };
        
        componentDidMount(){
            //this.props.getUser().then(res => console.log(res))
            axios.get('https://krealax.herokuapp.com/v1/articles')
                .then(res => {
                    
                    this.setState({data: res.data.data})
                })
                .catch(err => console.log(err))
        }
    render() {
        console.log(this.state.data)
        let articles = this.state.data ? (
            this.state.data.map((dat) => <Feeds key={dat.article_id} data={dat}/>) 
        ) : (<p>Loading...</p>)

        return (
           
            <Grid container spacing={5}>
                <Grid item sm={6} xs={12}>
                    {articles}
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Login />
                </Grid>
            </Grid>
        )
    }
}
Homepage.propTypes = {
    getUser: PropTypes.func.isRequired
    
}



export default connect(null,{getUser})(Homepage)
