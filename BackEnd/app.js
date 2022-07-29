const express = require('express');
const helmet = require("helmet");
const path = require('path');
const fs = require('fs');
const cors = require('cors')

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');

const app = express();

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cors())

//Security & data
app.use(express.json());
app.use(helmet());

// Création du dossier ./images s'il n'existe pas :
fs.access('./images', fs.constants.F_OK, (error) => {
    if (error) {
      fs.mkdir('./images', (error) => {
        if (error) {
          throw error;
        } else {
          console.log('Création du dossier ./images.');
        }
      });
    }
  });

//Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;