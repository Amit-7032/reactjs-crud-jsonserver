import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmpDetail = () => {
  const { empId } = useParams();
  const [empData, setEmpData] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/employee/" + empId)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setEmpData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="card row">
          <div className="card-body" style={{ textAlign: "left" }}>
            {empData && (
              <div>
                <h5>Employee ID: {empData.id}</h5>
                <h5>Employee Name: {empData.name}</h5>
                <br />
                <h2>Contact Details</h2>
                <h5>Email Id: {empData.email}</h5>
                <h5>Phone Number: {empData.phone}</h5>
                <Link to="/" className="btn btn-danger">
                  Back to Listing
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpDetail;
