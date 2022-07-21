const express = require("express");
const router = express.Router();

// importation des middleware 
const auth = require ("../middleware/auth.middleware");
const multer = require('../middleware/multer-config');

// importation controllers 
const postCtrl = require("../controllers/post.controller");
const likeCtrl = require('../controllers/like.controller');

// Routes de l'API pour les messages
router.post("/", auth, multer, postCtrl.createPost);
router.get("/", postCtrl.getAllPosts);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

// Requête de l'administrateur
router.delete('/admin/:id', auth, multer, postCtrl.adminDeletePost);

// Routes de l'API pour les likes
router.post('/:postId/like', auth, likeCtrl.likePost);
router.post('/:postId/dislike', auth, likeCtrl.dislikePost);

module.exports = router;