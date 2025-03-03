import axios from 'axios';

// Create an instance of axios
const instance = axios.create({
  baseURL: 'https://localhosst:8800',  // Replace with your base URL
  timeout: 10000,  // Optional: specify a timeout for requests
});

export default instance;
