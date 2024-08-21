import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const updateData = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);
  const submitData = () => {
    axios
      .post("http://localhost:4000/admin/login", adminData)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("authToken", res.data.token);
          axios
            .get("http://localhost:4000/admin/protected-route", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            })
            .then((response) => {
              console.log(response.data);
              window.location.href = "/";
            })
            .catch((error) => {
              console.error(error.response.data);
            });
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        toast.error("Login failed: " + error.message);
      });
  };

  return (
    <div className="container">
      <div className="row d-flex align-items-center justify-content-center vh-100">
        <div className="col-lg-6 col-md-10 col-sm-11 col-11 border rounded py-3">
          <h5 className="text-center">Login Yourself!</h5>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email..."
            className="input-box"
            value={adminData.email}
            onChange={updateData}
          />
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your password..."
            className="input-box"
            value={adminData.password}
            onChange={updateData}
          />
          <button className="btn-submit" onClick={submitData}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
