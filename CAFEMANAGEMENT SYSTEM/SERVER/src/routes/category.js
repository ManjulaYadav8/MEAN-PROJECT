const express=require("express");

const router=express.Router();
const auth=require("../services/authentication");
const checkRole=require("../services/checkRole");


const { addCategory, getCategory, updateCategory} = require("../controllers/category");

router.post('/addCategory',auth.authenticateToken,checkRole.checkRole,addCategory);
router.get('/getCategory',auth.authenticateToken,getCategory);
router.put("/updateCategory",auth.authenticateToken,checkRole.checkRole,updateCategory)





module.exports=router;