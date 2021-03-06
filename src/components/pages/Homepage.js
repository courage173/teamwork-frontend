import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Feeds from '../Feeds';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import Profile from './Profile';
import {feeds} from '../../actions/userAction'
import PostArticles from './postArticle'
import PostGif from './postGif'
import './styles/homeStyle.css';
//h
class Homepage extends Component {
    state= {
        data: null
    };
        
        componentDidMount(){
            

            this.props.feeds().then(res => {
               
                this.setState({data: res.payload.data})
            })
            
            // axios.get('https://krealax.herokuapp.com/v1/articles')
            //     .then(res => {
                    
            //         this.setState({data: res.data.data})
            //     })
            //     .catch(err => console.log(err))
        }
        UNSAFE_componentWillReceiveProps(nextProps,prevState) {
            
            if(prevState === nextProps){
                return 
            }else{
                this.setState({data: nextProps.article})
            }

          }
       

      
    render() {
        let articles = this.state.data ? (
            this.state.data.map((dat) => <Feeds key={dat.id} data={dat}/>) 
        ) : (<p>Loading...</p>)

        return (
           
            <Grid container spacing={5}>
                <Grid className='homeGrid' item sm={8} xs={12}>
                <div className="article">
                    <PostArticles/>
                    
                    <PostGif className='gif'/>
                   
                </div>
                
                    {articles}
                </Grid>
                <Grid item className="profileOff" sm={4} xs={10}>

                    <Profile  />
                    
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps =(state) =>{
    const article = state.articles.articles
  
    return {
     article
   }
 }

Homepage.propTypes = {
    feeds: PropTypes.func.isRequired
    
}



export default connect(mapStateToProps,{feeds})(Homepage)
