
// checking role if created user by admin 


require('dotenv').config();

// const user = process.env.USER;
const user = 'user';

function checkRole(req,res,next){
    // console.log("res.locals-->",res.locals)

    if(res.locals.role == user){
        res.sendStatus(401)
    }
    else{
        next()
    }

}

module.exports = { checkRole : checkRole}