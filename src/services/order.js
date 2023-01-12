import url from "../config";
import axios from 'axios'
const getOrder = axios.get(`${url}/order?per_page=30`)
const orderUpdate = (id, order_status) =>  axios.post(`${url}/order/${id}`,{order_status: order_status, _method: 'put'})
export {orderUpdate, getOrder}