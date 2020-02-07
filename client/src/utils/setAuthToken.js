import axios from "axios";
 
//This is used to set/delete header for axios.

const setAuthToken = (token) => {
    if (token){
        axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
    } else {
        delete axios.default.headers.common['Authorization']
    };
}

export default setAuthToken