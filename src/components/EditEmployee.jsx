import React from "react";
import { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import "sweetalert2/dist/sweetalert2.js";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import app from "./firebaseConfig";

function EditEmployee({
    employee_id,
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
    const [employeeData, setEmployeeData] = useState({
        id: employee_id,
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

    const updateEmployee = (id, lastname, firstname) => {
        const db = getFirestore(app);

        // Confirm Update
        Swal.fire({
            icon: "question",
            title: `Update ${firstname} ${lastname}?`,
            showDenyButton: true,
            confirmButtonText: "Update",
            denyButtonText: "Cancel",
        }).then((result) => {
            // Confirmed Update
            if (result.isConfirmed) {
                if (
                    employeeData.lastname == "" ||
                    employeeData.firstname == "" ||
                    employeeData.middlename == "" ||
                    employeeData.email == "" ||
                    employeeData.address == "" ||
                    employeeData.position == "" ||
                    employeeData.salary == "" ||
                    employeeData.phone == "" ||
                    employeeData.degree == "" ||
                    employeeData.birthday == "" ||
                    employeeData.sex == "" ||
                    employeeData.age == "" ||
                    employeeData.dadfirstname == "" ||
                    employeeData.dadlastname == "" ||
                    employeeData.dadmiddlename == "" ||
                    employeeData.momfirstname == "" ||
                    employeeData.momlastname == "" ||
                    employeeData.mommiddlename == ""
                ) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Please fill up all fields.",
                    });
                } else {
                    const employeeRef = doc(db, "employees", id);
                    updateDoc(employeeRef, {
                        lastname: employeeData.lastname,
                        firstname: employeeData.firstname,
                        middlename: employeeData.middlename,
                        email: employeeData.email,
                        address: employeeData.address,
                        phone: employeeData.phone,
                        position: employeeData.position,
                        salary: employeeData.salary,
                        degree: employeeData.degree,
                        birthday: employeeData.birthday,
                        sex: employeeData.sex,
                        age: employeeData.age,
                        sss: employeeData.sss,
                        pagibig: employeeData.pagibig,
                        philhealth: employeeData.philhealth,
                        dadfirstname: employeeData.dadfirstname,
                        dadlastname: employeeData.dadlastname,
                        dadmiddlename: employeeData.dadmiddlename,
                        dadphone: employeeData.dadphone,
                        momfirstname: employeeData.momfirstname,
                        momlastname: employeeData.momlastname,
                        mommiddlename: employeeData.mommiddlename,
                        momphone: employeeData.momphone,
                    });
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: `${firstname} ${lastname} has been Updated.`,
                    });
                    setEmployeeData({});
                }
            } else if (result.isDenied) {
                Swal.fire({
                    icon: "success",
                    title: "Cancelled",
                    text: "Updating records has been cancelled.",
                });
            }
        });
    };
    return (
        <>
            <button
                className="btn btn-sm btn-secondary me-1"
                data-bs-toggle="modal"
                data-bs-target={`#${employee_id}`}
            >
                Edit
            </button>
            <div className="modal fade" id={employee_id}>
                <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fw-bold">
                                Update Employee
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="card shadow p-5 m-3">
                                <h4 className="fw-bold">Employee</h4>
                                <div className="d-block d-md-flex flex-wrap gap-3 mt-3">
                                    <div className="col">
                                        <label htmlFor="lastname">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastname"
                                            name="lastname"
                                            className="form-control"
                                            value={employeeData.lastname}
                                            onChange={(e) =>
                                                setEmployeeData({
                                                    ...employeeData,
                                                    lastname: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="col">
                                        <label htmlFor="firstname">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstname"
                                            name="firstname"
                                            className="form-control"
                                            value={employeeData.firstname}
                                            onChange={(e) =>
                                                setEmployeeData({
                                                    ...employeeData,
                                                    firstname: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="middlename">
                                            Middle Name
                                        </label>
                                        <input
                                            type="text"
                                            id="middlename"
                                            name="middlename"
                                            className="form-control"
                                            value={employeeData.middlename}
                                            onChange={(e) =>
                                                setEmployeeData({
                                                    ...employeeData,
                                                    middlename: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            value={employeeData.email}
                                            onChange={(e) =>
                                                setEmployeeData({
                                                    ...employeeData,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="d-block d-md-flex flex-wrap gap-3">
                                    <div className="col col-md-4">
                                        <label htmlFor="address">Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            className="form-control"
                                            value={employeeData.address}
                                            onChange={(e) =>
                                                setEmployeeData({
                                                    ...employeeData,
                                                    address: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="phone">
                                            Contact Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="form-control"
                                            value={employeeData.phone}
                                            onChange={(e) =>
                                                setEmployeeData({
                                                    ...employeeData,
                                                    phone: e.target.value,
                                                })
                                            }
                                            minLength="11"
                                            maxLength="11"
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="position">
                                            Position
                                        </label>
                                        <input
                                            type="text"
                                            id="position"
                                            name="position"
                                            className="form-control"
                                            value={employeeData.position}
                                            onChange={(e) =>
                                                setEmployeeData({
                                                    ...employeeData,
                                                    position: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="salary">Salary</label>
                                        <input
                                            type="tel"
                                            id="salary"
                                            name="salary"
                                            className="form-control"
                                            value={employeeData.salary}
                                            onChange={(e) =>
                                                setEmployeeData({
                                                    ...employeeData,
                                                    salary: e.target.value,
                                                })
                                            }
                                            minLength="11"
                                            maxLength="11"
                                        />
                                    </div>
                                </div>
                                <div className="d-block d-md-flex flex-wrap gap-3 align-items-center">
                                    <div className="col col-md-5">
                                        <label htmlFor="degree">Degree</label>
                                        <select
                                            name="degree"
                                            id="degree"
                                            className="form-select"
                                            value={employeeData.degree}
                                            onChange={(e) =>
                                                setEmployeeData({
                                                    ...employeeData,
                                                    degree: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">
                                                Choose your degree
                                            </option>
                                            <option value="Bachelor of Arts">
                                                Bachelor of Arts
                                            </option>
                                            <option value="Bachelor of Science in Accountancy">
                                                Bachelor of Science in
                                                Accountancy
                                            </option>
                                            <option value="Bachelor of Science in Aeronautics">
                                                Bachelor of Science in
                                                Aeronautics
                                            </option>
                                            <option value="Bachelor of Science in Architecture">
                                                Bachelor of Science in
                                                Architecture
                                            </option>
                                            <option value="Bachelor of Science in Business Administration">
                                                Bachelor of Science in Business
                                                Administration
                                            </option>
                                            <option value="Bachelor of Science in Civil Engineering">
                                                Bachelor of Science in Civil
                                                Engineering
                                            </option>
                                            <option value="Bachelor of Science in Computer Science">
                                                Bachelor of Science in Computer
                                                Science
                                            </option>
                                            <option value="Bachelor of Science in Computer Engineering">
                                                Bachelor of Science in Computer
                                                Engineering
                                            </option>
                                            <option value="Bachelor of Science in Criminology">
                                                Bachelor of Science in
                                                Criminology
                                            </option>
                                            <option value="Bachelor of Science in Dentistry">
                                                Bachelor of Science in Dentistry
                                            </option>
                                            <option value="Bachelor of Science in Elementary Education">
                                                Bachelor of Science in
                                                Elementary Education
                                            </option>
                                            <option value="Bachelor of Science in Electrical Engineering">
                                                Bachelor of Science in
                                                Electrical Engineering
                                            </option>
                                            <option value="Bachelor of Science in Information System">
                                                Bachelor of Science in
                                                Information System
                                            </option>
                                            <option value="Bachelor of Science in Hospitality Management">
                                                Bachelor of Science in
                                                Hospitality Management
                                            </option>
                                            <option value="Bachelor of Science in Information Technology">
                                                Bachelor of Science in
                                                Information Technology
                                            </option>
                                            <option value="Bachelor of Science in Mechanical Engineering">
                                                Bachelor of Science in
                                                Mechanical Engineering
                                            </option>
                                            <option value="Bachelor of Science in Mass Communication">
                                                Bachelor of Science in Mass
                                                Communication
                                            </option>
                                            <option value="Bachelor of Science in Nursing">
                                                Bachelor of Science in Nursing
                                            </option>
                                            <option value="Bachelor of Science in Secondary Education">
                                                Bachelor of Science in Secondary
                                                Education
                                            </option>
                                            <option value="Bachelor of Science in Social Studies">
                                                Bachelor of Science in Social
                                                Studies
                                            </option>
                                        </select>
                                    </div>
                                    <div className="col ">
                                        <label htmlFor="birthday">
                                            Birthday
                                        </label>
                                        <input
                                            type="date"
                                            name="birthday"
                                            id="birthday"
                                            className="form-control"
                                            value={employeeData.birthday}
                                            onChange={(e) =>
                                                setEmployeeData({
                                                    ...employeeData,
                                                    birthday: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="col col-md-2">
                                        <label htmlFor="sex">Sex</label>
                                        <select
                                            name="sex"
                                            id="sex"
                                            className="form-select"
                                            value={employeeData.sex}
                                            onChange={(e) =>
                                                setEmployeeData({
                                                    ...employeeData,
                                                    sex: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="">
                                                Select here
                                            </option>
                                            <option value="Male">Male</option>
                                            <option value="Female">
                                                Female
                                            </option>
                                        </select>
                                    </div>
                                    <div className="col col-md-1">
                                        <label htmlFor="age">Age</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="age"
                                            name="age"
                                            value={employeeData.age}
                                            onChange={(e) =>
                                                setEmployeeData({
                                                    ...employeeData,
                                                    age: e.target.value,
                                                })
                                            }
                                            min="18"
                                        />
                                    </div>
                                </div>
                                <div className="block my-3 flex-wrap">
                                    <div className="col d-flex">
                                        <label htmlFor="insurance">
                                            Insurance
                                        </label>
                                        <div className="col d-flex ms-3">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                value={employeeData.sss}
                                                onChange={(e) =>
                                                    setEmployeeData({
                                                        ...employeeData,
                                                        sss: e.target.checked,
                                                    })
                                                }
                                            />
                                            <span className="ms-2">SSS</span>
                                            <input
                                                type="checkbox"
                                                className="form-check-input ms-3"
                                                onChange={(e) =>
                                                    setEmployeeData({
                                                        ...employeeData,
                                                        pagibig:
                                                            e.target.checked,
                                                    })
                                                }
                                                value={employeeData.pagibig}
                                            />
                                            <span className="ms-2">
                                                Pag-Ibig
                                            </span>
                                            <input
                                                type="checkbox"
                                                className="form-check-input ms-3"
                                                onChange={(e) =>
                                                    setEmployeeData({
                                                        ...employeeData,
                                                        philhealth:
                                                            e.target.checked,
                                                    })
                                                }
                                                value={employeeData.philhealth}
                                            />

                                            <span className="ms-2">
                                                PhilHealth
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="fw-bold">Parent/Guardian</h4>
                                <div>
                                    <h5 className="fw-bold">Father</h5>
                                    <div className="d-block d-md-flex flex-wrap gap-3">
                                        <div className="col">
                                            <label htmlFor="fatherfirstname">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="fatherfirstname"
                                                id="fatherfirstname"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setEmployeeData({
                                                        ...employeeData,
                                                        dadfirstname:
                                                            e.target.value,
                                                    })
                                                }
                                                value={
                                                    employeeData.dadfirstname
                                                }
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="fatherlastname">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="fatherlastname"
                                                id="fatherlastname"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setEmployeeData({
                                                        ...employeeData,
                                                        dadlastname:
                                                            e.target.value,
                                                    })
                                                }
                                                value={employeeData.dadlastname}
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="fathermiddlename">
                                                Middle Name
                                            </label>
                                            <input
                                                type="text"
                                                name="fathermiddlename"
                                                id="fathermiddlename"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setEmployeeData({
                                                        ...employeeData,
                                                        dadmiddlename:
                                                            e.target.value,
                                                    })
                                                }
                                                value={
                                                    employeeData.dadmiddlename
                                                }
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="fatherphone">
                                                Contact Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="fatherphone"
                                                id="fatherphone"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setEmployeeData({
                                                        ...employeeData,
                                                        dadphone:
                                                            e.target.value,
                                                    })
                                                }
                                                value={employeeData.dadphone}
                                                minLength="11"
                                                maxLength="11"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="fw-bold">Mother</h5>
                                    <div className="d-block d-md-flex flex-wrap gap-3">
                                        <div className="col">
                                            <label htmlFor="momfirstname">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="momfirstname"
                                                id="momfirstname"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setEmployeeData({
                                                        ...employeeData,
                                                        momfirstname:
                                                            e.target.value,
                                                    })
                                                }
                                                value={
                                                    employeeData.momfirstname
                                                }
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="momlastname">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="momlastname"
                                                id="momlastname"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setEmployeeData({
                                                        ...employeeData,
                                                        momlastname:
                                                            e.target.value,
                                                    })
                                                }
                                                value={employeeData.momlastname}
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="mommiddlename">
                                                Middle Name
                                            </label>
                                            <input
                                                type="text"
                                                name="mommiddlename"
                                                id="mommiddlename"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setEmployeeData({
                                                        ...employeeData,
                                                        mommiddlename:
                                                            e.target.value,
                                                    })
                                                }
                                                value={
                                                    employeeData.mommiddlename
                                                }
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="momphone">
                                                Contact Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="momphone"
                                                id="momphone"
                                                className="form-control"
                                                onChange={(e) =>
                                                    setEmployeeData({
                                                        ...employeeData,
                                                        momphone:
                                                            e.target.value,
                                                    })
                                                }
                                                value={employeeData.momphone}
                                                minLength="11"
                                                maxLength="11"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-dark mt-3"
                                    onClick={() =>
                                        updateEmployee(
                                            employeeData.id,
                                            employeeData.lastname,
                                            employeeData.firstname
                                        )
                                    }
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditEmployee;
