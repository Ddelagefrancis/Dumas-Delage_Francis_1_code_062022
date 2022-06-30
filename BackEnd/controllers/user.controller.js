require('dotenv').config({ path: './config/.env' });
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Création d'un nouvel utilisaeur 
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                user_admin: 0,
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !', user: user.id }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//  Utilisateur existant
exports.login = (req, res, next) => { 
    const email = req.body.email;
    //  Trouver un utilisateur avec l'email
    User.findOne({ where: { email: email } })
    .then(user => {
        if (!user) {
            console.log('echec de connection');
            return res.status(401).json({ error: 'Utilisateur non trouvé !'});
        }
        //  Compare le mdp envoyé avec la requête et le hash
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !'});
            }
            //  Connection réussie, id de l'utilisateur + token de connexion valide
            res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                    { userId: user.id },
                    process.env.SECRET_TOKEN,
                    { expiresIn: '1h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};