import { useNavigate } from "react-router-dom";
const token = localStorage.getItem('token');
let auth = false
if(token){
    auth = true
}else{
    auth = false
}
export default auth
export {token}
