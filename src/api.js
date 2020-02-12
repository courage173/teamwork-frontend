import axios from "axios";


let token = localStorage.getItem('krealaxJWT')


export default {
    //login route
    user: {
        login: (email,password) =>
            {console.log(email)
                return axios.post('http://localhost:3000/v1/auth/signin',{email,password}).then(res => {
                    //console.log(res.data.data.token)
                    token = res.data.data.token
                    return res.data.data})
                },
            //register route
        register: (
            email,
            password, 
            first_name,
            last_name,
            jobroles,
            is_admin ,
            department,
            address
           
        ) => {
            const request = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer ' + token    
                },
                body: JSON.stringify(
                  {  email,
                    password, 
                    first_name,
                    last_name,
                    jobroles,
                    is_admin ,
                    department,
                    address}
                    )
            };
        
            return fetch('http://localhost:3000/v1/auth/create-user', request).then(res => {
                return res.json()
            });
        },
        //upload profile picture
        uploadPic: (form_data) => {
            
            const request = {
                method: "PATCH",
                headers: {   
                    'Authorization': 'Bearer ' + token    
                },
                body: form_data
              };
          
              return fetch('http://localhost:3000/v1/auth/upload-image', request).then(res => {
                  return res.json()
              });
        },
        //getting all feeds(articles and gifs)
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
        //post gifs
        postGif: (form_data) => {
            console.log(form_data)
            const request = {
                method: 'POST',
                headers: {   
                    'Authorization': 'Bearer ' + token    
                },
                body: form_data
            };              
            
            return fetch('http://localhost:3000/v1/gifs/gifs',request).then(res => {
                
                return res.json()
            }).catch(err => console.log(err))
        },
        //get all gifs
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
        //get a single gif
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
                console.log(token)
                return res.json()
            }).catch(err => console.log(err))
        },
        //delete gifs
        deleteGif: (id) => {
            const request = {
                method: "DELETE",
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
        //post gif comment
        postGifComment: (id,comment) => {
            const request = {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',  
                    'Authorization': 'Bearer ' + token    
                },
                body: JSON.stringify({comment})
                
            }
            return fetch(`http://localhost:3000/v1/gifs/${id}/comment`,request).then(res => {
                
                return res.json()
            }).catch(err => console.log(err))
        },
        //get gif comment
        getGifComment: (gif_id) => {
            const request = {
                method: "GET",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',  
                    'Authorization': 'Bearer ' + token    
                },            
            }
            return fetch(`http://localhost:3000/v1/gifs/${gif_id}/comment`,request).then(res => {
                console.log(res)
                return res.json()
            }).catch(err => console.log(err))
            },
            //deleting gif comments
            deleteGifComment: (commentId) => {
                const request = {
                    method: "DELETE",
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',  
                        'Authorization': 'Bearer ' + token    
                    },            
                }
                return fetch(`http://localhost:3000/v1/gifs/${commentId}/comment`,request).then(res => {
                    console.log(res)
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
                //console.log(token)
                return res.json()
            }).catch(err => console.log(err))
        },
        //Articles api calls
        //Post articles
        postArticle: (title,article,flagged,category) => {
            const request = {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',  
                    'Authorization': 'Bearer ' + token    
                },
                body: JSON.stringify({title,article,flagged,category})
                
            }
            return fetch('http://localhost:3000/v1/articles',request).then(res => {
                
                return res.json()
            }).catch(err => console.log(err))
        },
        //Edit articles
        editArticle: (article_id,title,article,flagged,category) => {
        const request = {
            method: "PATCH",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',  
                'Authorization': 'Bearer ' + token    
            },
            body: JSON.stringify({title,article,flagged,category})
            
        }
        return fetch(`http://localhost:3000/v1/articles/${article_id}`,request).then(res => {
            
            return res.json()
        }).catch(err => console.log(err))
        },
        
        //get single articles
        getSingleArticle: (article_id) => {
        const request = {
            method: "GET",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',  
                'Authorization': 'Bearer ' + token    
            },
            
        }
        return fetch(`http://localhost:3000/v1/articles/${article_id}`,request).then(res => {
            
            return res.json()
        }).catch(err => console.log(err))
    },
    //get articles by a particular user
    getUserArticle: (userId) => {
        const request = {
            method: "GET",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',  
                'Authorization': 'Bearer ' + token    
            },
            
        }
        return fetch(`http://localhost:3000/v1/articles/user-feed/${userId}`,request).then(res => {
            
            return res.json()
        }).catch(err => console.log(err))
    },

        //get all articles
        getAllArticle: () => {
            const request = {
                method: "GET",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',  
                    'Authorization': 'Bearer ' + token    
                },
                
            }
            return fetch(`http://localhost:3000/v1/articles/`,request).then(res => {
                
                return res.json()
            }).catch(err => console.log(err))
        
        },
        //get articles in a category
        getCatArticle: (catId) => {
            const request = {
                method: "GET",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',  
                    'Authorization': 'Bearer ' + token    
                },
                
            }
            return fetch(`http://localhost:3000/v1/articles/cat/${catId}`,request).then(res => {
                
                return res.json()
            }).catch(err => console.log(err))
        },
        //Post articles comment
        postComment: (article_id,comment) => {
        const request = {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',  
                'Authorization': 'Bearer ' + token    
            },
            body: JSON.stringify({comment})
            
        }
        return fetch(`http://localhost:3000/v1/articles/${article_id}/comment`,request).then(res => {
            
            
            return res.json()
        }).catch(err => console.log(err))
        },
        //getting article comments
        getArticleComment: (article_id) => {
            const request = {
                method: "GET",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',  
                    'Authorization': 'Bearer ' + token    
                },            
            }
            return fetch(`http://localhost:3000/v1/articles/${article_id}/comment`,request).then(res => {
                console.log(res)
                return res.json()
            }).catch(err => console.log(err))
            },
        //deleting article comments
        deleteArticleComment: (commentId) => {
            const request = {
                method: "DELETE",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',  
                    'Authorization': 'Bearer ' + token    
                },            
            }
            return fetch(`http://localhost:3000/v1/articles/${commentId}/comment`,request).then(res => {
                console.log(res)
                return res.json()
            }).catch(err => console.log(err))
            },
    
        postCatgory: (data) => {
            const request = {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',  
                    'Authorization': 'Bearer ' + token    
                },
                body: JSON.stringify(data)
                
            }
            return fetch(`http://localhost:3000/v1/category`,request).then(res => {
                
                return res.json()
            }).catch(err => console.log(err))
            },
            editCatgory: (id,data) => {
                const request = {
                    method: "PATCH",
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',  
                        'Authorization': 'Bearer ' + token    
                    },
                    body: JSON.stringify(data)
                    
                }
                return fetch(`http://localhost:3000/v1/category/${id}`,request).then(res => {
                    
                    return res.json()
                }).catch(err => console.log(err))
            },
            getAllCat: () => {
                const request = {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',  
                        'Authorization': 'Bearer ' + token    
                    },
                    
                }
                return fetch(`http://localhost:3000/v1/category`,request).then(res => {
                    
                    return res.json()
                }).catch(err => console.log(err))
            },
            getSingleCat: (id) => {
                const request = {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',  
                        'Authorization': 'Bearer ' + token    
                    },
                    
                }
                return fetch(`http://localhost:3000/v1/category/${id}`,request).then(res => {
                    
                    return res.json()
                }).catch(err => console.log(err))
            },
            deleteCat: (id) => {
                const request = {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',  
                        'Authorization': 'Bearer ' + token    
                    },
                    
                }
                return fetch(`http://localhost:3000/v1/category/${id}`,request).then(res => {
                    
                    return res.json()
                }).catch(err => console.log(err))
            },
            //Delete Article
        deleteArticle: (article_id) => {
            const request = {
                method: "DELETE",
                headers: { 
                    'Content-Type': 'application/json',  
                    'Authorization': 'Bearer ' + token    
                },
                
                
            }
            return fetch(`http://localhost:3000/v1/articles/${article_id}`,request).then(res => {
                
                return res.json()
            }).catch(err => console.log(err))
            },
            
    }
    
}
