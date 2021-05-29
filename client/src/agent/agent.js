import axios from "axios";

const port = process.env.PORT || '3000'

const apiClient = axios.default.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'https://pasjansklondike.herokuapp.com:' + port,
    withCredentials: false,
    crossDomain: true,
    timeout: 10000
})
export default axios;
