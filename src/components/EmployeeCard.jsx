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
    const [employeeCard, setEmployeeCard] = useState([]);

    // const [profile, setProfile] = useState("");

    return (
        <>
            <span
                className="btn btn-primary btn-sm"
                type="button"
                data-bs-toggle="modal"
                data-bs-target={`#${id}`}
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
            <div className="modal fade" id={id}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title">
                                {firstname} {lastname}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Mollitia veritatis aperiam
                                magni quis ipsum, ipsam est voluptatibus itaque
                                dolore reprehenderit.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EmployeeCard;
