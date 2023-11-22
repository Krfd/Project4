import React, { useEffect, useState } from "react";
import app from "./firebaseConfig";
// import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import "../App.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import "sweetalert2/dist/sweetalert2.js";

function EmployeeCard({
    id,
    lastname,
    firstname,
    middlename,
    email,
    address,
    phone,
    position,
    salary,
    degree,
    birthday,
    sex,
    age,
    sss,
    pagibig,
    philhealth,
    dadfirstname,
    dadlastname,
    dadmiddlename,
    dadphone,
    momfirstname,
    momlastname,
    mommiddlename,
    momphone,
}) {
    const [employeeCard, setEmployeeCard] = useState({
        id: id,
        lastname: lastname,
        firstname: firstname,
        middlename: middlename,
        email: email,
        address: address,
        phone: phone,
        position: position,
        salary: salary,
        degree: degree,
        birthday: birthday,
        sex: sex,
        age: age,
        sss: sss,
        pagibig: pagibig,
        philhealth: philhealth,
        dadfirstname: dadfirstname,
        dadlastname: dadlastname,
        dadmiddlename: dadmiddlename,
        dadphone: dadphone,
        momfirstname: momfirstname,
        momlastname: momlastname,
        mommiddlename: mommiddlename,
        momphone: momphone,
    });

    return (
        <>
            <span
                className="btn btn-primary btn-sm"
                type="button"
                data-bs-toggle="modal"
                // data-bs-target={`#${id}`}
                // data-bs-target="#exampleModal"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-lines-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                </svg>
            </span>
            <div className="modal fade" id={employeeCard.id}>
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fw-bold">Employee</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="container p-5">
                                <h1 className="fw-bold display-1">
                                    {employeeCard.firstname}{" "}
                                    {employeeCard.lastname}{" "}
                                    {employeeCard.middlename}
                                </h1>
                                <div className="d-block d-md-flex mx-auto my-3 my-md-5">
                                    <div className="col">
                                        <h2 className="fw-bold">Employee</h2>
                                        <p>Email: {employeeCard.email}</p>
                                        <p>Address: {employeeCard.address}</p>
                                        <p>Contact: {employeeCard.phone}</p>
                                        <p>Degree: {employeeCard.degree}</p>
                                        <p>Birthday: {employeeCard.birthday}</p>
                                        <p>Sex: {employeeCard.sex}</p>
                                        <p>Age: {employeeCard.age}</p>
                                    </div>
                                    <div className="col">
                                        <h2 className="fw-bold">Employment</h2>
                                        <p>Position: {employeeCard.position}</p>
                                        <p>Salary: {employeeCard.salary}</p>
                                        <h2 className="fw-bold mt-5">
                                            Insurance
                                        </h2>
                                        <p>
                                            SSS:{" "}
                                            {employeeCard.sss == true
                                                ? "✅"
                                                : "❌"}
                                        </p>
                                        <p>
                                            Pag-IBIG:{" "}
                                            {employeeCard.pagibig == true
                                                ? "✅"
                                                : "❌"}
                                        </p>
                                        <p>
                                            PhilHealth:{" "}
                                            {employeeCard.philhealth == true
                                                ? "✅"
                                                : "❌"}
                                        </p>
                                    </div>
                                    <div className="col">
                                        <h2 className="fw-bold">
                                            Parents/Guardian
                                        </h2>
                                        <h4 className="fw-bold">Father</h4>
                                        <p>
                                            First Name:{" "}
                                            {employeeCard.dadfirstname}
                                        </p>
                                        <p>
                                            Last Name:{" "}
                                            {employeeCard.dadlastname}
                                        </p>
                                        <p>
                                            Middle Name:{" "}
                                            {employeeCard.dadmiddlename}
                                        </p>
                                        <p>Contact: {employeeCard.dadphone}</p>

                                        <h4 className="fw-bold mt-3">Mother</h4>
                                        <p>
                                            First Name:{" "}
                                            {employeeCard.momfirstname}
                                        </p>
                                        <p>
                                            Last Name:{" "}
                                            {employeeCard.momlastname}
                                        </p>
                                        <p>
                                            Middle Name:{" "}
                                            {employeeCard.mommiddlename}
                                        </p>
                                        <p>Contact: {employeeCard.momphone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EmployeeCard;
