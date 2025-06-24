import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <hr/>
      <nav className="nav-links">
        <NavLink to="/" activeClassName="active-link">Blogs</NavLink>
        {/* <NavLink to="/manage-blogs" activeClassName="active-link">Manage Blogs</NavLink> */}
        <NavLink to="/descoverycall" activeClassName="active-link">Discovery Call</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
