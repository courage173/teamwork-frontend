import axios from "axios";

export default {
    user: {
        login: (user) =>
            {console.log(user)
                return axios.post('http://localhost:3000/v1/auth/signin',{user}).then(res => {
                    console.log(res.data.data)
                    return res.data.data})}
        }
    
}
