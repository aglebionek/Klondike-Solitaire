import axios from "axios";

let serverUrl;

if(process.env.NODE_ENV === "development"){
 serverUrl="http://localhost:3001/"
}else serverUrl ="https://pasjansklondike.herokuapp.com/"

axios.defaults.baseURL = serverUrl;
axios.defaults.withCredentials = true;

export default axios;
