const  mysql=require('mysql2');
require("dotenv").config();

const env=process.env;

const connection = mysql.createConnection({
    host:env.DB_HOST,
    port:env.DB_PORT,
    database:env.DB_NAME,
    user:env.DB_USER,
    password:env.DB_PASSWORD,
  
});

// const connection = mysql.createConnection({
//     database:'cafemanagement',
//     host:'localhost',
//     port:'3306',
//     user:'root',
//     password:'Manu@1234567',
  
// });
// console.log(env.DB_PORT)

connection.connect((err)=>{
    if(err) throw err;
    console.log('DB Connected');
    


})

module.exports=connection