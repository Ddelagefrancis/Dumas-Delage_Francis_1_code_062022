import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        msgError: '',
    });

    const handleLogin = (e) => {
        e.preventDefault();
        if (user.email === '' || user.password === '') {
            setUser({
                ...user,
                msgError: 'Tous les champs doivent être remplis',
            });
        } else {
            let data = {
                email: user.email,
                password: user.password,
            };
            axios
                .post(`${process.env.REACT_APP_API_URL}api/user/login`, data)
                .then((res) => {
                    localStorage.setItem('token', JSON.stringify(res.data));
                    window.location = '/home';
                })
                .catch((err) => {
                    const auth = localStorage.getItem('token');

                    if (!auth) {
                        setUser({
                            ...user,
                            msgError:
                                'Utilisateur non trouvé, vérifiez vos informations ou contactez un admin ',
                        });

                        console.log('No Token');
                    }
                    console.log(err);
                });
        }
    };

    const handleInput = (e) => {
        if (e.target.classList.contains('inp-email')) {
            const newObjState = { ...user, email: e.target.value };
            setUser(newObjState);
        } else if (e.target.classList.contains('inp-password')) {
            const newObjState = { ...user, password: e.target.value };
            setUser(newObjState);
        }
    };

    return (
        <>
            <div className='logs'>
                <form action="" onSubmit={handleLogin} id="sign-up-form" className='form_logs' >
                    <label htmlFor="email">Email</label>
                    <input
                        className="inp-email"
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleInput}
                        value={user.email}
                    />
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
                    <br />
                    <input type="submit" value="Se connecter" className='button' />
                    <p className="usernotfound">{user.msgError}</p>
                </ form>
            </div>
        </>
    );
}

export default Login;