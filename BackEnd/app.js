const express = require('express');
const helmet = require("helmet");

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

const app = express();

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//Security & data
app.use(express.json());
app.use(helmet());

//Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;