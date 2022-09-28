import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header flex items-center justify-center gap-x-5 text-white text-lg font-medium py-6">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-primary" : "hover:text-slate-400"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          isActive ? "text-primary" : "hover:text-slate-400"
        }
      >
        Movies
      </NavLink>
    </header>
  );
};

export default Header;
