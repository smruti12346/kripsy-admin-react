import url from "../config";
import axios from 'axios'
const getOrder = axios.get(`${url}/order`)

export { getOrder }