const express = require("express");
const router = express.Router();

// importation des middleware 
const registrer = require ("../middleware/signup.middleware");
const pseudo = require('../middleware/username.middleware');
const email = require ("../middleware/email.middleware");
const password = require ("../middleware/password.middleware");
const connexion = require('../middleware/limit.middleware');

// importation controllers 
const userCtrl = require("../controllers/user.controller");

router.post("/signup", registrer, pseudo, email, password, userCtrl.signup);
router.post("/login", connexion, userCtrl.login);

module.exports = router;