<<<<<<< HEAD
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.REACT_APP_API_KEY,
  },
});

export default instance;
=======
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
>>>>>>> 8d87fee6aa92c1563f17afc29f1af0355222befa
