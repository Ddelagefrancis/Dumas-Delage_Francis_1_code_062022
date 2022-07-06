const express = require("express");
const router = express.Router();

// importation des middleware 
const auth = require ("../middleware/auth.middleware");
// const multer = require('../middleware/multer-config');

// importation controllers 
const postCtrl = require("../controllers/post.controller");


router.post("/", auth, postCtrl.createPost);
router.get("/", postCtrl.getAllPosts);
router.put('/:id', auth, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;