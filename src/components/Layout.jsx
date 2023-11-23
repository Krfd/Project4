import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import reactLogo from "../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import app from "./firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function Layout() {
    const [authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
        const auth = getAuth(app);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setAuthenticated(true);
                //     Swal.fire({
                //         icon: "success",
                //         title: "Welcome!",
                //         text: "You are logged in.",
                //     });
                // } else {
                //     Swal.fire({
                //         icon: "error",
                //         title: "Oops...",
                //         text: "You are not logged in!",
                //     });
                // }
            }
        });
    }, []);

    let navigate = useNavigate();
    const logout = () => {
        const auth = getAuth(app);
        setAuthenticated(false);
        signOut(auth)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Logging out!",
                    text: "You are now leaving the page.",
                });
                navigate("/login");
            })
            .catch((error) => {
                // An error happened.
            });
    };
    return (
        <>
            <main className="d-flex flex-column min-vh-100">
                <nav className="navbar navbar-expand-sm  px-3">
                    <div className="container-fluid">
                        <Link className="navbar-brand fw-bold" to="/">
                            <img src={reactLogo} alt="logo" className="logo" />
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarNav"
                        >
                            <ul className="navbar-nav">
                                <li className="nav-item ">
                                    <Link to="/" className="fw-bold nav-link ">
                                        Employees
                                    </Link>
                                </li>
                                <li className="nav-item ">
                                    <Link
                                        to="profile"
                                        className="fw-bold nav-link "
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item ">
                                    <Link
                                        to="contact"
                                        className="fw-bold nav-link "
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto">
                                {authenticated ? (
                                    <li className="nav-item">
                                        <Link
                                            onClick={logout}
                                            className="fw-bold nav-link "
                                        >
                                            Log out
                                        </Link>
                                    </li>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <Link
                                                to="login"
                                                className="fw-bold nav-link"
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                to="register"
                                                className="fw-bold nav-link "
                                            >
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
                <Outlet />
                <div className="container mt-auto">
                    <Footer />
                </div>
            </main>
        </>
    );
}

export default Layout;
