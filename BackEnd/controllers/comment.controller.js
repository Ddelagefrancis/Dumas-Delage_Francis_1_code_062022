const jwt = require("jsonwebtoken");
const models = require('../models/index');

// Permet de créer un nouveau commentaire
exports.createComment = (req, res, next) => {    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    const postId = req.params.postId;

    
    models.Post.findOne({
        where: { id: postId }
    })
    .then(postFound => {
        if(postFound) {
            const comment = models.Comment.build({
                content: req.body.content,
                postId: postId,
                userId: userId
            })
            comment.save()
                .then(() => res.status(201).json({ message: 'Votre commentaire a bien été créé !' }))
                .catch(error => res.status(400).json({ error: '⚠ Oops ! ' + error }));
        } else {
            return res.status(404).json({ error: 'Message non trouvé'})
        }
    })
    .catch(error => res.status(500).json({ error: '⚠ Oops ! ' + error }));
}

// Permet d'afficher tous les commentaires
exports.getAllComments = (req, res, next) => {
    models.Comment.findAll({
        order: [['updatedAt', "ASC"], ['createdAt', "ASC"]],
        where: { postId: req.params.postId },
    })
    .then(commentFound => {
        if(commentFound) {
            res.status(200).json(commentFound);
            console.log(commentFound);
        } else {
            res.status(404).json({ error: 'Aucun commentaire trouvé' });
        }
    })
    .catch(error => {
        res.status(500).send({ error: '⚠ Oops ! ' + error });
    });
}

// Permet de supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    models.Comment.findOne({
        attributes: ['id'],
        where: { id: req.params.commentId }
    })
    .then(commentFound => {
        if(commentFound) {
            models.Comment.destroy({ 
                where: { id: req.params.commentId } 
            })
            .then(() => res.status(200).json({ message: 'Votre commentaire a été supprimé' }))
            .catch(() => res.status(500).json({ error: '⚠ Oops ! ' + error }));
            
        } else {
            return res.status(404).json({ error: 'Commentaire non trouvé'})
        }
    })
    .catch(error => res.status(500).json({ error: '⚠ Oops ! ' + error }));
}

// Permet de modifier un commentaire
exports.modifyComment = (req, res) => {
    const commentObject = req.file ?
      {
        content: req.body.content,
      } : { ...req.body };
    
    models.Comment.findOne({
      where: { id: req.params.commentId },
    })
      .then(commentFound => {
        if (commentFound) {
          models.Comment.update(commentObject, {
            where: { id: req.params.commentId }
          })
            .then(comment => res.status(200).json({ message: 'Votre commentaire a bien été modifié !', content: req.body.content }))
            .catch(error => res.status(400).json({ error: '⚠ Oops, commentaire non modifié ! ' + error }))
        }
        else {
          res.status(404).json({ error: '⚠ Oops, commentaire non trouvé' });
        }
      })
      .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur 500 ! ' + error }));
  }