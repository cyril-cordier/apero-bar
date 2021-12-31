import axios from 'axios';

export default axios.create({
    baseURL:"https://api-apero-bar.herokuapp.com/api",
    // baseURL:"http://localhost:8080/api",
})