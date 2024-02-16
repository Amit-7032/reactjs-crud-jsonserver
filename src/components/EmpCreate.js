import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmpCreate = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [active, setActive] = useState(true);
  const [validationFlag, setValidationFlag] = useState(false);

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const empData = { name, email, phone, active };

    fetch("http://localhost:8000/employee", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empData),
    })
      .then((res) => {
        toast.success("Employee data added successfully", {
          position: "top-right",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Getting some error, please try again!", {
          position: "top-right",
        });
      });
  };

  return (
    <>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleFormSubmit}>
            <div className="card" style={{ paddingTop: "20px" }}>
              <dir className="card-body" style={{ textAlign: "left" }}>
                <div
                  className="row"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        type="number"
                        className="form-control"
                        value={id}
                        disabled="disabled"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onMouseDown={(e) => setValidationFlag(true)}
                      />
                      {validationFlag && name.length === 0 && (
                        <span className="text-danger">
                          Name should not be empty
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onMouseDown={(e) => setValidationFlag(true)}
                      />
                      {validationFlag && email.length === 0 && (
                        <span className="text-danger">
                          Email must be required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="number"
                        className="form-control"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onMouseDown={(e) => setValidationFlag(true)}
                      />
                      {validationFlag && phone.length === 0 && (
                        <span className="text-danger">
                          Phone must be required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-checkbox">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value={active}
                        onChange={(e) => setActive(e.target.checked)}
                      />
                      <label
                        className="form-check-label"
                        style={{ marginLeft: "5px" }}
                      >
                        Is Active
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </dir>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmpCreate;
