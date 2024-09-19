import React, { useState } from "react";
import { useGlobalContext } from "../Context/globalContext";
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const ExpenseForm = () => {
    const { addExpense } = useGlobalContext();

    const [expense, setExpense] = useState({
        title: '',
        amount: '',
        date: new Date(),
        category: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense({
            ...expense,
            [name]: value
        });
    };

    const handleDateChange = (date) => {
        setExpense({
            ...expense,
            date
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!expense.title || !expense.amount || !expense.date || !expense.category) {
            alert('Please fill out all required fields');
            return;
        }

        addExpense(expense);

        setExpense({
            title: '',
            amount: '',
            date: new Date(),
            category: '',
            description: ''
        });
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            <div className="input-control">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={expense.title}
                    placeholder="Expense Title"
                    onChange={handleChange}
                />
            </div>
            <div className="input-control">
                <label htmlFor="amount">Amount</label>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="Expense Amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>
            <div className="input-control">
                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    id="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="" disabled>Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="clothing">Clothing</option>
                    <option value="travelling">Travelling</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="input-control">
                <label htmlFor="date">Date</label>
                <DatePicker
                    selected={expense.date}
                    onChange={handleDateChange}
                    placeholderText="Enter a Date"
                    dateFormat="dd/MM/yyyy"
                    id="date"
                />
            </div>
            <div className="input-control">
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    value={expense.description}
                    placeholder="Add A Reference"
                    onChange={handleChange}
                />
            </div>
            
            <div className="submit-btn">
                <button
                    type="submit"
                >
                    Add Expense
                </button>
            </div>
        </FormStyled>
    );
};

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .input-control {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        label {
            font-weight: bold;
        }

        input, textarea, select {
            font-family: inherit;
            font-size: inherit;
            outline: none;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            background: transparent;
            border: 2px solid #fff;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            color: rgba(34, 34, 96, 0.9);
            &::placeholder {
                color: rgba(34, 34, 96, 0.4);
            }
        }

        textarea {
            resize: vertical;
            min-height: 100px;
        }

        select {
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active {
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn {
        display: flex;
        justify-content: center;

        button {
            padding: 0.8rem 1.6rem;
            border-radius: 30px;
            background: var(--color-accent);
            color: #fff;
            border: none;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.3s;

            &:hover {
                background: var(--color-green);
            }
        }
    }
`;
