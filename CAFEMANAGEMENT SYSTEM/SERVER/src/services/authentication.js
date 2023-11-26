require('dotenv').config();
const jwt =require("jsonwebtoken");

const secretKey='65a124331029fecc5d3f8fd8a14eff7129a57ca8aea2f16434f7a4c9658fa8ddf9d2d8706ec9ebfabf6c2c5cc7812df2321597b540bf66f0f23848a322c2cf67';

function authenticateToken (req,res,next){
    const authHeader = req.headers['authorization'];
    // console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    // console.log(token)
    if(token == null) return res.sendStatus(401);

    jwt.verify(token,secretKey,(err,response)=>{
        // console.log(response)
        if(err) return res.sendStatus(403);
        res.locals = response;
        next()

    })
};

module.exports = { authenticateToken : authenticateToken}