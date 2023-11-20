import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebaseAuth from "../components/firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import "sweetalert2/dist/sweetalert2.js";

function Register() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleRegister = () => {
        if (
            email !== "" ||
            password !== "" ||
            (confirm !== "" && password === confirm)
        ) {
            const auth = getAuth(firebaseAuth);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    alert("Registration successful!");
                })
                .catch((err) => {
                    console.log(err.message);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Registration failed!",
                    });
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter your email and password",
            });
        }
    };

    return (
        <>
            <div className="container border p-5 rounded mt-5">
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

                <button className="btn btn-dark mt-3" onClick={handleRegister}>
                    Register
                </button>
                <hr />
                <Link to="/login" className="mt-3 text-dark link">
                    Don't have an account? Register here.
                </Link>
            </div>
        </>
    );
}

export default Register;
