const db = require('../db/config');


exports.getDetails = (req,res,next) =>{

    let categoryCount;
    let productCount;
    let billCount;

    let countCategoryQuery= `select count(id) as categoryCount from category`;
    let countProductQuery =`select count(id) as productCount from product`;
    let countBillQuery =`select count(id) as billCount from bill`;


    db.query(countCategoryQuery,(err,result)=>{
        if(!err){
            console.log("category count result==>",result);

            categoryCount=result[0].categoryCount;

            // return res.status(200).json(result);

        }else{
            return res.status(500).json(err)
        }
    });

    db.query(countProductQuery,(err,result)=>{
        if(!err){
            console.log("product count result==>",result);

            productCount=result[0].productCount;

            // return res.status(200).json(result);

        }else{
            return res.status(500).json(err)
        }
    });

    db.query(countBillQuery,(err,result)=>{
        if(!err){
            console.log("Bill count result==>",result);

            billCount=result[0].billCount;

            let data ={
                category:categoryCount,
                product:productCount,
                bill:billCount
            }

            return res.status(200).json(data);

        }else{
            return res.status(500).json(err)
        }
    })

    



}