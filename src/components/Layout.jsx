import React from "react";
import { Outlet, Link } from "react-router-dom";
import reactLogo from "../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Footer from "./Footer";

function Layout() {
    return (
        <>
            <main className="d-flex flex-column min-vh-100">
                <nav className="navbar navbar-expand-sm  px-3">
                    <div className="container-fluid">
                        <Link className="navbar-brand fw-bold" to="/employees">
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
                                    <Link
                                        to="employees"
                                        className="fw-bold nav-link "
                                    >
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
                                        to="login"
                                        className="fw-bold nav-link "
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item ">
                                    <Link
                                        to="register"
                                        className="fw-bold nav-link "
                                    >
                                        Register
                                    </Link>
                                </li>
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
