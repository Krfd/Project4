import { useState, useEffect } from "react";
import app from "./firebaseConfig";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import "../App.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function EmployeeProfile() {
    const [profile, setProfile] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [userProperties, setUserProperties] = useState({});

    const [file, setFile] = useState("");

    useEffect(() => {
        const auth = getAuth(app);
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
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setAuthenticated(true);
                setUserProperties(user);
            }
        });
    }, []);

    if (authenticated) {
        return (
            <>
                <div className="container row gap-3 gap-md-4 gap-lg-5 my-5 mx-auto justify-content-center">
                    {profile.map((profile) => {
                        const date = new Date(profile.birthday);
                        const formatDate = date.toDateString();
                        return (
                            <>
                                <button
                                    className="btn shadow card p-3 p-md-5 col-12 col-md-4 col-lg-3 employeeCard"
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
                                        className="rounded-circle mb-3 shadow avatar d-block mx-auto mt-3 mt-md-0"
                                    />
                                    <h1 className="fw-bold d-block mx-auto">
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
                                                <div className="d-block mx-auto d-lg-flex justify-content-lg-start align-items-center">
                                                    <img
                                                        src={
                                                            file
                                                                ? URL.createObjectURL(
                                                                      file
                                                                  )
                                                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtBrmkPtZq6l8EwOiFFg40voD5dUK1gKJZSEL_SQPLSJW9tss&s"
                                                        }
                                                        alt=""
                                                        className="rounded-circle shadow d-block mx-auto mx-lg-0 mb-5 mb-md-3 mb-lg-0"
                                                    />
                                                    <h1 className="fw-bold card-title employee-avatar text-center text-lg-start ms-0 ms-lg-5">
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
                                                            Email:{" "}
                                                            {profile.email}
                                                        </p>
                                                        <p>
                                                            Address:{" "}
                                                            {profile.address}
                                                        </p>
                                                        <p>
                                                            Contact:{" "}
                                                            {profile.phone}
                                                        </p>
                                                        <p>
                                                            Degree:{" "}
                                                            {profile.degree}
                                                        </p>
                                                        <p>
                                                            Birthday:{" "}
                                                            {formatDate}
                                                        </p>
                                                        <p>
                                                            Sex: {profile.sex}
                                                        </p>
                                                        <p>
                                                            Age: {profile.age}
                                                        </p>
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
                                                            Salary:{" "}
                                                            {profile.salary}
                                                        </p>
                                                        <h2 className="fw-bold mt-3">
                                                            Insurance
                                                        </h2>
                                                        <p>
                                                            SSS:{" "}
                                                            {profile.sss ==
                                                            "SSS"
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
                                                            {
                                                                profile.dadfirstname
                                                            }
                                                        </p>
                                                        <p>
                                                            Last Name:{" "}
                                                            {
                                                                profile.dadlastname
                                                            }
                                                        </p>
                                                        <p>
                                                            Middle Name:{" "}
                                                            {
                                                                profile.dadmiddlename
                                                            }
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
                                                            {
                                                                profile.momfirstname
                                                            }
                                                        </p>
                                                        <p>
                                                            Last Name:{" "}
                                                            {
                                                                profile.momlastname
                                                            }
                                                        </p>
                                                        <p>
                                                            Middle Name:{" "}
                                                            {
                                                                profile.mommiddlename
                                                            }
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
    } else {
        return (
            <>
                <div className="container mt-5">
                    <div className="d-block">
                        <h1 className="text-start display-1 fw-bold">
                            Please login to access users records...
                        </h1>
                    </div>
                </div>
                ;
            </>
        );
    }
}

export default EmployeeProfile;
