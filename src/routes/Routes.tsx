<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import Movie from "../pages/movies/Movie";

function Routese() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:movieId" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routese;
=======
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import Movie from "../pages/movies/Movie";

function Routese() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:movieId" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routese;
>>>>>>> 8d87fee6aa92c1563f17afc29f1af0355222befa
