const express= require('express');
const router=express.Router();

const auth=require("../services/authentication");
const checkRole=require("../services/checkRole");

const { getDetails } = require('../controllers/dashboard');

router.get('/details',auth.authenticateToken, getDetails)


module.exports=router;