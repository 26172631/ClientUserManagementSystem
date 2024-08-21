import React from "react";
import "./Dashboard.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const logout = () => {
      localStorage.removeItem('authToken');
      navigate('/login');
  };
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>CMS</h2>
        <nav>
          <ul>
            <li onClick={() => navigate("/")} className={(location.pathname === "/" || location.pathname === "/clients/create" ) ? "bg-gray" : ""}>Clients</li>
            <li onClick={() => navigate("/users")} className={(location.pathname === "/users" || location.pathname === "/users/create" ) ? "bg-gray" : ""}>Users</li>
            <li className="text-bg-danger" onClick={logout}>Logout</li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
