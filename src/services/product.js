import axios from 'axios'
import url from '../config'

const getProduct = axios.get(`${url}/product`)
const addProduct = (data) => {
    axios.post(`${url}/product`, data) 
} 
export { getProduct, addProduct }