require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const router = require("./routes/router");
const productRoute = require("./routes/productRoute")
const offerRoute = require("./routes/offerRoute")
const cors = require("cors");
const cookiParser = require("cookie-parser")
const port = 8009;


// app.get("/",(req,res)=>{
//     res.status(201).json("server created")
// });

app.use(express.json());
app.use(cookiParser());
app.use(cors());
app.use(router);
app.use(productRoute);
app.use(offerRoute);


app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})