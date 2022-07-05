require('dotenv').config({ path: './config/.env' });

const jwt = require("jsonwebtoken");
const models = require('../models/index');


// Permet de créer un nouveau message
exports.createPost = (req, res) => {   
    const content = req.body.content;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    
    // Permet de vérifier que tous les champs sont complétés
    if (content == null || content == '') {
        return res.status(400).json({ error: 'Tous les champs doivent être renseignés' });
    } 

    // Permet de contrôler la longueur du titre et du contenu du message
    if (content.length <= 4) {
        return res.status(400).json({ error: 'Le contenu du message doit contenir au moins 4 caractères' });
    }
    
    models.User.findOne({
        where: { id: userId }
    })
    
    .then(userFound => {
        if(userFound) {
            const post = models.Post.build({
                content: content,
                likes  : 0,
                UserId: userFound.id
            })
            post.save()
            .then(() => res.status(201).json({ message: 'Votre message a bien été créé !', content: content, UserId: userFound.id }))
            .catch(error => res.status(400).json({ error: '⚠ Oops, impossible de créer le post !' }));
        } else {
          return res.status(404).json({ error: 'Utilisateur non trouvé' })
      }
    })
    .catch(error => res.status(500).json({ "error": "Utilisateur invalide" }));
}

// Permet d'afficher tous les messages
exports.getAllPosts = (req, res) => {
  models.Post.findAll({
      order: [['createdAt', "DESC"]] ,
      include: [{
          model: models.User,
          attributes: [ 'username' ]
      }]
  })
  .then(postFound => {
      if(postFound) {
          res.status(200).json(postFound);
      } else {
          res.status(404).json({ error: 'Aucun message trouvé' });
      }
  })
  .catch(error => {
      res.status(500).send({ error: '⚠ Oops, champs invalides !' });
  });
}