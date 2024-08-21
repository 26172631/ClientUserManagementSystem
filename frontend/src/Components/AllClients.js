import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AllClients() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);

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
      name: "Contact Info",
      selector: (row) => row.contactInfo,
    },
    {
      name: "Industry",
      selector: (row) => row.industry,
    },
    {
      name: "Description",
      selector: (row) =>
        row.detail.split(" ").slice(0, 15).join(" ") +
        (row.detail.split(" ").length > 15 ? "..." : ""),
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="d-flex align-items-center">
          <Link to={"/clients/create/" + row._id}>
            <FaEdit className="me-2" size={15} />
          </Link>
          <MdDelete
            className=" text-danger"
            size={18}
            onClick={() => deleteClient(row._id)}
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
  const deleteClient = (id) => {
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
          .delete(`http://localhost:4000/client/deleteClient/${id}`)
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                title: "Deleted!",
                text: "Client data has been deleted.",
                icon: "success",
              });
              axios
                .get("http://localhost:4000/client/getAllClient")
                .then((res) => {
                  if (res.data.success) {
                    setClients(res.data.clients);
                  }
                });
            }
          });
      }
    });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div style={{ marginBottom: "15px", textAlign: "right" }}>
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
              onClick={() => navigate("/clients/create")}
            >
              Create Client
            </button>
          </div>
          <DataTable
            title="Client List"
            columns={columns}
            data={clients}
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
