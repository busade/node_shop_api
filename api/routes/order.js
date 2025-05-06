const express = require("express");
const route = express.Router();



route.get ('/', (req,res,next)=>{
    res.status(200).json({
        message: "Orders were fetched"
    });
});

route.post ('/', (req,res,next)=>{
    const order ={
        productId : req.body.productId,
        quantity : req.body.quantity
    };
    res.status(201).json({
        message: "Orders was created",
        order : order
    });
});

route.get ('/:orderid', (req,res,next)=>{
    res.status(200).json({
        message: "Orders Details",
        Orderid : req.params.orderid
    });
});

route.patch ('/:orderid', (req,res,next)=>{
    res.status(201).json({
        message: "Orders was created",
        orderid: req.params.orderid
    });
});
route.delete ('/:orderid', (req,res,next)=>{
    res.status(200).json({
        message: "Order was deleted",
        Orderid: req.params.orderid
    });
});
module.exports = route;