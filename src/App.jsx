import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import EmployeeList from "./components/EmployeeList";
import EmployeeCard from "./components/EmployeeCard";
import EmployeeProfile from "./components/EmployeeProfile";
import Login from "./auth/Login";
import Register from "./auth/Register";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="employees" element={<EmployeeList />} />
                        <Route path="profile" element={<EmployeeProfile />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
