module.exports = (req,res,next) => {
    let validPassword = new RegExp(/^(?=.*\d).{4,8}$/);
    if (validPassword.test(req.body.password)) {
        next();
    }else{
        res.status(400).json({message : "Password invalide, il doit contenir entre 4 et 8 caractères"})
    }
}