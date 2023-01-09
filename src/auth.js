import axios from "axios";
import url from "./config";

const token = localStorage.getItem('token');
let auth = false
let auth_type = 0
if(token){
    auth = true;   
}else{
    auth = false
}
const auth_check = axios.post(`${url}/auth`,{"token": token})
export default auth
export {token, auth_check}
