const fs= require('fs');
const mongoose = require('mongoose')
const model= require('../model/product')
const Product= model.Product;
//const index= fs.readFileSync('index.html','utf-8');
// const data= JSON.parse(fs.readFileSync('data.json','utf-8'));
// const products= data.products;

exports.createProduct= (req,res)=>{
    const product= new Product(req.body);



    // product.save((err,doc)=>{
    //     console.log({err,doc})
    // })
    // // product.save()
    // res.status(201).json(req.body)
    product.save()
    .then(doc => {
        res.status(201).json(doc);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
}

exports.getAllProducts= async(req,res)=>{
    const products= await Product.find({price:{$gt:500}});
    res.json(products)
}

exports.getProduct= async(req,res)=>{
    // console.log(req.params.id);
    const id= req.params.id // + is added to take id in number
    const products= await Product.findById(id);
    res.json(products)
}
exports.replaceProduct=async(req,res)=>{
    // console.log(req.params.id);
    const id= req.params.id;
    try{
        const doc= await Product.findOneAndReplace({_id: id},req.body,{new:true})
        //findOneAndReplace(key, replacement, options)
        
        res.status(201).json(doc)
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }

}
exports.updateProduct=async(req,res)=>{
    // console.log(req.params.id);
    const id= req.params.id;
    try{
        const doc= await Product.findOneAndUpdate({_id: id},req.body,{new:true})
        //findOneAndReplace(key, replacement, options)
        
        res.status(201).json(doc)
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}
exports.deleteProduct= async(req,res)=>{
    // console.log(req.params.id);
    const id= req.params.id;
    try{
        const doc= await Product.findOneAndDelete({_id: id})
        //findOneAndReplace(key, replacement, options)
        
        res.status(201).json(doc)
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}