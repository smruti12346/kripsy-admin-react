import axios from "axios";
import url from "../config";

const getCategory = axios.get(`${url}/category`)
export {getCategory}