import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Feeds from '../Feeds';
import Login from './Login'


export default class Homepage extends Component {
    state= {
        data: null
    };
        
        componentDidMount(){
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
