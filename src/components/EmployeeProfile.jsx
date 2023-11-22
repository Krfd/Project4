import React, { useEffect } from "react";
import { useState } from "react";
import app from "./firebaseConfig";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import "../App.css";

function EmployeeProfile() {
    const [profile, setProfile] = useState([]);

    const [file, setFile] = useState("");

    useEffect(() => {
        try {
            const db = getFirestore(app);

            onSnapshot(collection(db, "employees"), (snapshot) => {
                const newEmployee = [];

                snapshot.forEach((employee) => {
                    const tempEmployee = employee.data();
                    tempEmployee["employee_id"] = "ID" + employee.id;
                    newEmployee.push(tempEmployee);
                });
                setProfile(newEmployee);
            });
        } catch (e) {
            alert("Couldn't fetch data from the database");
        }
    }, []);

    return (
        <>
            <div className="container d-block d-md-flex gap-3 gap-md-5 flex-wrap mx-auto my-5 justify-content-center">
                {profile.map((profile) => {
                    return (
                        <>
                            <button
                                className="btn shadow card p-5 col-12 col-md-4 employeeCard my-3 my-md-0 flex-shrink-1"
                                type="button"
                                data-bs-toggle="modal"
                                key={profile.employee_id}
                                data-bs-target={`#${profile.employee_id}`}
                            >
                                <img
                                    src={
                                        file
                                            ? URL.createObjectURL(file)
                                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtBrmkPtZq6l8EwOiFFg40voD5dUK1gKJZSEL_SQPLSJW9tss&s"
                                    }
                                    alt=""
                                    className="rounded-circle mb-3 shadow d-block mx-auto avatar"
                                />
                                <h1 className="fw-bold">
                                    {profile.firstname} {profile.lastname}{" "}
                                    {profile.middlename}
                                </h1>
                            </button>
                            <div
                                className="modal fade"
                                id={profile.employee_id}
                            >
                                <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fw-bold">
                                                Employee
                                            </h1>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                            ></button>
                                        </div>
                                        <div className="modal-body p-5">
                                            <div className="d-block d-lg-flex justify-content-center">
                                                <img
                                                    src={
                                                        file
                                                            ? URL.createObjectURL(
                                                                  file
                                                              )
                                                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtBrmkPtZq6l8EwOiFFg40voD5dUK1gKJZSEL_SQPLSJW9tss&s"
                                                    }
                                                    alt=""
                                                    className="rounded-circle shadow d-block mx-auto mx-md-0 mb-3 mb-lg-0"
                                                />
                                                <h1 className="fw-bold card-title text-center employee-avatar text-md-start ms-md-3">
                                                    {profile.firstname}{" "}
                                                    {profile.lastname}{" "}
                                                    {profile.middlename}
                                                </h1>
                                            </div>
                                            <div className="d-block d-lg-flex mt-5">
                                                <div className="col">
                                                    <h2 className="fw-bold">
                                                        Employee
                                                    </h2>
                                                    <p>
                                                        Email: {profile.email}
                                                    </p>
                                                    <p>
                                                        Address:{" "}
                                                        {profile.address}
                                                    </p>
                                                    <p>
                                                        Contact: {profile.phone}
                                                    </p>
                                                    <p>
                                                        Degree: {profile.degree}
                                                    </p>
                                                    <p>
                                                        Birthday:{" "}
                                                        {profile.birthday}
                                                    </p>
                                                    <p>Sex: {profile.sex}</p>
                                                    <p>Age: {profile.age}</p>
                                                </div>
                                                <div className="col">
                                                    <h2 className="fw-bold">
                                                        Employment
                                                    </h2>
                                                    <p>
                                                        Position:{" "}
                                                        {profile.position}
                                                    </p>
                                                    <p>
                                                        Salary: {profile.salary}
                                                    </p>
                                                    <h2 className="fw-bold mt-3">
                                                        Insurance
                                                    </h2>
                                                    <p>
                                                        SSS:{" "}
                                                        {profile.sss == "SSS"
                                                            ? "Member"
                                                            : "No Membership"}
                                                    </p>
                                                    <p>
                                                        Pag-IBIG:{" "}
                                                        {profile.pagibig ==
                                                        "Pag-IBIG"
                                                            ? "Member"
                                                            : "No Membership"}
                                                    </p>
                                                    <p>
                                                        PhilHealth:{" "}
                                                        {profile.philhealth ==
                                                        "PhilHealth"
                                                            ? "Member"
                                                            : "No Membership"}
                                                    </p>
                                                </div>
                                                <div className="col">
                                                    <h2 className="fw-bold">
                                                        Parents/Guardian
                                                    </h2>
                                                    <h4 className="fw-bold mt-3">
                                                        Father
                                                    </h4>
                                                    <p>
                                                        First Name:{" "}
                                                        {profile.dadfirstname}
                                                    </p>
                                                    <p>
                                                        Last Name:{" "}
                                                        {profile.dadlastname}
                                                    </p>
                                                    <p>
                                                        Middle Name:{" "}
                                                        {profile.dadmiddlename}
                                                    </p>
                                                    <p>
                                                        Contact:{" "}
                                                        {profile.dadphone ==
                                                            "" ||
                                                        profile.dadphone ==
                                                            null ||
                                                        profile.dadphone ==
                                                            "N/A"
                                                            ? "N/A"
                                                            : profile.dadphone}
                                                    </p>
                                                    <h4 className="fw-bold">
                                                        Mother
                                                    </h4>
                                                    <p>
                                                        First Name:{" "}
                                                        {profile.momfirstname}
                                                    </p>
                                                    <p>
                                                        Last Name:{" "}
                                                        {profile.momlastname}
                                                    </p>
                                                    <p>
                                                        Middle Name:{" "}
                                                        {profile.mommiddlename}
                                                    </p>
                                                    <p>
                                                        Contact:{" "}
                                                        {profile.momphone ==
                                                            "" ||
                                                        profile.momphone ==
                                                            null ||
                                                        profile.momphone ==
                                                            "N/A"
                                                            ? "N/A"
                                                            : profile.momphone}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
        </>
    );
}

export default EmployeeProfile;
