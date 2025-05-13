const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const productRoutes =  require('./api/routes/product')
const OrderRoutes = require("./api/routes/order")


mongoose.connect(
    "mongodb+srv://busade:"+process.env.MONGO_ATLAS_PW +
    "@cluster0.xwb0u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    
).then(()=> console.log("MongoDB connected")) 
.catch(err=> console.logg("MongoDB connection error: ", err));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use ((req,res,next) =>{
    res.header("Access-Control-Allow-Origin",'*');
    res.header(
        "Access-Control-Headers",
        "Origin, X-Requested-with, Content-Type, Accept,Authorization"  
    );
    if (req.method ==="OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE")
        return status(200).json({});
    }
    next();
});

app.use('/products',productRoutes);
app.use('/order', OrderRoutes);

app.use((req,res,next)=>{
    const error = new Error("Not Found");
    error.status=404;
    next(error)
});

app.use((error,req,res,next)=>{
    res.status(error.status ||500);
    res.json({
        message:error.message
    });
});
module.exports=app;