const express=require("express");
const router=express.Router();
const {addIncome,getIncome,updatedIncome,deleteIncome}=require("../controllers/incomeHandler");
const { addExpense, getExpense, updateExpense, deleteExpense } = require("../controllers/expensesHandler");

router.post("/add-income",addIncome);
router.get("/get-income",getIncome);
router.put("/update-income/:id",updatedIncome);
router.delete("/delete-income/:id",deleteIncome);

router.post("/add-expense",addExpense);
router.get("/get-expense",getExpense);
router.put("/update-expense/:id",updateExpense);
router.delete("/delete-expense/:id",deleteExpense);

module.exports=router;