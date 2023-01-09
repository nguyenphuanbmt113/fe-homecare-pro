import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    //giúp những request gọi lên sẽ đc đính kèm axios
    withCredentials: true

});



export default instance;
