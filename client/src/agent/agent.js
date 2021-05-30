import axios from "axios";

axios.defaults.baseURL = "https://pasjansklondike.herokuapp.com/";
axios.defaults.withCredentials = true;

export default axios;
