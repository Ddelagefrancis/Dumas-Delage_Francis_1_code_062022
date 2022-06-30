require('dotenv').config({path: './config/.env'});

//Permet de vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    //Extraction du token du header authorization et utilisation de split pour récupérer tous les éléments après l'espace du header
    const token = req.headers.authorization.split(' ')[1];
    //Décode le token
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    //Extrait l'id utilisateur et compare à celui extrait du token
    const userId = decodedToken.userId;
    req.auth = { userId };

    //  Si le corps de la requête comporte un userId, on vérifie que le userId correspond au token
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Id utilisateur invalide !';
    } else {
        next();
      }
  } catch {res.status(401).json({error: new Error('Requête invalide !')});}
};