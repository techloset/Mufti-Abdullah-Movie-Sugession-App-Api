import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../pages/home/Home'
import Search from '../pages/search/Search'
import Movie from '../pages/movies/Movie'

function Routese() {
  return (
    <div>
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:movieId" element={<Movie/>} /> 
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Routese
