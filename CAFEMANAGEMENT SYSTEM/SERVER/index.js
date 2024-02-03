const fs = require("fs");
const cors=require('cors');
const bodyParser=require('body-parser');
require('dotenv').config()
// const dotenv=require('dotenv')

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
console.log(port)

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))

// const actorList= require('./src/routes/actor');

const userRoute= require('./src/routes/user');
const categoryRoute=require("./src/routes/category");
const productRoute=require("./src/routes/product");
const billRoute=require("./src/routes/bill");
const dashboard = require("./src/routes/dashboard");


app.use('/', userRoute);
app.use('/',categoryRoute);
app.use('/',productRoute);
app.use('/',billRoute);

app.use("/",dashboard)








app.use("/", (req, res) => {
  res.send("! SERVER STARTED SUCCESSFULLY");
});

app.listen(port, (err) => {
    if (err) console.log("ERROR IN SERVER SETUP")
  console.log(`Sever Running at http://localhost:${port}`);
  
});
