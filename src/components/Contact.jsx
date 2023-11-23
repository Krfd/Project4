import React from "react";
import { useState } from "react";

function Contact() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const addContact = () => {
        console.log(email);
    };
    return (
        <>
            <div className="container my-5 shadow p-5">
                <div className="d-block mx-auto border p-5 rounded mt-5">
                    <h1 className="fw-bold">Contact Us!</h1>
                    <p>Get in touch with us...</p>
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
                    <button
                        className="btn btn-dark mt-3 mx-auto d-block btn-sm"
                        onClick={handleLogin}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}

export default Contact;
