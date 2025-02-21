import React from "react";
import { Route, BrowserRouter, Routes, Link } from "react-router-dom";
import Home from "./BichoDiario/Home";
import Pokedex from "./Pokedex/Pokedex";
import Collection from "./Pokedex/Collection";

const MyRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Pokedex />} path="/pokedex" />
      <Route element={<Collection />} path="/collection" />
    </Routes>
    <footer>
      <center>
        <Link to="/">Home</Link> - <Link to="/pokedex">Pokedex</Link> - <Link to="/collection">Collection</Link>
      </center>
    </footer>
  </BrowserRouter>
);

export default MyRoutes;
