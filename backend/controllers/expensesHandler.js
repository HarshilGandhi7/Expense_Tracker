const express=require("express");
const mongoose=require("mongoose");
const Expense=require("../models/Expenses");

//creating a new Expense WORKING Successfully
exports.addExpense=async(req,res)=>{
    const {title,amount,date,category,description}=req.body;
    if(!title || !amount || !date || !category || !description){
        return res.status(400).json({error:"All fields are required"});
    }
    if(amount<0){
        return res.status(400).json({error:"Amount should be greater than 0"});
    }
    try{
        const newExpense=new Expense({
            title,
            amount,
            date,
            category,
            description,
        })
        await newExpense.save();
        return res.status(200).json({message:"Expense Created Successfully"});
    }catch(err){
        console.log("error in Creating Expense");
        return res.status(500).json({error:"Internal Server Error"});
    }
}

//sort according to last used Expense and getting all Expense WORKING Successfully
exports.getExpense=async(req,res)=>{
    try{
        const expenses=await Expense.find().sort({updatedAt:-1});
        return res.status(200).json({expenses});
    }catch(err){
        console.log(err);
        console.log("error in gettting all Expenses");
        return res.status(500).json({error:"Internal Server Error"});
    }
}

//updating a expenses WORKING Successfully
exports.updateExpense = async (req, res) => {
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

        // Find the expenses by id and update
        const expenseToBeUpdated = await Expense.findByIdAndUpdate(
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

        if (!expenseToBeUpdated) {
            return res.status(404).json({ error: "No Expense Found" });
        }

        return res.status(200).json({ message: "Expense Updated Successfully", expense: expenseToBeUpdated });
    } catch (err) {
        console.error("Error updating Expense:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


//deleting a expense WORKING Successfully
exports.deleteExpense=async(req,res)=>{
    let {id}=req.params;
    id = id.replace(/^:/, '');
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error:"Invalid ID format"});
        }
        const expesneToBeDeleted=await Expense.findByIdAndDelete(id);
        if(!expesneToBeDeleted){
            return res.status(400).json({error:"No Expense Found"});
        }
        return res.status(200).json({message:"Expense Deleted Successfully"});
    }catch(err){
        console.error("Error deleting Expense:",err);
        return res.status(500).json({error:"Internal Server Error"});
    }
}

