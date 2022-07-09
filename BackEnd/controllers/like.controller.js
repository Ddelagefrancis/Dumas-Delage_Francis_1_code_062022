require('dotenv').config({ path: './config/.env' });

const jwt = require("jsonwebtoken");
const models = require('../models/index');


// Permet de liker un message
exports.likePost = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    const postId = req.params.postId;

    const isliked = models.Like.findOne({
        where: { userId: userId, postId: postId },
    })

    models.Post.findOne({
        where: { id: postId },
    })
        .then(postFound => {
            if (!postFound) {
                res.status(404).json({ error: 'Le message n\'a pas été trouvé' })
            } else if (isliked) {
                models.Like.create({
                    postId: postId,
                    userId: userId
                })
                    .then(() => {
                        models.Post.update({
                            likes: postFound.likes + 1
                        }, {
                            where: { id: postId }
                        })
                            .then(() => res.status(201).json({ message: 'Vous aimez ce message !' }))
                            .catch(error => res.status(400).json({ error: '⚠ oups, message déjà liker ' }))
                    })
                    .catch(error => res.status(400).json({ error }))
            }
            else {
                console.log(error);
            }
        })
        .catch(error => res.status(400).json({ message: 'oupsi ' + error }))
}


// // Permet de disliker un message
exports.dislikePost = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    const postId = req.params.postId;

    const isliked = models.Like.findOne({
        where: { userId: userId, postId: postId },
    })

    models.Post.findOne({
        where: { id: postId },
    })
        .then(postFound => {
            if (!postFound) {
                res.status(404).json({ error: 'Le message n\'a pas été trouvé' })
            } else if (isliked) {
                models.Like.destroy({
                    where: {
                        postId: postId,
                        userId: userId
                    }
                })
                    .then(() => {
                        models.Post.update({
                            likes: postFound.likes - 1
                        }, {
                            where: { id: postId }
                        })
                            .then(() => res.status(201).json({ message: 'Vous n\'aimez plus ce message' }))
                            .catch(error => res.status(400).json({ error: '⚠ oups, message déjà liker ' }))
                    })
                    .catch(error => res.status(400).json({ error }))
            } else {
                console.log(error);
            }
        })
        .catch(error => res.status(400).json({ error: '⚠ oupsi ' + error }))
}