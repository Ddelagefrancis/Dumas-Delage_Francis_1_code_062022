module.exports = (req, res, next) => {

    // Params
    let username = req.body.username;

    if (username.length >= 13 || username.length <= 4) {
        res.status(400).json({ message: 'erreur pseudo (il doit être compris entre 5 - 12 caractères)' });
    } else {
        next()
    }
}