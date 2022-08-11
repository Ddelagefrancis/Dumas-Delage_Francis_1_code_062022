import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import Logout from './accueil/Log/Logout';
import axios from 'axios';

function Navbar() {
    const [userData, setUserData] = useState('');

    const accessToken = JSON.parse(localStorage.getItem('token')).token;
    const id = JSON.parse(localStorage.getItem('token')).userId;

    useEffect(() => {
        const dataAxios = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/` + id, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            setUserData({
                username: res.data.username,
            });
        };
        dataAxios();
    }, [id, accessToken]);

    return (
        <nav className='navbarr'>
            <div className="nav-container">
                <div className="logo">
                        <div className="logo">
                            <img src="./img/icon-left-font.png" alt="icon" className="picture" />
                        </div>
                </div>
                {id ? (
                    <ul>
                        
                        <li className="welcome">
                            <h4>Bienvenue {userData.username}</h4>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        
                        <li>
                            <NavLink exact to="/login">
                                <img src="./img/icons/login.svg" alt="login" />
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;