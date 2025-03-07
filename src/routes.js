import React from "react";
import { Route, BrowserRouter, Routes, NavLink } from "react-router-dom";
import Home from "./BichoDiario/Home";
import Pokedex from "./Pokedex/Pokedex";
import Collection from "./Pokedex/Collection";
import styles from './styles/Navbar.module.css';

const MyRoutes = () => (
  <BrowserRouter>
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.navLink}>Home</NavLink>
        <NavLink to="/pokedex" className={styles.navLink}>Pokedex</NavLink>
        <NavLink to="/collection" className={styles.navLink}>Collection</NavLink>
      </div>
    </nav>
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Pokedex />} path="/pokedex" />
      <Route element={<Collection />} path="/collection" />
    </Routes>
  </BrowserRouter>
);

export default MyRoutes;
