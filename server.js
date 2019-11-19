'use strict'
require('dotenv').config();
const express =require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const server = express();

server.get ('/location',(req,res) =>{
    res.status(200).send('Iam alive .')
})
server.use ('*',(req,res)=>{
    res.status(404).send('huh??')
})
server.listen(PORT ,() => console.log ('Hi world, from port',PORT));