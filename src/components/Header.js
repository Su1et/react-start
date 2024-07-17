import React, {useEffect, useState} from "react";
import {Routes, Route, Link, useNavigate} from "react-router-dom";
import logo from "./logo.jpg";
import Home from "../pages/Home";
import FAQ from "../pages/FAQ";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Orders from "../pages/Orders";
import "../styles/header.css";
import RequireAuth from "./RequireAuth";
import Form from "../pages/Form";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const ROLES = {
        Company: 'ROLE_COMPANY',
        Customer: 'ROLE_CUSTOMER',
    };
    const navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove("token");
        setLoggedIn(false);
        navigate('/');
    };

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    return (
        <>
            <nav>
                <img width="150px" height="150px" src={logo} alt="Logo"/>
                <ul>
                    <li><Link to="/">Головна</Link></li>
                    <li><Link to="/FAQ">FAQ</Link></li>
                    {loggedIn && (
                        <li>
                            {jwtDecode(Cookies.get("token"))?.roles === ROLES.Company && (
                                <li><Link to="/form">Зробити замовлення</Link></li>
                            )}
                            {jwtDecode(Cookies.get("token"))?.roles === ROLES.Company && (
                                <li><Link to="/orders">Мої замовлення</Link></li>
                            )}
                            <button onClick={handleLogout}>Вийти</button>
                        </li>
                    )}
                    {!loggedIn && (
                        <>
                            <li><Link to="/login">Вхід</Link></li>
                            <li><Link to="/registration">Зареєструватися</Link></li>
                        </>
                    )}
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/FAQ" element={<FAQ/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>}/>
                <Route element={<RequireAuth allowedRoles={[ROLES.Company]}/>}>
                    <Route path="/orders" element={<Orders/>}/>
                    <Route path="/form" element={<Form/>}/>
                </Route>
            </Routes>
        </>
    );
};

export default Header;
