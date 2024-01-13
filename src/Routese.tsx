import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home/Home'
import Search from './Pages/Search/Search'
import Movie from './Pages/Movies/Movie'

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
