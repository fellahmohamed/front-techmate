import axios from 'axios'
import Cookies from "js-cookie"
/**
  Axios instance to send requests
*/
const API = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 20000,
})

// Add a request interceptor to add the token to each request
API.interceptors.request.use(async (config) => {
  const cookieValue = Cookies.get('access_token');

  // If the token exists, add it to the Authorization header
  config.headers['Content-Type']=  "multipart/form-data"
  if (cookieValue) {
    config.headers.Authorization = `Bearer ${cookieValue}` 
  }

  return config
})

export default API