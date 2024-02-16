import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal";

const EmpListing = () => {
  const [empData, setEmpData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState(null);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handelDetail = (id) => {
    navigate("/employee/detail/" + id);
  };

  const handelEdit = (id) => {
    navigate(`/employee/edit/${id}`);
  };
  const handelRemove = (id) => {
    setSelectedEmpId(id);
    setShowModal(true);
  };

  const handleConfirmRemove = () => {
    fetch(`http://localhost:8000/employee/${selectedEmpId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setEmpData(empData.filter((item) => item.id !== selectedEmpId));
          toast.success("Employee data removed successfully", {
            position: "top-right",
          });
        } else {
          throw new Error("Failed to delete");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Getting some error, please try again!", {
          position: "top-right",
        });
      })
      .finally(() => {
        setShowModal(false);
      });
  };

  const handleCancelRemove = () => {
    setShowModal(false);
  };

  useEffect(() => {
    try {
      fetch("http://localhost:8000/employee", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          setEmpData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSort = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  };

  const filteredEmpData = empData
    ? empData.filter((item) =>
        Object.values(item).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  // const sortedEmpData = empData ? [...empData] : [];
  const sortedEmpData = [...filteredEmpData];
  if (sortCriteria) {
    sortedEmpData.sort((a, b) => {
      const aValue = a[sortCriteria];
      const bValue = b[sortCriteria];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  const getArrowClass = (criteria) => {
    if (sortCriteria === criteria) {
      return sortOrder === "asc" ? "fa fa-sort-up" : "fa fa-sort-down";
    }
    return "fa fa-sort";
  };

  return (
    <>
      <div className="container">
        <div className="card" style={{ paddingTop: "20px" }}>
          <div
            className="card-body"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                className="create-btn"
                style={{ display: "flex", alignItems: "start" }}
              >
                <Link className="btn btn-success" to="/employee/create">
                  Add New (+)
                </Link>
              </div>
              <div className="create-btn" style={{ display: "flex" }}>
                <input
                  type="search"
                  className="form-control mr-sm-2"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <table className="table table-bordered">
              <thead
                className="bg-dark text-white"
                style={{ cursor: "pointer" }}
              >
                <tr>
                  <td
                    onClick={() => handleSort("id")}
                    className="bg-dark text-white"
                  >
                    ID{" "}
                    <i className={getArrowClass("id")} aria-hidden="true"></i>
                  </td>
                  <td
                    onClick={() => handleSort("name")}
                    className="bg-dark text-white"
                  >
                    Name{" "}
                    <i className={getArrowClass("name")} aria-hidden="true"></i>
                  </td>
                  <td
                    onClick={() => handleSort("email")}
                    className="bg-dark text-white"
                  >
                    Email{" "}
                    <i className={getArrowClass("email")} aria-hidden="true"></i>
                  </td>
                  <td
                    onClick={() => handleSort("phone")}
                    className="bg-dark text-white"
                  >
                    Phone{" "}
                    <i className={getArrowClass("phone")} aria-hidden="true"></i>
                  </td>
                  <td className="bg-dark text-white">Action</td>
                </tr>
              </thead>
              <tbody>
                {sortedEmpData &&
                  sortedEmpData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        <a
                          className="btn btn-success"
                          onClick={() => {
                            handelEdit(item.id);
                          }}
                        >
                          Edit
                        </a>
                        <a
                          className="btn btn-danger"
                          onClick={() => {
                            handelRemove(item.id);
                          }}
                        >
                          Remove
                        </a>
                        <a
                          className="btn btn-primary"
                          onClick={() => {
                            handelDetail(item.id);
                          }}
                        >
                          Details
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to remove this employee?"
          onConfirm={handleConfirmRemove}
          onCancel={handleCancelRemove}
        />
      )}
    </>
  );
};

export default EmpListing;
