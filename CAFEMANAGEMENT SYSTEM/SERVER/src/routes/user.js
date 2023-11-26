const express=require('express');
const router = express.Router();

const auth = require ("../services/authentication");
const checkRole = require ("../services/checkRole");

const { signup,login, forgotPassword, getUsers, updateStatus, checkToken,  changePassword}=require('../controllers/user')

router.post('/signup', signup);
router.post('/login',login);
router.post('/forgotPassword',forgotPassword);

router.get('/getUsers', auth.authenticateToken, checkRole.checkRole,getUsers); // admin can only access the get User api
router.put("/updateStatus",auth.authenticateToken, checkRole.checkRole, updateStatus);// admin can only update the users status
router.get('/checkToken',auth.authenticateToken, checkToken);
router.post('/changePassword',auth.authenticateToken,changePassword)

module.exports=router;