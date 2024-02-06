import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': process.env.REACT_APP_API_KEY,
  },
});

export default instance;
