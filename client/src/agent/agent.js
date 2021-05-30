import axios from "axios";

axios.defaults.baseURL = "http://pasjansklondike.herokuapp.com/";
axios.defaults.withCredentials = true;

export default axios;
