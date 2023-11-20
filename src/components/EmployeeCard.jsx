import React, { useEffect, useState } from "react";
import app from "./firebaseConfig";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import "../App.css";

function EmployeeCard() {
    const [employeeCard, setEmployeeCard] = useState([]);
    const [profile, setProfile] = useState("");

    useEffect(() => {
        try {
            const db = getFirestore(app);

            onSnapshot(collection(db, "employees"), (snapshot) => {
                const newEmployeeCard = [];

                snapshot.forEach((employeeCard) => {
                    const tempCard = employeeCard.data();
                    tempCard["employee_id"] = employeeCard.id;
                    newEmployeeCard.push(tempCard);
                });
                setEmployeeCard(newEmployeeCard);
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    const updateEmployee = () => {};

    return (
        <>
            <div className="d-block gap-4 d-md-flex flex-wrap justify-content-center my-5">
                {employeeCard.map((employee) => {
                    return (
                        <>
                            <button
                                type="button"
                                className="btn card shadow-sm col-12 col-md-3 py-3 employeeCard"
                                data-bs-toggle="modal"
                                data-bs-target={employee.employee_id}
                            >
                                <div
                                    // className="card shadow-sm col-12 col-md-3 py-3 employeeCard"
                                    key={employee.employee_id}
                                    id={employee.employee_id}
                                    className="text-start"
                                >
                                    <div className="card-img-top">
                                        <img
                                            src={
                                                profile
                                                    ? URL.createObjectURL(
                                                          profile
                                                      )
                                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwKY1GAB4HLMQq_YLyMCJqRie-dWxdAcZuB3mSg_QuV1Wzz0A&s"
                                            }
                                            alt="Profile"
                                            className="avatar img-fluid rounded-circle d-block mx-auto object-fit-cover w-50 mt-3"
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title fw-bold text-center">
                                            {employee.firstname}{" "}
                                            {employee.lastname}
                                        </h1>
                                    </div>
                                </div>
                            </button>
                        </>
                    );
                })}
            </div>
        </>
    );
}

export default EmployeeCard;
