const express=require('express')
const mongoose=require('mongoose')
const pro_model=require('./models/product.model')

const app=express() 
app.use(express.json())
const db_url='mongodb://localhost/crud'

app.listen(8000,()=>{
    console.log('Running on the port 8000')
})

app.get('/',(req,res)=>{
    res.send('Hello from node api updated')
})

app.post('/api/products',async(req,res)=>{
    try{
        const product=await pro_model.create(req.body)
        return res.status(200).json(product)
    }
    catch(err){
        res.status(500).send({
            message: err.message
        })
    }
})

app.get('/api/products',async(req,res)=>{
    try{
        const products= await pro_model.find({})
        res.status(200).json(products)
    }
    catch(err){
        res.status(500).json({message:err.message })
    }
})

app.get('/api/product/:id',async(req,res)=>{
    try{
        const {id}= req.params
        const product=await pro_model.findById(id)
        return res.status(200).json(product)

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

// update product
app.put('/api/product/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const product=await pro_model.findByIdAndUpdate(id,req.body)
        if(!product){
            return res.status(404).json({message:"Product doesnt exist"})
        }
        const updatedProduct=await pro_model.findById(id)
        res.status(200).json(updatedProduct)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

// delete
app.delete('/api/product/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const del_prod=await pro_model.findByIdAndDelete(id)

        if(!del_prod){
            res.status(404).json({message:"Product not found"})
        }
        res.status(200).json({message:"Product deleted successfullty"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

mongoose.connect(db_url)
const db=mongoose.connection

db.on('error',()=>{
    console.log('Error in connecting to DB')
})

db.on('open',()=>{
    console.log('Server connected to DB')
})