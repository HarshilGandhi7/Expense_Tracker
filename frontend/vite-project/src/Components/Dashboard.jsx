import styled from "styled-components";
import Chart from "../Chart/Chart";
import { useEffect } from "react";
import { useGlobalContext } from "../Context/globalContext";
import { InnerLayout } from "../Styles/Layouts";
import History from "./History";

const Dashboard = () => {
    const { totalIncome, totalExpense, totalSavings, getIncome, getExpense } = useGlobalContext();

    useEffect(() => {
        getIncome();
        getExpense();
    }, [getIncome, getExpense]);

    return (
        <DashboardStyled>
        <div className="container">
            <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>${totalIncome()}</p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>${totalExpense()}</p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>${totalSavings()}</p>
                            </div>
                        </div>
                    </div>
                <div className="history-con">
                    <History />
                </div>
            </div>
        </div>
        </DashboardStyled>
    );
};

const DashboardStyled = styled.div`
    .container {
        padding: 2rem;
        background: #FCF6F9;
        border-radius: 20px;
    }
    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con {
            grid-column: 1 / 4;
            height: 400px;
            .amount-con {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense {
                    grid-column: span 2;
                }
                .income, .expense, .balance {
                    background: #FCF6F9;
                    border: none; /* Ensure no border */
                    box-shadow: none; /* Remove box-shadow */
                    border-radius: 20px;
                    padding: 1rem;
                    p {
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }
                .balance {
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p {
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4.5rem;
                    }
                }
            }
        }
        .history-con {
            grid-column: 4 / -1;
            h2 {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title {
                font-size: 1.2rem;
                span {
                    font-size: 1.8rem;
                }
            }
            .salary-item {
                background: #FCF6F9;
                border: none; /* Ensure no border */
                box-shadow: none; /* Remove box-shadow */
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p {
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;


export default Dashboard