import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ExpenseForm } from '../Form/ExpenseForm';
import { InnerLayout } from '../Styles/Layouts';
import { useGlobalContext } from '../Context/globalContext';
import { ExpenseItems } from '../Items/ExpenseItems';

const Expenses = () => {
    const { totalExpense, getExpense, Expenses } = useGlobalContext();
    
    useEffect(() => {
        getExpense();
    }, []); 
    

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expense">
                    Total Expenses: <span>-${totalExpense()}</span>
                </h2>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="expenses">
                    {
                        Object.values(Expenses).map((expenseArray) => (
                            expenseArray.map((item) => {
                                const {_id, amount, category, date, description, title} = item;
                                return (
                                    <ExpenseItems
                                        key={_id}
                                        id={_id}
                                        amount={amount}
                                        category={category}
                                        date={date}
                                        description={description}
                                        title={title}
                                    />
                                );
                            })
                        ))
                    }
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    );
};

export default Expenses;

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-expense {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;

        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: red; 
        }
    }
    .expense-content{
        display: flex;
        gap: 2rem;
        .expenses{
            flex: 1;
        }
    }
`;
