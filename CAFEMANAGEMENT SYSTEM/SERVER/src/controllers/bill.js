require("dotenv").config();

const db = require("../db/config");
const ejs = require("ejs");
const path =require("path");
const uuid = require("uuid")
const fs = require("fs");
const { report } = require("../routes/bill");


exports.generateReport = (req,res) =>{
 let generateUuid = uuid.v1();
 let orderDetails = req.body;
 let productDetailsReport = JSON.parse(orderDetails.productDetails);

 let insertQuery=`insert into bill (name,uuid,email, contactNumber, paymentMethod, total, productDetails, createdBy) values(?,?,?,?,?,?,?,?)`;

 db.query(insertQuery,[orderDetails.name,generateUuid,orderDetails.email,orderDetails.contactNumber,orderDetails.paymentmethod,orderDetails.total,orderDetails.productDetails,orderDetails.createdBy],(err,result)=>{
    if(!err){
        ejs.renderFile(path.join(__dirname,"","report.ejs"),{})
    }
    else{
        res.status(500).json(err)
    }
 })


}