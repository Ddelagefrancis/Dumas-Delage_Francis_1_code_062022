
module.exports = (req, res, next) => {
      
      // Params
      let email    = req.body.email;
      let username = req.body.username;
      let password = req.body.password;
  
      if (email == '' || username == '' || password == '') {
        res.status(400).json({ message : 'Chaque case doit être renseignée !' });
      } else {
        next()
      }
    }