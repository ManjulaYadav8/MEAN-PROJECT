require("dotenv").config();

const db=require("../db/config");

exports.addCategory = (req,res) =>{

    let category =req.body;

    let insertQuery = 'insert into category(name) values(?)';

    db.query(insertQuery,[category.name],(err,result)=>{
        if(!err){
            return res.status(200).json({message:"Category Added Sucessfully"})
        }else{
            return res.status(500).json(err)
        }
    })

}

exports.getCategory = (req,res) =>{

    let query='select * from category order by name';

    db.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result)
        }
        else{
            return res.status(500).json(err)
        }
    })
}

exports.updateCategory = (req,res) => {

    let product = req.body;

    let updateQuery = 'update category set name=? where id=?';

    db.query(updateQuery,[product.name,product.id],(err,result)=>{
        // console.log(result);
        if(!err){
            if(result.affectedRows==0){
                return res.status(404).json({message:'Category id does not found'})
            }
            else{
                return res.status(200).json({message:"Category  Updated Successfully"})
            }

        }
        else{
            return res.status(500).json(err)
        }

    })

}