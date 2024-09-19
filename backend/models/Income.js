const mongoose=require("mongoose");

const IncomeSchema=new mongoose.Schema({      
    title:{
        type:String,
        required:true,
        trim:true,
        maxLength:50,
    },
    amount:{
        type:Number, 
        required:true,
        trim:true,
    },
    date:{
        type:Date,
        required:true,
    },
    category:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxLength:100,
    }
},{ timestamps: true })

module.exports=mongoose.model("Income",IncomeSchema);