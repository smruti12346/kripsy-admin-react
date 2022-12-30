import axios from 'axios'
import url from '../config'

const getProduct = axios.get(`${url}/product`)
const addProduct = (data) => {
    axios.post(`${url}/product`, data) 
} 
const singleProduct = (id) => {
    axios.get(`${url}/product/${id}`)
}
export { getProduct, addProduct, singleProduct }