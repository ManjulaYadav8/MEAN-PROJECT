const express=require('express');
const router = express.Router();

const auth = require ("../services/authentication");


const { generateReport, getPdf } = require("../controllers/bill");

router.post("/generateReport",auth.authenticateToken,generateReport);
router.post("/getPdf",auth.authenticateToken,getPdf)


module.exports=router;