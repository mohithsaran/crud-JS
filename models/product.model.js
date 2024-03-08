const mongoose=require('mongoose')

const prod_schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true,
        default:1
    },
    price:{
        type:String,
        required:true,
        default:0
    }
},{
    timestamps:true,
    versionkey:false
})

const product=mongoose.model('product',prod_schema)
module.exports=product