import React, { useState } from 'react';
// import axios from 'axios';

function Signup() {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async (e) => {

    }

    return (
        <form action="" onSubmit={handleRegister} id="signup" className='form_logs'>
            <label htmlFor="pseudo">Pseudo</label>
            <input
                type="text"
                name="pseudo"
                id="pseudo"
                onChange={(e) => setPseudo(e.target.value)}
                value={pseudo}
            />
            <div className="pseudo error"></div>
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
                id="password-conf"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <div className="password error"></div>
            <br />
            <label htmlFor="password-conf">Confirmer mot de passe</label>
            <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setControlPassword(e.target.value)}
                value={controlPassword}
            />
            <div className="password-confirm error"></div>
            <br />
            <input type="submit" value="Valider inscription" className='button' />
        </form>
    );
}

export default Signup;