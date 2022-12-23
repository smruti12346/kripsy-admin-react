import axios from 'axios'
import url from '../config'

const getProduct = axios.get(`${url}/product`)

export { getProduct }