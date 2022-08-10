import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from "./Login";

function Signup() {
    const [formSubmit, setFormSubmit] = useState(false);

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        msgError: '',
    });

    const handleSignup = (e) => {
        const errorUser = document.querySelector('.errorUser');
        e.preventDefault();
        let data = {
            username: user.username,
            email: user.email,
            password: user.password,
        };
        axios
            .post(`${process.env.REACT_APP_API_URL}api/user/signup`, data)
            .then((res) => {
                if (res.data.error) {
                    errorUser.innerHTML = 'Cette email est déjà utilisée';
                } else {
                    setFormSubmit(true);
                    setUser({
                        username: '',
                        email: '',
                        password: '',
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleInput = (e) => {
        if (e.target.classList.contains('inp-username')) {
            const newObjState = { ...user, username: e.target.value };
            setUser(newObjState);
        } else if (e.target.classList.contains('inp-email')) {
            const newObjState = { ...user, email: e.target.value };
            setUser(newObjState);
        } else if (e.target.classList.contains('inp-password')) {
            const newObjState = { ...user, password: e.target.value };
            setUser(newObjState);
        }
    };

    return (
        <>
            {formSubmit ? (
                <>
                    <SignInForm />
                    <h4 className="success">
                        Inscription réussi, veuillez-vous connecter !
                    </h4>
                </>
            ) : (
                <div className='logs'>
                    <form action="" onSubmit={handleSignup} id="sign-up-form" className='form_logs'>
                        <label htmlFor="username">Pseudo</label>
                        <input
                            className="inp-username"
                            type="text"
                            name="username"
                            id="username"
                            onChange={handleInput}
                            value={user.username}
                        />
                        <div className="username error"></div>
                        <br />
                        <label htmlFor="email">Email</label>
                        <input
                            className="inp-email"
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleInput}
                            value={user.email}
                        />
                        <div className="email error"></div>
                        <br />
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            className="inp-password"
                            type="password"
                            name="password"
                            id="password"
                            onChange={handleInput}
                            value={user.password}
                        />
                        <div className="password error"></div>
                        <br />
                        <input type="submit" value="Valider inscription" className='button' />
                        <div className="errorUser"></div>
                    </form>
                </div>
            )}
        </>
    );
}

export default Signup;