const express=require("express");

const router=express.Router();
const auth=require("../services/authentication");
const checkRole=require("../services/checkRole");

const { addProduct,getProducts, getProductByCategoryId, getProductById, updateProduct, deleteProduct, updateProductStatus }= require("../controllers/product");

router.post("/addProduct",auth.authenticateToken,checkRole.checkRole,addProduct);
router.get("/getProducts",auth.authenticateToken,getProducts);
router.get("/getProductByCategoryId/:id",auth.authenticateToken,getProductByCategoryId);
router.get("/getProductById/:id",auth.authenticateToken,getProductById);
router.put("/updateProduct",auth.authenticateToken,checkRole.checkRole,updateProduct);
router.delete("/deleteProduct/:id",auth.authenticateToken,checkRole.checkRole,deleteProduct);
router.put("/updateProductStatus",auth.authenticateToken,checkRole.checkRole,updateProductStatus)


module.exports = router;