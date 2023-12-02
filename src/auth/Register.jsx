import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebaseAuth from "../components/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    getAuth,
    updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import "sweetalert2/dist/sweetalert2.js";
import { useNavigate } from "react-router-dom";

function Register() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const emptyFields = () => {
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setConfirm("");
    };

    const handleRegister = () => {
        if (
            firstname !== "" ||
            lastname !== "" ||
            email !== "" ||
            password !== "" ||
            confirm !== ""
        ) {
            if (password === confirm) {
                const auth = getAuth(firebaseAuth);
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;

                        updateProfile(auth.currentUser, {
                            displayName: firstname + " " + lastname,
                        });

                        Swal.fire({
                            icon: "success",
                            title: "Registration Successful!",
                            text: "You will be redirected to the login page.",
                        });
                        emptyFields();
                    })
                    .catch((err) => {
                        console.log(err.message);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Registration failed!",
                        });
                        emptyFields();
                    });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Password and confirm password do not match!",
                });
                emptyFields();
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill out all the fields.",
            });
            emptyFields();
        }
    };

    return (
        <>
            <div className="d-block border p-5 rounded my-5 mx-auto">
                <h1 className="fw-bold">Register</h1>
                <p>Create your account here.</p>
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="firstname">Firstname</label>
                        <input
                            type="text"
                            id="firstname"
                            className="form-control"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="lastname">Lastname</label>
                        <input
                            type="text"
                            id="lastname"
                            className="form-control"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                </div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label htmlFor="password" className="mt-2">
                    Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <label htmlFor="confirm" className="mt-2">
                    Confirm Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="confirm"
                    onChange={(e) => setConfirm(e.target.value)}
                    value={confirm}
                />

                <button
                    className="btn btn-dark mt-3 btn-sm d-block mx-auto"
                    onClick={handleRegister}
                >
                    Register
                </button>
                <hr />
                <Link to="/login" className="mt-3 text-dark link">
                    Already have an account? Login here.
                </Link>
            </div>
        </>
    );
}

export default Register;
