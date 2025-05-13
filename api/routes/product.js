const express = require('express');
const route = express.Router();
const mongoose = require("mongoose")
const productModel = require("../models/product");


// get all products
route.get('/',(req, res, next)=>{
    productModel.find()
    .exec()
    .then(docs=>{
        console.log(docs);
        res.status(200).json(docs);

    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(docs);
    });
    
});


// create a new product 
route.post('/',(req, res, next)=>{
    const product = new productModel( {
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then(result=>{
        console.log(result);
    })
    .catch(err => console.log(err))
    res.status(200).json({
        message: "Handling POST request to /products",
        createdProduct: product

    });
});


// get by product by ID
route.get('/:productId',(req, res, next)=>{
    const id = req.params.productId;
    productModel.findById(id)
    .exec()
    .then(doc =>{
        console.log(doc);
        // if (doc.lenght >= 0){
            res.status(200).json({doc})
        // }else{
            // res.status(404).json({
                // message: "No Entry found"
            // })
        // }
    })
    .catch(err=> {console.log(err)});

});


// edit product by ID
route.patch('/:productId', (req,res,next)=>{
    const id = req.params.productId
    const updateOps = {};
    for (const ops  of req.body){
        updateOps[ops.propName]= ops.value
    }
    productModel.update({_id:id},{$set: updateOps}).exec()
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({error:err});
    })
    
});

// delete Product by id
route.delete('/:productId', (req,res,next)=>{
    const id = req.params.productId
    productModel.deleteOne({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
});
module.exports= route