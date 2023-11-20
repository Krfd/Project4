import React, { useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import "sweetalert2/dist/sweetalert2.js";
import { useState } from "react";
import app from "./firebaseConfig";
import storage from "./firebaseConfig";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function AddEmployee() {
    const [file, setFile] = useState("");

    // File storage
    useEffect(() => {
        try {
            const uploadFile = () => {
                const name = new Date().getTime() + file.name;
                console.log(name);
                const storageRef = ref(storage, name);
                const uploadTask = uploadBytesResumable(storageRef, file);

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        console.log("Upload is " + progress + "% done");
                        switch (snapshot.state) {
                            case "paused":
                                console.log("Upload is paused");
                                break;
                            case "running":
                                console.log("Upload is running");
                                break;
                            default:
                                break;
                        }
                    },
                    (error) => {
                        console.log(err);
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case "storage/unauthorized":
                                // User doesn't have permission to access the object
                                break;
                            case "storage/canceled":
                                // User canceled the upload
                                break;

                            // ...

                            case "storage/unknown":
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                        }
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                                console.log("File available at", downloadURL);
                                setEmployee((prev) => ({
                                    ...prev,
                                    img: downloadURL,
                                }));
                            }
                        );
                    }
                );
            };
            file && uploadFile();
        } catch (err) {
            console.log("Error uploading file: ", err);
        }
    }, [file]);

    const [employee, setEmployee] = useState({
        firstname: "",
        lastname: "",
        middlename: "",
        email: "",
        address: "",
        phone: "",
        degree: "",
        position: "",
        salary: "",
        age: "",
        sss: false,
        pagibig: false,
        philhealth: false,
        dadfirstname: "",
        dadlastname: "",
        dadmiddlename: "",
        dadphone: "",
        momfirstname: "",
        momlastname: "",
        mommiddlename: "",
        momphone: "",
    });
    const [employeeList, setEmployeeList] = useState([]);

    const emptyElements = () => {
        setEmployee({
            firstname: "",
            lastname: "",
            middlename: "",
            email: "",
            address: "",
            phone: "",
            position: "",
            salary: "",
            degree: "",
            birthday: "",
            sex: "",
            age: "",
            sss: false,
            pagibig: false,
            philhealth: false,
            dadfirstname: "",
            dadlastname: "",
            dadmiddlename: "",
            dadphone: "",
            momfirstname: "",
            momlastname: "",
            mommiddlename: "",
            momphone: "",
        });
        setFile("");
    };

    const add = () => {
        const db = getFirestore(app);
        try {
            if (
                employee.lastname == "" ||
                employee.firstname == "" ||
                employee.middlename == "" ||
                employee.email == "" ||
                employee.address == "" ||
                employee.position == "" ||
                employee.salary == "" ||
                employee.phone == "" ||
                employee.degree == "" ||
                employee.sex == "" ||
                employee.age == "" ||
                employee.dadfirstname == "" ||
                employee.dadlastname == "" ||
                employee.dadmiddlename == "" ||
                employee.momfirstname == "" ||
                employee.momlastname == "" ||
                employee.mommiddlename == ""
            ) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please fill out all the fields.",
                });
            } else {
                if (
                    employee.momphone === "" ||
                    employee.momphone === null ||
                    employee.dadphone === "" ||
                    employee.dadphone === null
                ) {
                    employee.momphone = "N/A";
                    employee.dadphone = "N/A";
                } else {
                    employee.momphone = employee.momphone;
                    employee.dadphone = employee.dadphone;
                }
                employee.sss == true
                    ? (employee.sss = "SSS")
                    : (employee.sss = "N/A");
                employee.pagibig == true
                    ? (employee.pagibig = "Pag-IBIG")
                    : (employee.pagibig = "N/A");
                employee.philhealth == true
                    ? (employee.philhealth = "PhilHealth")
                    : (employee.philhealth = "N/A");

                setEmployeeList((employeeList) => [...employeeList, employee]);

                if (addDoc(collection(db, "employees"), employee)) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Employee added successfully.",
                    });
                    emptyElements();
                    const hide = () => {
                        const hideModal = new bootstrap.Modal(
                            document.getElementById("addEmployee")
                        );
                    };
                    hide.hide();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong.",
                    });
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <button
                type="button"
                className="btn btn-dark btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#addEmployee"
            >
                Add Employee
            </button>
            <div className="modal fade" id="addEmployee">
                <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fw-bold">
                                Add Employee
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
                                    <img
                                        src={
                                            file
                                                ? URL.createObjectURL(file)
                                                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                        }
                                        className="image-icon"
                                        alt=""
                                    />
                                    <div className="col">
                                        <label htmlFor="lastname">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastname"
                                            name="lastname"
                                            className="form-control"
                                            value={employee.lastname}
                                            onChange={(e) =>
                                                setEmployee({
                                                    ...employee,
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
                                            value={employee.firstname}
                                            onChange={(e) =>
                                                setEmployee({
                                                    ...employee,
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
                                            value={employee.middlename}
                                            onChange={(e) =>
                                                setEmployee({
                                                    ...employee,
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
                                            value={employee.email}
                                            onChange={(e) =>
                                                setEmployee({
                                                    ...employee,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="profile">Profile</label>
                                        <input
                                            type="file"
                                            id="profile"
                                            name="profile"
                                            className="form-control"
                                            onChange={(e) =>
                                                setFile(e.target.files[0])
                                            }
                                            value={file}
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
                                            value={employee.address}
                                            onChange={(e) =>
                                                setEmployee({
                                                    ...employee,
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
                                            value={employee.phone}
                                            onChange={(e) =>
                                                setEmployee({
                                                    ...employee,
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
                                            value={employee.position}
                                            onChange={(e) =>
                                                setEmployee({
                                                    ...employee,
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
                                            value={employee.salary}
                                            onChange={(e) =>
                                                setEmployee({
                                                    ...employee,
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
                                            value={employee.degree}
                                            onChange={(e) =>
                                                setEmployee({
                                                    ...employee,
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
                                            value={employee.birthday}
                                            onChange={(e) =>
                                                setEmployee({
                                                    ...employee,
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
                                            value={employee.sex}
                                            onChange={(e) =>
                                                setEmployee({
                                                    ...employee,
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
                                            value={employee.age}
                                            onChange={(e) =>
                                                setEmployee({
                                                    ...employee,
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
                                                value={employee.sss}
                                                onChange={(e) =>
                                                    setEmployee({
                                                        ...employee,
                                                        sss: e.target.checked,
                                                    })
                                                }
                                                checked={employee.sss}
                                            />
                                            <span className="ms-2">SSS</span>
                                            <input
                                                type="checkbox"
                                                className="form-check-input ms-3"
                                                value={employee.pagibig}
                                                onChange={(e) =>
                                                    setEmployee({
                                                        ...employee,
                                                        pagibig:
                                                            e.target.checked,
                                                    })
                                                }
                                                checked={employee.pagibig}
                                            />
                                            <span className="ms-2">
                                                Pag-Ibig
                                            </span>
                                            <input
                                                type="checkbox"
                                                className="form-check-input ms-3"
                                                value={employee.philhealth}
                                                onChange={(e) =>
                                                    setEmployee({
                                                        ...employee,
                                                        philhealth:
                                                            e.target.checked,
                                                    })
                                                }
                                                checked={employee.philhealth}
                                            />{" "}
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
                                                    setEmployee({
                                                        ...employee,
                                                        dadfirstname:
                                                            e.target.value,
                                                    })
                                                }
                                                value={employee.dadfirstname}
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
                                                    setEmployee({
                                                        ...employee,
                                                        dadlastname:
                                                            e.target.value,
                                                    })
                                                }
                                                value={employee.dadlastname}
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
                                                    setEmployee({
                                                        ...employee,
                                                        dadmiddlename:
                                                            e.target.value,
                                                    })
                                                }
                                                value={employee.dadmiddlename}
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
                                                    setEmployee({
                                                        ...employee,
                                                        dadphone:
                                                            e.target.value,
                                                    })
                                                }
                                                value={employee.dadphone}
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
                                                    setEmployee({
                                                        ...employee,
                                                        momfirstname:
                                                            e.target.value,
                                                    })
                                                }
                                                value={employee.momfirstname}
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
                                                    setEmployee({
                                                        ...employee,
                                                        momlastname:
                                                            e.target.value,
                                                    })
                                                }
                                                value={employee.momlastname}
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
                                                    setEmployee({
                                                        ...employee,
                                                        mommiddlename:
                                                            e.target.value,
                                                    })
                                                }
                                                value={employee.mommiddlename}
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
                                                    setEmployee({
                                                        ...employee,
                                                        momphone:
                                                            e.target.value,
                                                    })
                                                }
                                                value={employee.momphone}
                                                minLength="11"
                                                maxLength="11"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-dark mt-3"
                                    onClick={add}
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

export default AddEmployee;
