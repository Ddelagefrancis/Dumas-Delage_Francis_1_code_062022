require('dotenv').config({ path: './config/.env' });

const jwt = require("jsonwebtoken");
const models = require('../models/index');


// Permet de liker un message
exports.likePost = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    const postId = req.params.postId;

    models.Like.findOne({
        where: { userId: userId, postId: postId },
    }).then(likeFound => {

        models.Post.findOne({
            where: { id: postId },
        })
            .then(postFound => {
                if (postFound == null) {
                    res.status(404).json({ error: 'Le message n\'a pas été trouvé' })
                } else {
                    if (likeFound == null) {
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
                                    .catch(error => res.status(400).json({ message: '⚠ oups ' + error }))
                            })
                            .catch(error => res.status(400).json({ message: '⚠ oups ' + error }))
                    } else {
                        res.status(404).json({ error: '⚠ oups, message déjà liker ' })
                    }
                }

            })
            .catch(error => res.status(400).json({ message: '⚠ oups ' + error }))
    })
}

// // Permet de disliker un message
exports.dislikePost = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    const postId = req.params.postId;

    models.Like.findOne({
        where: { userId: userId, postId: postId },
    }).then(likeFound => {

        models.Post.findOne({
            where: { id: postId },
        })
            .then(postFound => {
                if (postFound == null) {
                    res.status(404).json({ error: 'Le message n\'a pas été trouvé' })
                } else {
                    if (likeFound) {
                        models.Like.destroy({
                            where: { userId: userId, postId: postId },
                        })
                            .then(() => {
                                models.Post.update({
                                    likes: postFound.likes - 1
                                }, {
                                    where: { id: postId }
                                })
                                    .then(() => res.status(201).json({ message: 'Vous n\'aimez plus ce message !' }))
                                    .catch(error => res.status(400).json({ message: '⚠ oups ' + error }))
                            })
                            .catch(error => res.status(400).json({ message: '⚠ oups ' + error }))
                    } else {
                        res.status(404).json({ error: '⚠ oups, message déjà disliker ' })
                    }
                }

            })
            .catch(error => res.status(400).json({ message: '⚠ oups ' + error }))
    })
}