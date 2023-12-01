import app from "./firebaseConfig";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Contact() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);

    const addContact = () => {
        console.log(email);
    };

    const handleLogin = () => {};

    useEffect(() => {
        const auth = getAuth(app);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setAuthenticated(true);
                setUserProperties(user);
            }
        });
    }, []);

    if (authenticated) {
        return (
            <>
                <div className="container mt-5">
                    <div className="d-block mx-auto shadow col col-md-8 col-lg-6 border p-5 rounded">
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
    } else {
        return (
            <>
                <div className="container mt-5">
                    <div className="d-block">
                        <h1 className="text-start display-1 fw-bold">
                            Please login to contact us...
                        </h1>
                    </div>
                </div>
                ;
            </>
        );
    }
}

export default Contact;
