import React from "react";
import app from "./firebaseConfig";
import { useState, useEffect } from "react";
import {
    getFirestore,
    doc,
    onSnapshot,
    collection,
    deleteDoc,
    addDoc,
} from "firebase/firestore";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import "sweetalert2/dist/sweetalert2.js";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";

function EmployeeList() {
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        try {
            const db = getFirestore(app);

            onSnapshot(collection(db, "employees"), (snapshot) => {
                const newEmployee = [];

                snapshot.forEach((employee) => {
                    const tempEmployee = employee.data();
                    tempEmployee["employee_id"] = employee.id;
                    newEmployee.push(tempEmployee);
                });
                setEmployee(newEmployee);
            });
        } catch (e) {
            alert("Couldn't fetch data from the database");
        }
    }, []);

    const deleteEmployee = (firstname, lastname, employee_id) => {
        const db = getFirestore(app);
        // confirm(`Are you sure you want to delete ${firstname} ${lastname}?`);

        Swal.fire({
            icon: "question",
            title: `Are you sure you want to delete ${firstname} ${lastname}?`,
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDoc(doc(db, "employees", employee_id));
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: `${firstname} ${lastname} has been deleted.`,
                });
            } else if (result.isDenied) {
                Swal.fire({
                    icon: "success",
                    title: "Cancelled",
                    text: "Deleting records has been cancelled.",
                });
            }
        });
    };

    return (
        <>
            <div className="container card shadow rounded-3 p-5 my-5">
                <div className="d-block d-md-flex justify-content-between align-items-baseline">
                    <h1 className="fw-bold text-center text-md-start">
                        📃 Employees
                    </h1>
                    <div>
                        <AddEmployee />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover table-sm mt-3">
                        <thead>
                            <tr>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Address</th>
                                <th>Position</th>
                                <th>Salary</th>
                                <th>Mobile</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        Currently there are no records
                                    </td>
                                </tr>
                            ) : (
                                employee.map((hiredEmployees) => {
                                    return (
                                        <>
                                            <tr
                                                key={hiredEmployees.employee_id}
                                            >
                                                <td>
                                                    {hiredEmployees.lastname}
                                                </td>
                                                <td>
                                                    {hiredEmployees.firstname}
                                                </td>
                                                <td>
                                                    {hiredEmployees.address}
                                                </td>
                                                <td>
                                                    {hiredEmployees.position}
                                                </td>
                                                <td>{hiredEmployees.salary}</td>
                                                <td>{hiredEmployees.phone}</td>
                                                <td>
                                                    <EditEmployee
                                                        employee_id={
                                                            hiredEmployees.employee_id
                                                        }
                                                        lastname={
                                                            hiredEmployees.lastname
                                                        }
                                                        firstname={
                                                            hiredEmployees.firstname
                                                        }
                                                        middlename={
                                                            hiredEmployees.middlename
                                                        }
                                                        email={
                                                            hiredEmployees.email
                                                        }
                                                        address={
                                                            hiredEmployees.address
                                                        }
                                                        phone={
                                                            hiredEmployees.phone
                                                        }
                                                        position={
                                                            hiredEmployees.position
                                                        }
                                                        salary={
                                                            hiredEmployees.salary
                                                        }
                                                        degree={
                                                            hiredEmployees.degree
                                                        }
                                                        birthday={
                                                            hiredEmployees.birthday
                                                        }
                                                        sex={hiredEmployees.sex}
                                                        age={hiredEmployees.age}
                                                        sss={hiredEmployees.sss}
                                                        pagibig={
                                                            hiredEmployees.pagibig
                                                        }
                                                        philhealth={
                                                            hiredEmployees.philhealth
                                                        }
                                                        dadfirstname={
                                                            hiredEmployees.dadfirstname
                                                        }
                                                        dadlastname={
                                                            hiredEmployees.dadlastname
                                                        }
                                                        dadmiddlename={
                                                            hiredEmployees.dadmiddlename
                                                        }
                                                        dadphone={
                                                            hiredEmployees.dadphone
                                                        }
                                                        momfirstname={
                                                            hiredEmployees.momfirstname
                                                        }
                                                        momlastname={
                                                            hiredEmployees.momlastname
                                                        }
                                                        mommiddlename={
                                                            hiredEmployees.mommiddlename
                                                        }
                                                        momphone={
                                                            hiredEmployees.momphone
                                                        }
                                                    />

                                                    <button
                                                        onClick={() =>
                                                            deleteEmployee(
                                                                hiredEmployees.firstname,
                                                                hiredEmployees.lastname,
                                                                hiredEmployees.employee_id
                                                            )
                                                        }
                                                        className="btn btn-sm btn-danger"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default EmployeeList;
