require("dotenv").config();

const db = require("../db/config");
const ejs = require("ejs");
const path =require("path");
const uuid = require("uuid");
const puppeteer = require('puppeteer');
const fs = require("fs");




exports.generateReport = (req,res) =>{
 let generateUuid = uuid.v1();
 let orderDetails = req.body;
 let productDetailsReport = JSON.parse(orderDetails.productDetails);
// let productDetailsReport = JSON.stringify(orderDetails.productDetails);

 let insertQuery=`insert into bill (name,uuid,email, contactNumber, paymentMethod, total, productDetails, createdBy) values(?,?,?,?,?,?,?,?)`;

 db.query(insertQuery,[orderDetails.name,generateUuid,orderDetails.email,orderDetails.contactNumber,orderDetails.paymentMethod,orderDetails.totalAmount,orderDetails.productDetails,orderDetails.createdBy],(err,result)=>{
    if(!err){
        let payload={
            productDetails:productDetailsReport,
            name:orderDetails.name,
            email:orderDetails.email,
            contactNumber:orderDetails.contactNumber,
            paymentMethod:orderDetails.paymentMethod,
            totalAmount:orderDetails.totalAmount

        }
        const filepath=path.join(__dirname,"report.ejs")
        ejs.renderFile(filepath,payload,(err,html)=>{
            if(err){
               return res.status(500).json(err)
            }
            else{
                // res.status(200).json({file:result});
                 (async () => {
                    const browser = await puppeteer.launch({headless: false});
                   
                    const page = await browser.newPage();
                    // const page = await browser.pages();
                   
                    await page.setContent(html);
                   
                    const pdf= await page.pdf({ format: 'A4' });
                    res.contentType("application/pdf");
                   
                   
                    await browser.close();
                    
                    return res.send(pdf)
                   
                    
                    // fs.writeFile(`.src/generated_pdf/${generateUuid}.pdf`, pdf,(err) => {
                    //     if(err){
                    //         return res.status(500).json(err)
                    //     }
                        
                    //       return res.status(200).json({uuid:generateUuid})       
                        
                    // });
                    // return res.send(pdf)
                   
                    // console.log('Here');
                   
            
            })().catch((err)=>{
                    console.log(err)
                   })
            }
        })
    }
    else{
        res.status(500).json(err)
    }
 })


}

exports.getPdf = (req,res) =>{

    const orderDetails = req.body;

    // const pdfPath="",

}

