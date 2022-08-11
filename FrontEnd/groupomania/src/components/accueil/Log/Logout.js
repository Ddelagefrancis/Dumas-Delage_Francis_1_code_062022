import React from 'react';

function Logout() {
    const logout = () => {
        localStorage.clear();
        window.location = '/login';
    };

    return (
        <li onClick={logout}>
            <img src="./img/icons/logout.svg" alt="logout" />
        </li>
    );
}

export default Logout;