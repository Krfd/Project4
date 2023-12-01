import app from "./firebaseConfig";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import "sweetalert2/dist/sweetalert2.js";

function Contact() {
    const [contact, setContact] = useState({
        email: "",
        message: "",
    });
    const [contactList, setContactList] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);

    const emptyFields = () => {
        setContact({
            email: "",
            message: "",
        });
    };

    const handleLogin = () => {
        const db = getFirestore(app);
        try {
            if (contact.email === "" || contact.password === "") {
                Swal.fire({
                    title: "Error!",
                    text: "Please fill all the fields!",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
                return;
            } else {
                setContactList([...contactList, contact]);

                if (addDoc(collection(db, "contact"), contact)) {
                    Swal.fire({
                        title: "Success!",
                        text: "Your message has been sent!",
                        icon: "success",
                        confirmButtonText: "Ok",
                    });
                    emptyFields();
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Your message was not sent!",
                        icon: "error",
                        confirmButtonText: "Ok",
                    });
                    emptyFields();
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

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
                            onChange={(e) =>
                                setContact({
                                    ...contact,
                                    email: e.target.value,
                                })
                            }
                            value={contact.email}
                        />
                        <label htmlFor="message" className="mt-2">
                            Message
                        </label>
                        <textarea
                            type="text"
                            id="message"
                            cols="30"
                            rows="5"
                            className="form-control"
                            onChange={(e) =>
                                setContact({
                                    ...contact,
                                    message: e.target.value,
                                })
                            }
                            value={contact.message}
                        ></textarea>
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
