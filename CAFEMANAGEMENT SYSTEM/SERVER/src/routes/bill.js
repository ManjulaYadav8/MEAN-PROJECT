const express=require('express');
const router = express.Router();

const auth = require ("../services/authentication");


const { generateReport, getPdf, getBills,deleteBillById } = require("../controllers/bill");

router.post("/generateReport",auth.authenticateToken,generateReport);
router.post("/getPdf",auth.authenticateToken,getPdf);
router.get('/getBills', auth.authenticateToken,getBills);
router.delete('/deleteBill/:id', auth.authenticateToken,deleteBillById)


module.exports=router;