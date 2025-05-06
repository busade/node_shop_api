const express = require('express')
const route = express.Router()


route.get('/',(req, res, next)=>{
    
    res.status(200).json({
        message: "Handling GET requuest to /products"
    });
});

route.post('/',(req, res, next)=>{
    const product ={
        name:req.body.name,
        price: req.body.price
    };
    res.status(200).json({
        message: "Handling POST requuest to /products",
        createdProduct: product

    });
});

route.get('/:productId',(req, res, next)=>{
    const id = req.params.productId;
    if (id==='special'){
        res.status(200).json({
            message: "You discovered  the special ID",
            id: id
        });
        
    }
    else{
        res.status(200).json({
            message: "you passed an id"
        });

    }
});

route.patch('/:productId', (req,res,next)=>{
    res.status(200).json({
        message:"Updated product !"
    });
});

route.delete('/:productId', (req,res,next)=>{
    res.status(200).json({
        message:"Deleted product !"
    });
});
module.exports= route