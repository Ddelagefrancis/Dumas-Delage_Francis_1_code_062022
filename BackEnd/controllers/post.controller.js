require('dotenv').config({ path: './config/.env' });

const jwt = require("jsonwebtoken");
const models = require('../models/index');
const fs = require('fs');

// Permet de créer un nouveau message
exports.createPost = (req, res) => {
  const content = req.body.content;

  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;

  // Permet de vérifier que tous les champs sont complétés
  if (content == null || content == '') {
    return res.status(400).json({ error: '⚠ Oops, Tous les champs doivent être renseignés' });
  }

  // Permet de contrôler la longueur du titre et du contenu du message
  if (content.length <= 4) {
    return res.status(400).json({ error: '⚠ Oops, Le contenu du message doit contenir au moins 4 caractères' });
  }

  models.User.findOne({
    where: { id: userId }
  })

    .then(userFound => {
      if (userFound) {
        const post = models.Post.build({
          content: content,
          likes: 0,
          attachement: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : req.body.attachement,
          UserId: userFound.id
        })
        post.save()
          .then(() => res.status(201).json({ message: 'Votre message a bien été créé !', content: content, UserId: userFound.id }))
          .catch(error => res.status(400).json({ error: '⚠ Oops, impossible de créer le post !' }));
      } else {
        return res.status(404).json({ error: '⚠ Oops, Utilisateur non trouvé' })
      }
    })
    .catch(error => res.status(500).json({ "error": "⚠ Oops, Utilisateur invalide" }));
}

// Permet d'afficher tous les messages
exports.getAllPosts = (req, res) => {
  models.Post.findAll({
    order: [['createdAt', "DESC"]],
    include: [{
      model: models.User,
      attributes: ['username']
    }]
  })
    .then(postFound => {
      if (postFound) {
        res.status(200).json(postFound);
      } else {
        res.status(404).json({ error: '⚠ Oops, Aucun message trouvé' });
      }
    })
    .catch(error => {
      res.status(500).send({ error: '⚠ Oops, champs invalides !' });
    });
}

// Permet de modifier un message
exports.modifyPost = (req, res) => {
  const postObject = req.file ?
    {
      content: req.body.content,
      attachement: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

  console.log('body', req.body);
  console.log(req.params.id);

  models.Post.findOne({
    where: { id: req.params.id },
  })
    .then(postFound => {
      if (postFound) {
        models.Post.update(postObject, {
          where: { id: req.params.id }
        })
          .then(post => res.status(200).json({ message: 'Votre message a bien été modifié !', content: req.body.content }))
          .catch(error => res.status(400).json({ error: '⚠ Oops, message non modifié ! ' + error }))
      }
      else {
        res.status(404).json({ error: '⚠ Oops, Message non trouvé' });
      }
    })
    .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur 500 !' }));
}

// Permet de supprimer un message
exports.deletePost = (req, res) => {
  models.Post.findOne({
    attributes: ['id'],
    where: { id: req.params.id }
  })
    .then(post => {
      if (post) {
        if (post.attachement != null) {
          const filename = post.attachement.split('/images/')[1];

          fs.unlink(`images/${filename}`, () => {
            models.Post.destroy({
              where: { id: req.params.id }
            })
              .then(() => res.status(200).json({ message: 'Votre message avec image a été supprimé' }))
              .catch(() => res.status(500).json({ error: '⚠ Oops, impossible de supprimé votre message avec image !' }));
          })
        } else {
          models.Post.destroy({
            where: { id: req.params.id }
          })
            .then(() => res.status(200).json({ message: 'Votre message a été supprimé' }))
            .catch(() => res.status(500).json({ error: '⚠ Oops, impossible de supprimé votre message !' }));
        }
      } else {
        return res.status(404).json({ error: '⚠ Oops, Message non trouvé' })
      }
    })
    .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur 500 !' }));
}