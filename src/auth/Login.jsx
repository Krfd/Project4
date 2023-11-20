import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebaseAuth from "../components/firebaseConfig";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import "sweetalert2/dist/sweetalert2.js";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (email !== "" || password !== "") {
            const auth = getAuth(firebaseAuth);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    alert("Login successful!");
                })
                .catch((error) => {
                    console.log(error.message);
                    alert("Login failed!");
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill out all the fields!",
            });
        }
    };

    return (
        <>
            <div className="container border p-5 rounded my-5">
                <h1 className="fw-bold">Login</h1>
                <p>Enter your email and password to login.</p>
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
                <button className="btn btn-dark mt-3" onClick={handleLogin}>
                    Login
                </button>
                <hr />
                <Link to="/register" className="mt-3 text-dark link">
                    Don't have an account? Register here.
                </Link>
            </div>
        </>
    );
}

export default Login;
