import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from "../login/Login";

function Signup() {
    const [formSubmit, setFormSubmit] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleSignup =  (e) => {
        e.preventDefault();
        const usernameError = document.querySelector('.username.error');
        const emailError = document.querySelector('.email.error');
        const password = document.querySelector('.password.error');
        const passwordConfirmError = document.querySelector('.password-confirm.error');

        passwordConfirmError.innerHTML = "";

        if (password !== controlPassword) {
            passwordConfirmError.innertHTML = "Les mots de passe ne correspondent pas";
        } else {
             axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/signup`,
                data: {
                    username: username,
                    email: email,
                    password: password,
                }
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.error) {
                        usernameError.innerHTML = res.data.error.username;
                        emailError.innerHTML = res.data.error.email;
                        passwordConfirmError.innerHTML = res.data.error.password;
                    } else {
                        setFormSubmit(true);
                        setUsername('');
                        setEmail('');
                        setPassword('');
                        setControlPassword('');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <>
            {formSubmit ? (
                <>
                    <SignInForm />
                    <h4 className="success">
                        Enregistrement réussi, veuillez-vous connecter
                    </h4>
                </>
            ) : (
                <div className='logs'>
                    <form action="" onSubmit={handleSignup} id="sign-up-form" className='form_logs'>
                        <label htmlFor="username">Pseudo</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                        <div className="username error"></div>
                        <br />
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <div className="email error"></div>
                        <br />
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <div className="password error"></div>
                        <br />
                        <label htmlFor="password-confirm">Confirmer mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            id="password-confirm"
                            onChange={(e) => setControlPassword(e.target.value)}
                            value={controlPassword}
                        />
                        <div className="password-confirm error"></div>
                        <br />
                        <input type="submit" value="Valider inscription" className='button' />
                    </form>
                </div>
            )}
        </>
    );
}

export default Signup;