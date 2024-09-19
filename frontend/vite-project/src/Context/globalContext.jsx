import React, { createContext, useContext, useState } from "react";
import axios from 'axios';


const GlobalContext = createContext(); 
const BASE_URL = 'http://localhost:5000/ap1/v1/'; 

export const GlobalProvider = ({ children }) => {
    const [Incomes, setIncomes] = useState([]);
    const [Expenses, setExpenses] = useState([]);
    const [Error, setError] = useState(null);
    const [History, setHistory] = useState([]);
    
   
    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}add-income`,income);
        } catch (err) {
            console.error('Error adding income:', err);
            setError(err.response?.data?.message || 'An error occurred');
        }
        getIncome();
    };
   
    const getIncome = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-income`);
            setIncomes(response.data);
            transactionHistory();
        } catch (err) {
            console.error('Error getting income:', err);
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`);
            getIncome();
        } catch (err) {
            console.error('Error deleting income:', err);
            setError(err.response?.data?.message || "An error occurred");
        }
        getIncome();
    }

    const totalIncome = () => {
        try {
            if (!Incomes || Object.keys(Incomes).length === 0) return 0;
    
            let total = 0;
            
            Object.values(Incomes).forEach((income) => {
                income.forEach((item)=>{
                    total += item.amount;
                })
            });
    
            return total;
        } catch (err) {
            console.error('Error calculating total income:', err);
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const addExpense = async (expense) => {
        try {
            const response = await axios.post(`${BASE_URL}add-expense`,expense);
        } catch (err) {
            console.error('Error adding expense:', err);
            setError(err.response?.data?.message || 'An error occurred');
        }
        getExpense();
    };

    const getExpense = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expense`);
            setExpenses(response.data);
            transactionHistory();
        } catch (err) {
            console.error('Error getting expense:', err);
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
            getExpense();
        } catch (err) {
            console.error('Error deleting expense:', err);
            setError(err.response?.data?.message || "An error occurred");
        }
        getExpense();
    }

    const totalExpense = () => {
        try {
            if (!Expenses || Object.keys(Expenses).length === 0) return 0;
    
            let total = 0;
            
            Object.values(Expenses).forEach((expense) => {
                expense.forEach((item)=>{
                    total += item.amount;
                })
            });
    
            return total;
        } catch (err) {
            console.error('Error calculating total expense:', err);
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    const totalSavings=()=>{
        return totalIncome()-totalExpense();
    }

    const transactionHistory = () => {
        // Flatten and combine Incomes and Expenses
        const incomeItems = Object.values(Incomes).flat();
        const expenseItems = Object.values(Expenses).flat();
        
        // Combine both into a single array
        const combinedItems = [
            ...incomeItems.map(item => ({ ...item, type: 'income' })),  // Adding type 'income' to each income item
            ...expenseItems.map(item => ({ ...item, type: 'expense' })) // Adding type 'expense' to each expense item
          ];
          
        
        // Sort the combined items by date
        combinedItems.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Update the History state with the sorted combined items
        setHistory(combinedItems);
    };
    
    

    

    return (
        <GlobalContext.Provider value={{
            Expenses,
            setExpenses,
            setIncomes,
            Incomes,
            Error,
            setError,
            addIncome,
            getIncome,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpense,
            deleteExpense,
            totalExpense,
            totalSavings,
            History,
            setHistory,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext); 
};
