import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Movie from './Pages/Movies/Movie';
import Search from './Pages/Search/Search';
import Footer from './Components/Footer/Footer';

function App() {
  return (
   <>
     {/* <Navbar searchPlaceholder="🔍Search for something specific"/> */}
       {/* <Home/> */}
       <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:movieId" element={<Movie/>} /> 
        </Routes>
        </BrowserRouter>
        <Footer/>
   </>
  );
}

export default App;
