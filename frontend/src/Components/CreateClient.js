import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const regForMobile = RegExp(/^[6-9]\d{9}$/);
const regForEmail = RegExp(
  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
);
const regForName = /^[a-zA-Z ]*$/;
export default function CreateClient() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    industry: "",
    contactInfo: "",
    detail: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    industry: "",
    contactInfo: "",
    detail: "",
  });
  const updateData = (e) => {
    let { name, value } = e.target;
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value[0] === " " ? "" : e.target.value,
    });
    switch (name) {
      case "contactInfo":
        setErrors({
          ...errors,
          contactInfo: regForMobile.test(value)
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
      case "industry":
        setErrors({
          ...errors,
          industry: value.length === 0 ? "Enter valid Industry " : "",
        });

        break;
      case "detail":
        setErrors({
          ...errors,
          detail: value.length === 0 ? "Enter valid Detail " : "",
        });
        break;
      default:
        break;
    }
  };
  const createClient = () => {
    const newErrorsState = { ...errors };
    let formIsValid = true;
    if (clientData.name.length === 0) {
      formIsValid = false;
      newErrorsState.name = "Enter valid Name";
    } else {
      newErrorsState.name = "";
    }
    if (clientData.contactInfo.length === 0) {
      formIsValid = false;
      newErrorsState.contactInfo = "Enter a valid Phone number";
    } else {
      newErrorsState.contactInfo = "";
    }
    if (clientData.industry.length === 0) {
      formIsValid = false;
      newErrorsState.industry = "Enter valid Industry";
    } else {
      newErrorsState.industry = "";
    }
    if (clientData.email.length === 0) {
      formIsValid = false;
      newErrorsState.email = "Enter valid email";
    } else {
      newErrorsState.email = "";
    }
    if (clientData.detail.length === 0) {
      formIsValid = false;
      newErrorsState.detail = "Enter valid Detail";
    } else {
      newErrorsState.detail = "";
    }
    setErrors(newErrorsState);
    if (!formIsValid) {
      return;
    }
    if (
      errors.name ||
      errors.email ||
      errors.contactInfo ||
      errors.industry ||
      errors.detail
    ) {
    } else {
      axios
        .post("http://localhost:4000/client/create", clientData)
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            navigate("/");
            setClientData("");
          } else {
            toast.error(res.data.message);
          }
        });
    }
  };
  const updateClient = () => {
    const newErrorsState = { ...errors };
    let formIsValid = true;
    if (clientData.name.length === 0) {
      formIsValid = false;
      newErrorsState.name = "Enter valid Name";
    } else {
      newErrorsState.name = "";
    }
    if (clientData.contactInfo.length === 0) {
      formIsValid = false;
      newErrorsState.contactInfo = "Enter a valid Phone number";
    } else {
      newErrorsState.contactInfo = "";
    }
    if (clientData.industry.length === 0) {
      formIsValid = false;
      newErrorsState.industry = "Enter valid Industry";
    } else {
      newErrorsState.industry = "";
    }
    if (clientData.email.length === 0) {
      formIsValid = false;
      newErrorsState.email = "Enter valid email";
    } else {
      newErrorsState.email = "";
    }
    if (clientData.detail.length === 0) {
      formIsValid = false;
      newErrorsState.detail = "Enter valid Detail";
    } else {
      newErrorsState.detail = "";
    }
    setErrors(newErrorsState);
    if (!formIsValid) {
      return;
    }
    if (
      errors.name ||
      errors.email ||
      errors.contactInfo ||
      errors.industry ||
      errors.detail
    ) {
    } else {
      axios
        .put(`http://localhost:4000/client/updateClient/${id}`, clientData)
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            navigate("/");
            setClientData("");
          } else {
            toast.error(res.data.message);
          }
        });
    }
  };
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/client/getSingleClient/${id}`)
        .then((res) => {
          if (res.data.success) {
            setClientData(res.data.client);
          }
        });
    }
  }, [id]);
  return (
    <div className="container-fluid">
      <div className="row border rounded pb-3 bg-white">
        {id ? (
          <h5 className="mt-3 mb-4">Update Client</h5>
        ) : (
          <h5 className="mt-3 mb-4">Create Client</h5>
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
            value={clientData.name}
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
            value={clientData.email}
          />
          <small className="text-danger">{errors.email}</small>
        </div>
        <div className="col-6 mb-2">
          <label htmlFor="" className="form-label text-secondary">
            Industry
          </label>
          <input
            type="text"
            className="form-control"
            name="industry"
            onChange={updateData}
            value={clientData.industry}
          />
          <small className="text-danger">{errors.industry}</small>
        </div>
        <div className="col-6 mb-2">
          <label htmlFor="" className="form-label text-secondary">
            Contact Info
          </label>
          <input
            type="text"
            className="form-control"
            name="contactInfo"
            maxLength={10}
            onChange={updateData}
            value={clientData.contactInfo}
          />
          <small className="text-danger">{errors.contactInfo}</small>
        </div>

        <div className="col-12 mb-2">
          <label htmlFor="" className="form-label text-secondary">
            Description
          </label>
          <textarea
            className="form-control"
            rows="3"
            name="detail"
            onChange={updateData}
            value={clientData.detail}
          ></textarea>
          <small className="text-danger">{errors.detail}</small>
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
              onClick={updateClient}
            >
              Update
            </button>
          ) : (
            <button
              className="btn btn-outline-primary py-1 ms-2"
              onClick={createClient}
            >
              Create
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
