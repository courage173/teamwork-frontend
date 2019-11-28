import axios from "axios";
// import {store} from './index'


// function getAccessToken() {
//     return store.getState().user.token
    
//      // adjust according to your store structure
//   }

  let token = localStorage.getItem('krealaxJWT')


export default {
    user: {
        login: (email,password) =>
            {console.log(email)
                return axios.post('http://localhost:3000/v1/auth/signin',{email,password}).then(res => {
                    console.log(res.data.data)
                    return res.data.data})},
        register: (userData) => {
            const request = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            };
        
            return fetch(`http://localhost:3000/v1/auth/create-user`, request).then(res => {
                return res.json()
            });
        },
        feeds: () => {
            const request = {
                method: "GET",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',  
                    'Authorization': 'Bearer ' + token    
                }
                
            }
            return fetch('http://localhost:3000/v1/feeds',request).then(res => {
                
                return res.json()
            }).catch(err => console.log(err))
        },
        postGif: (data) => {
            const request = {
                method: "GET",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',  
                    'Authorization': 'Bearer ' + token    
                },
                body: JSON.stringify(data)
                
            }
            return fetch('http://localhost:3000/v1/gifs/gif',request).then(res => {
                
                return res.json()
            }).catch(err => console.log(err))
        },
        getAllGif: () => {
            const request = {
                method: "GET",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',  
                    'Authorization': 'Bearer ' + token    
                }
                
            }
            return fetch('http://localhost:3000/v1/gifs/all-gifs',request).then(res => {
                
                return res.json()
            }).catch(err => console.log(err))
        },
        getSingleGif: (id) => {
            const request = {
                method: "GET",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',  
                    'Authorization': 'Bearer ' + token    
                }
                
            }
            return fetch(`http://localhost:3000/v1/gifs/${id}`,request).then(res => {
                
                return res.json()
            }).catch(err => console.log(err))
        },
        deleteGif: (id) => {
            const request = {
                method: "GET",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',  
                    'Authorization': 'Bearer ' + token    
                }
                
            }
            return fetch(`http://localhost:3000/v1/gifs/delete-gifs/${id}`,request).then(res => {
                
                return res.json()
            }).catch(err => console.log(err))
        },


        getUser: () => {
            const request = {
                method: "GET",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',  
                    'Authorization': 'Bearer ' + token    
                }
                
            }
            return fetch('http://localhost:3000/v1/auth/user',request).then(res => {
                
                return res.json()
            }).catch(err => console.log(err))
        },
        
        }
    
}
