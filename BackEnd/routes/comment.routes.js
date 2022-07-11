// Permet d'importer express
const express = require('express');
const router = express.Router();

// Permet d'importer le middleware auth
const auth = require('../middleware/auth.middleware');


// Permet d'importer le controller message
const commentCtrl = require('../controllers/comment.controller');


// Routes de l'API pour les messages
router.post('/:postId', auth, commentCtrl.createComment);
// router.get('/:postId', auth, commentCtrl.getAllComments);
// router.delete('/:commentId', auth, commentCtrl.deleteComment);


// Permet d'exporter le router
module.exports = router;