import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmpListing = () => {
  const [empData, setEmpData] = useState(null);
  const navigate = useNavigate();

  const handelDetail = (id) => {
    navigate("/employee/detail/" + id);
  };

  const handelEdit = (id) => {
    navigate(`/employee/edit/${id}`);
  };
  const handelRemove = (id) => {
    if (window.confirm("Do you want to remove")) {
      fetch(`http://localhost:8000/employee/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            setEmpData(empData.filter((item) => item.id !== id));
            toast.success("Removed Successfully", {
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
        });
    }
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

      // getAllCartItems();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //  const getAllCartItems = async () => {
  //   try {
  //     const res = await fetch('http://localhost:8000/employee');
  //     const data = await res.json();
  //     return setEmpData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <>
      <div className="container">
        <div className="card" style={{ paddingTop: "20px" }}>
          {/* <div className="card-title">
            <h2>Employee Listing Page</h2>
          </div> */}
          <div
            className="card-body"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div
              className="create-btn"
              style={{ display: "flex", alignItems: "start" }}
            >
              <Link className="btn btn-success" to="/employee/create">
                Add New (+)
              </Link>
            </div>
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Phone</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {empData &&
                  empData.map((item) => (
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
    </>
  );
};

export default EmpListing;
