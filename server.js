//  Require 
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// initializes a server that will be ready 
//to receive incoming requests once the database connection is established.
db.once('open', () => {
   app.listen(PORT, () => {
     console.log(`API server running on port ${PORT}!`);
   });
 }); 
 
 
 // how to run it 
    //npm i, npm run seed, npm start
    // go to insonmia 
