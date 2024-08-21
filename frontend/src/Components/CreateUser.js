import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const regForMobile = RegExp(/^[6-9]\d{9}$/);
const regForEmail = RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/);
const regForName = /^[a-zA-Z ]*$/;
export default function CreateUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    client: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    client: "",
    description: "",
  });
  const [clients, setClients] = useState([]);
  const updateData = (e) => {
    let { name, value } = e.target;
    setUserData({
      ...userData,
      [e.target.name]: e.target.value[0] === " " ? "" : e.target.value,
    });
    switch (name) {
      case "phoneNumber":
        setErrors({
          ...errors,
          phoneNumber: regForMobile.test(value)
            ? ""
            : " Enter  valid Phone number",
        });
        break;

      case "name":
        setErrors({
          ...errors,
          name:
            value.length === 0 || !regForName.test(value)
              ? "Enter valid Name "
              : "",
        });
        break;

      case "email":
        setErrors({
          ...errors,
          email: regForEmail.test(value) ? "" : "Enter valid email",
        });

        break;
      case "client":
        setErrors({
          ...errors,
          client: value.length === 0 ? "Select a Client " : "",
        });

        break;
      case "description":
        setErrors({
          ...errors,
          description: value.length === 0 ? "Enter valid Description " : "",
        });
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    axios.get("http://localhost:4000/client/getAllClient").then((res) => {
      if (res.data.success) {
        setClients(res.data.clients);
      }
    });
  }, []);
  const createUser = () => {
    const newErrorsState = { ...errors };
    let formIsValid = true;
    if (userData.name.length === 0) {
      formIsValid = false;
      newErrorsState.name = "Enter valid Name";
    } else {
      newErrorsState.name = "";
    }
    if (userData.phoneNumber.length === 0) {
      formIsValid = false;
      newErrorsState.phoneNumber = "Enter a valid Phone number";
    } else {
      newErrorsState.phoneNumber = "";
    }
    if (userData.client.length === 0) {
      formIsValid = false;
      newErrorsState.client = "Select a Client";
    } else {
      newErrorsState.client = "";
    }
    if (userData.email.length === 0) {
      formIsValid = false;
      newErrorsState.email = "Enter valid email";
    } else {
      newErrorsState.email = "";
    }
    if (userData.description.length === 0) {
      formIsValid = false;
      newErrorsState.description = "Enter valid description";
    } else {
      newErrorsState.description = "";
    }
    setErrors(newErrorsState);
    if (!formIsValid) {
      return;
    }
    if (
      errors.name ||
      errors.email ||
      errors.phoneNumber ||
      errors.client ||
      errors.description
    ) {
    } else {
      axios.post("http://localhost:4000/user/create", userData).then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/users");
          setUserData("");
        } else {
          toast.error(res.data.message);
        }
      });
    }
  };
  const updateUser = () => {
    const newErrorsState = { ...errors };
    let formIsValid = true;
    if (userData.name.length === 0) {
      formIsValid = false;
      newErrorsState.name = "Enter valid Name";
    } else {
      newErrorsState.name = "";
    }
    if (userData.phoneNumber.length === 0) {
      formIsValid = false;
      newErrorsState.phoneNumber = "Enter a valid Phone number";
    } else {
      newErrorsState.phoneNumber = "";
    }
    if (userData.client.length === 0) {
      formIsValid = false;
      newErrorsState.client = "Select a Client";
    } else {
      newErrorsState.client = "";
    }
    if (userData.email.length === 0) {
      formIsValid = false;
      newErrorsState.email = "Enter valid email";
    } else {
      newErrorsState.email = "";
    }
    if (userData.description.length === 0) {
      formIsValid = false;
      newErrorsState.description = "Enter valid description";
    } else {
      newErrorsState.description = "";
    }
    setErrors(newErrorsState);
    if (!formIsValid) {
      return;
    }
    if (
      errors.name ||
      errors.email ||
      errors.phoneNumber ||
      errors.client ||
      errors.description
    ) {
    } else {
    axios
      .put(`http://localhost:4000/user/updateUser/${id}`, userData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/users");
          setUserData("");
        } else {
          toast.error(res.data.message);
        }
      });
    }
  };
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/user/getSingleUser/${id}`)
        .then((res) => {
          if (res.data.success) {
            setUserData(res.data.user);
          }
        });
    }
  }, [id]);
  return (
    <div className="container-fluid">
      <div className="row border rounded pb-3 bg-white">
        {id ? (
          <h5 className="mt-3 mb-4">Update User</h5>
        ) : (
          <h5 className="mt-3 mb-4">Create User</h5>
        )}
        <div className="col-6 mb-2">
          <label htmlFor="" className="form-label text-secondary">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={updateData}
            value={userData.name}
          />
          <small className="text-danger">{errors.name}</small>
        </div>
        <div className="col-6 mb-2">
          <label htmlFor="" className="form-label text-secondary">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            name="email"
            onChange={updateData}
            value={userData.email}
          />
          <small className="text-danger">{errors.email}</small>
        </div>
        <div className="col-6 mb-2">
          <label htmlFor="" className="form-label text-secondary">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            name="phoneNumber"
            onChange={updateData}
            value={userData.phoneNumber}
            maxLength={10}
          />
          <small className="text-danger">{errors.phoneNumber}</small>
        </div>
        <div className="col-6 mb-2">
          <label htmlFor="" className="form-label mb-1">
            Client Name
          </label>
          <select
            className="form-select"
            name="client"
            onChange={updateData}
            value={userData.client}
          >
            <option value="" hidden>
              Select Client
            </option>
            {clients &&
              clients.map((cl) => (
                <option key={cl._id} value={cl._id}>
                  {cl.name}
                </option>
              ))}
          </select>
          <small className="text-danger">{errors.client}</small>
        </div>

        <div className="col-12">
          <label htmlFor="" className="form-label text-secondary">
            Description
          </label>
          <textarea
            className="form-control"
            rows="3"
            name="description"
            onChange={updateData}
            value={userData.description}
          ></textarea>
          <small className="text-danger">{errors.description}</small>
        </div>
        <div className="col-12 mt-3 d-flex justify-content-end">
          <button
            className="btn btn-outline-danger py-1"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          {id ? (
            <button
              className="btn btn-outline-primary py-1 ms-2"
              onClick={updateUser}
            >
              Update
            </button>
          ) : (
            <button
              className="btn btn-outline-primary py-1 ms-2"
              onClick={createUser}
            >
              Create
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
