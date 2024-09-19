import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Form } from '../Form/form';
import { InnerLayout } from '../Styles/Layouts';
import { useGlobalContext } from '../Context/globalContext';
import { IncomeItems } from '../Items/IncomeItems';

const Income = () => {
    const { totalIncome, getIncome, Incomes } = useGlobalContext();
    
    useEffect(() => {
        getIncome();
    }, []); 
    
    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">
                    Total Income: <span>${totalIncome()}</span>
                </h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                    {
                        Object.values(Incomes).map((incomeArray) => (
                            incomeArray.map((item) => {
                                const {_id, amount, category, date, description, title} = item;
                                return (
                                    <IncomeItems
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
        </IncomeStyled>
    );
};

export default Income;

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;

    .total-income {
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
            color: var(--color-green);
        }
    }

    .income-content {
        display: flex;
        gap: 2rem;

        .incomes {
            flex: 1;
        }

        .income-item {
            background: #f0f0f0;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;

            h3 {
                margin-bottom: 0.5rem;
            }

            p {
                margin: 0.3rem 0;
            }
        }
    }
`;
