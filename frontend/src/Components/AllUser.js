import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AllUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone No.",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "Client Name",
      selector: (row) => row.client.name,
    },
    {
      name: "Description",
      selector: (row) =>
        row.description.split(" ").slice(0, 15).join(" ") +
        (row.description.split(" ").length > 15 ? "..." : ""),
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="d-flex align-items-center">
          <Link to={"/users/create/" + row._id}>
            <FaEdit className="me-2" size={15} />
          </Link>
          <MdDelete
            className=" text-danger"
            size={18}
            onClick={() => deleteUser(row._id)}
          />
        </div>
      ),
    },
  ];
  useEffect(() => {
    axios.get("http://localhost:4000/client/getAllClient").then((res) => {
      if (res.data.success) {
        setClients(res.data.clients);
      }
    });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/getAllUser?clientId=${clientId}`)
      .then((res) => {
        if (res.data.success) {
          setUsers(res.data.users);
        }
      });
  }, [clientId]);
  const deleteUser = (id) => {
    Swal.fire({
      html: '<h6 class="data">Are you sure you want to delete?</h6>',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      reverseButtons: true,
      customClass: {
        actions: "my-actions",
        confirmButton: "confirm-button",
        cancelButton: "cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:4000/user/deleteUser/${id}`)
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                title: "Deleted!",
                text: "User data has been deleted.",
                icon: "success",
              });
              axios.get("http://localhost:4000/user/getAllUser").then((res) => {
                if (res.data.success) {
                  setUsers(res.data.users);
                }
              });
            }
          });
      }
    });
  };
  console.log(clientId);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="d-flex justify-content-end mb-2">
            <select
              className="form-select w-25 me-2"
              name="client"
              onChange={(e) => setClientId(e.target.value)}
              value={clientId}
            >
              <option value="">All</option>
              {clients &&
                clients.map((cl) => (
                  <option key={cl._id} value={cl._id}>
                    {cl.name}
                  </option>
                ))}
            </select>
            <button
              style={{
                padding: "5px 8px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onClick={() => navigate("/users/create")}
            >
              Create User
            </button>
          </div>
          <DataTable
            title="User List"
            columns={columns}
            data={users}
            highlightOnHover
            pointerOnHover
            responsive
            striped
          />
        </div>
      </div>
    </div>
  );
}
