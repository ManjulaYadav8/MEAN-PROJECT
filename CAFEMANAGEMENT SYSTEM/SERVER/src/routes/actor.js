const express =require('express');
const router=express.Router();

const { getActors } = require('../controllers/actor.js')

router.get('/getActors', getActors);

module.exports=router