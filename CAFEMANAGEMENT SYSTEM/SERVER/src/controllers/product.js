require("dotenv").config();


const db = require("../db/config");


exports.addProduct = (req,res) => {

    let product = req.body;

    let insertQuery = 'insert into product (name, categoryId,description,price,status) values(?,?,?,?,"true")';

    db.query(insertQuery,[product.name,product.categoryId,product.description,product.price],(err,result)=>{

        if(!err){
            return res.status(200).json({message:"Product Added Successfully."})

        }else{
            return res.status(500).json(err)
        }

    })

}

exports.getProducts = (req,res) => {

    //inner join of product and category table
    
    let query = `select p.id,p.name,p.description,p.status,p.price,c.id as categoryId,c.name as categoryName 
                    from product as p inner join category as c where p.categoryId=c.id`;
    db.query(query,(err,result) =>{
        if(!err){
            return res.status(200).json(result);
        }
        else{
            return res.status(500).json(err);
        }
    })

}

exports.getProductByCategoryId = (req,res) => {
    let id=req.params.id;
    let query= `select id,name,categoryId from product where categoryId=? and status='true' `; // It will return only active products;
    db.query(query,[id],(err,result) => {
        if(!err){
            return res.status(200).json(result)
        }else{
            return res.status(500).json(err)
        }
    })

}

exports.getProductById = (req,res) =>{

    let id = req.params.id;

    let query= 'select id,name,description,price from product where id = ?';

    db.query(query,[id],(err,result) => {
        if(!err){
            return res.status(200).json(result)
        }
        else{
            return res.status(500).json(err);
        }
    })

}

exports.updateProduct = (req,res) => {

    let product = req.body;

    let updateQuery = `update product set name=?, categoryId=?, description=?,price=? where id = ?`;

    db.query(updateQuery,[product.name,product.categoryId,product.description,product.price,product.id],(err,result)=>{

        if(!err){
            if(result.affectedRows==0){
                return res.status(404).json({message:"Product id does not exist"})
            }
            else {
                return res.status(200).json({message:"Product Updated Successfully"})
            }
            

        }else{
            return res.status(500).json(err);
        }

    })

}

exports.deleteProduct = (req,res) =>{
    let id = req.params.id;

    let deleteQuery = `delete from product where id = ?`;

    db.query(deleteQuery,[id],(err,result) => {
        if(!err){
            if(result.affectedRows==0){
                return res.status(404).json({message:"Product id does not exist"})
            }
            else {
                return res.status(200).json({message:"Product Deleted Successfully"})
            }

        }else{
            return res.status(500).json(err)
        }
    })
} 


exports.updateProductStatus = (req,res) =>{
  let product=req.body;

  let updateQuery= `update product set status = ? where id = ?`;

  db.query(updateQuery,[product.status,product.id],(err,result) => {
    if(!err){
        if(result.affectedRows==0){
            return res.status(404).json({message:"Product id does not exist"})
        }
        else {
            return res.status(200).json({message:"Product Status Updated Successfully"})
        }
    }else{
        return res.status(500).json(err);
    }

  })
}
