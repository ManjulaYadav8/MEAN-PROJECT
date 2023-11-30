const express=require('express');
const router = express.Router();

const auth = require ("../services/authentication");


const { generateReport } = require("../controllers/bill");

router.post("/generateBill",auth.authenticateToken,generateReport)


module.exports=router;