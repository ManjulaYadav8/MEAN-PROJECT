require('dotenv').config();


const db = require("../db/config");
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');

// const auth = require ("../services/authentication");
// const checkRole = require ("../services/checkRole");


const secretKey=process.env.ACCESS_TOKEN
const email=process.env.EMAIL;
const password=process.env.PASSWORD;
// console.log(password)


// const secretKey='65a124331029fecc5d3f8fd8a14eff7129a57ca8aea2f16434f7a4c9658fa8ddf9d2d8706ec9ebfabf6c2c5cc7812df2321597b540bf66f0f23848a322c2cf67';
// const email='manjulamanu877@gmail.com';
// const password='gdur dldl grcz nbof'; // generated from less secure app password on google account



let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:email,
        pass:password
    }

})


exports.signup = (req, res) => {
  let user = req.body;
  console.log("signup body-->",user)
  let query = "select email,password,role,status from user where email=?";
  db.query(query, [user.email], (err, result) => {
    console.log(result)
    if (!err) {
      if (result.length <= 0) {
        let inserQuery =
          "insert into user (name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
        db.query(
            inserQuery,
          [user.name, user.contactNumber, user.email, user.password],
          (err, result) => {
            if (!err) {
              return res.status(200).json({
                message: "Successfully Registered",
              });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res.status(400).json({
          message: "Email Already Exist",
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
};

exports.login = (req, res) => {
  let user = req.body;
  let query = "select email,password,status,role from user where email=?";

  db.query(query, [user.email], (err, result) => {
    console.log(result)
    if (!err) {

      if (result.length <= 0 || result[0].password != user.password) {
        return res.status(401).json({
          message: "Incorrect username or password",
        });
      } 
      else if (result[0].status === "false") {
        return res.status(401).json({
          message: "Wait for Admin approval",
        });
      }
      else if(result[0].password==user.password ){
        const response={
            email:result[0].email,
            role:result[0].role,
         }
        const accessToken=jwt.sign(response,secretKey,{expiresIn:'8h'});
        res.status(200).json({
            token:accessToken
        })

      }
      else{
        return res.status(400).json({
            meassage:"Something went wrong. Please try again later"
        })
      }
    } else {
      return res.status(500).json(err);
    }
  });
};

exports.forgotPassword =(req,res)=>{
    let user = req.body;
    console.log(user)

    let query = 'select email,password from user where email=?';

    db.query(query,[user.email],(err,result)=>{
        console.log(result)
        if(!err){
            if(result.length<=0){
                return res.status(200).json({
                    message:"Password sent successfully to your email"
                })
            }
            else{
                 let mailOptions={
                    from:email,
                    to:result[0].email,
                    subject:'Password by Cafemangement System',
                    html:'<p><b>Your Login details for cafemangement systen</b><br><b>Eamil: </b>'+result[0].email+'<br><b>Password: </b>'+result[0].password+'<br><a href="http://localhost:4200">Click here to Login</a></p>'
                 }
                 console.log(mailOptions)

                 transporter.sendMail(mailOptions,(err,info)=>{
                    if(err){
                        
                        console.log(err)
                    }
                    else{
                        console.log("Email sent :", info.response)
                    }
                 })

                 return res.status(200).json({
                    message:"Password sent successfully to your email"
                })
            }
        }
        else{
            return res.status(500).json(err)
        }
    })
};

exports.getUsers = (req,res) =>{

  let query='select id,name,email,contactNumber,status from user where role="user"';

  db.query(query,(err,result)=>{
    if(!err){
      return res.status(200).json(result)
    }
    else{
      return res.status(500).json(err)
    }
  })

};

exports.updateStatus = (req,res)=>{

  let user=req.body;

  let query='update user set status=? where id=?';

  db.query(query,[user.status,user.id],(err,result)=>{
    console.log(result)
    if(!err){
      if(result.affectedRows==0){
        return res.status(404).json({
          message:"user id does not exist",
        })
      }
      else{
        return res.status(200).json({
          message:"User Updated Sucessfully"
        })
      }
    }
    else{
      return res.status(500).json(err);
    }
  })

};

exports.checkToken = (req,res) =>{

  return res.status(200).json({message:"true"})

};

exports.changePassword = (req,res) =>{
  let user=req.body;
  let email = res.locals.email;

  let query = 'select * from user where email=? and password=?';

  db.query(query,[email,user.oldPassword],(err,result)=>{
    if(!err){
      if(result.length<=0){
        return res.status(400).json({
          message :"Incorrect Password"
        })
      }
      else if(result[0].password == user.oldPassword){

        let updateQuery= `update user set password= ? where email=?`;

        db.query(updateQuery,[user.newPassword,email],(err,result)=>{
          if(!err){
            return res.status(200).json({
              message:"Password Updated Successfully"
            })
          }
          else{
            return res.status(500).json(err);
          }
        })

      }
      else{
        return res.status(400).json({
          message:"Something went wrong. Please try again later."
        })
      }


    }else{
      return req.status(500).json(err);
    }
  })

}



