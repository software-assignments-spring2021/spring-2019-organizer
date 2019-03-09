/*
    This is the back end program
*/
//dependencies
const express = require('express');
const path = require('path');

//set up app
const app = express();
const publicPath = path.resolve(__dirname,
    'public');
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//run the server
app.listen(3000, 'localhost');