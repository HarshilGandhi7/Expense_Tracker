const express=require("express");
const mongoose=require("mongoose");
const Income = require("../models/Income");

//creating a new income CORRECTLY WORKING
exports.addIncome=async(req,res)=>{
    const {title,amount,date,category,description}=req.body;
    if(!title || !amount || !date || !category || !description){
        return res.status(400).json({error:"All fields are required"});
    }
    if(amount<0){
        return res.status(400).json({error:"Amount should be greater than 0"});
    }
    try{
        const newIncome=new Income({
            title,
            amount,
            date,
            category,
            description,
        })
        await newIncome.save();
        console.log(newIncome);
        return res.status(200).json({message:"Income Created Successfully"});
    }catch(err){
        console.log("error in Creating Income");
        return res.status(500).json({error:"Internal Server Error"});
    }
}

//sort according to last used income and getting all incomes CORRECTLY WORKING
exports.getIncome=async(req,res)=>{
    try{
        const incomes=await Income.find().sort({updatedAt:-1});
        return res.status(200).json({incomes});
    }catch(err){
        console.log("error in gettting all incomes ");
        return res.status(500).json({error:"Internal Server Error"});
    }
}

//updating a income WORKING SUCCESSFULLY
exports.updatedIncome = async (req, res) => {
    let { id } = req.params;
    id = id.replace(/^:/, '');
    console.log(id);
    const { title, amount, date, category, description } = req.body;
    if(!title || !amount || !date || !category || !description){
        return res.status(400).json({error:"All fields are required"});
    }
    if(amount<0){
        return res.status(400).json({error:"Amount should be greater than 0"});
    }

    try {
        // Ensure that the id is a valid ObjectId before proceeding
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        // Find the income by id and update
        const incomeToBeUpdated = await Income.findByIdAndUpdate(
            id,
            {
                title,
                amount,
                date,
                category,
                description,
            },
            { new: true } 
        );

        if (!incomeToBeUpdated) {
            return res.status(404).json({ error: "No Income Found" });
        }

        return res.status(200).json({ message: "Income Updated Successfully", income: incomeToBeUpdated });
    } catch (err) {
        console.error("Error updating income:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


//deleting a income WORKING SUCCESSFULLY
exports.deleteIncome=async(req,res)=>{
    let {id}=req.params;
    id = id.replace(/^:/, '');
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error:"Invalid ID format"});
        }
        const incomeToBeDeleted=await Income.findByIdAndDelete(id);
        if(!incomeToBeDeleted){
            return res.status(400).json({error:"No Income Found"});
        }
        return res.status(200).json({message:"Income Deleted Successfully"});
    }catch(err){
        console.error("Error deleting income:",err);
        return res.status(500).json({error:"Internal Server Error"});
    }
}

