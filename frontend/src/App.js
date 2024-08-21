import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import CreateClient from "./Components/CreateClient";
import AllClients from "./Components/AllClients";
import AllUser from "./Components/AllUser";
import CreateUser from "./Components/CreateUser";
import ProtectedRoute from "./Components/ProtectedRoute";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<AllClients />} />
            <Route path="/clients" element={<AllClients />} />
            <Route path="/clients/create" element={<CreateClient />} />
            <Route path="/clients/create/:id" element={<CreateClient />} />
            <Route path="/users" element={<AllUser />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/create/:id" element={<CreateUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
