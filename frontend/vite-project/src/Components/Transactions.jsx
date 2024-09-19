import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../Context/globalContext";

// Helper function to parse and format the date
const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);

    // Format options
    const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

    const date = dateObj.toLocaleDateString('en-US', dateOptions); // Format: MM/DD/YYYY
    const time = dateObj.toLocaleTimeString('en-US', timeOptions); // Format: HH:MM:SS

    return { date, time };
};

const Transactions = () => {
    const { History } = useGlobalContext();
    return (
        <HistoryStyled>
            <h2>Transaction History</h2>
            {History.map((item) => {
                const { _id, title, amount, type, description, category, date } = item;
                const { date: formattedDate, time: formattedTime } = formatDate(date);

                return (
                    <div key={_id} className="history-item">
                        <div className="item-header">
                            <p className="title" style={{ color: type === 'expense' ? 'red' : 'var(--color-green)' }}>
                                {title}
                            </p>
                        </div>
                        <div className="item-body">
                            <p className="description">
                                {description}
                            </p>
                            <p className="amount" style={{ color: type === 'expense' ? 'red' : 'var(--color-green)' }}>
                                {type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0 : amount}`}
                            </p>
                        </div>
                        <div className="item-info"> 
                            <div className="date-time">
                                <p className="date">Date: {formattedDate}</p>
                                <p className="time">Time: {formattedTime}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </HistoryStyled>
    );
};

export default Transactions;

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /* Center all items horizontally */
    padding: 2rem; /* Increased padding around the container */
    gap: 2rem; /* Increased space between elements */

    h2 {
        font-size: 2.5rem; /* Larger font size for better visibility */
        font-weight: 700; /* Bolder font weight */
        margin-bottom: 2rem; /* Space below the heading */
        color: #333; /* Darker color for the heading */
        text-align: center; /* Centered heading */
    }

    .history-item {
        display: flex;
        flex-direction: column;
        align-items: center; /* Center align items horizontally */
        background: #F9F9F9; /* Slightly lighter background for contrast */
        border: 2px solid #E0E0E0; /* Subtle border color */
        box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1); /* Softer shadow for modern look */
        border-radius: 12px; /* Rounded corners */
        padding: 2rem; /* Increased padding for spacing inside */
        width: 100%; /* Full width of the container */
        max-width: 800px; /* Optional: limit maximum width */
        gap: 1.5rem; /* Space between sections */
        text-align: center; /* Center text horizontally */

        .title-amount {
            display: flex;
            justify-content: center; /* Center align title and amount horizontally */
            align-items: center; /* Center align items vertically */
            gap: 1rem; /* Space between title and amount */
            width: 100%; /* Full width */
        }

        .title {
            font-size: 1.5rem; /* Larger font size for title */
            font-weight: 600; /* Bolder font weight */
        }

        .amount {
            font-size: 1.5rem; /* Larger font size for amount */
            font-weight: 700; /* Bolder font weight */
            color: ${props => props.type === 'expense' ? 'red' : 'var(--color-green)'}; /* Color based on type */
            margin-top: 1rem; /* Add margin to create space between amount and description */
        }

        .date-time {
            display: flex;
            flex-direction: column; /* Stack date and time vertically */
            gap: 1rem; /* Space between date and time */
            width: 100%; /* Full width */
        }

        .date, .time {
            font-size: 1.2rem; /* Larger font size for date and time */
            color: #555; /* Darker color for date and time */
        }

        .description {
            font-size: 1.1rem; /* Larger font size for description */
            color: #666; /* Slightly lighter color for description */
            width: 100%; /* Full width */
            margin-bottom: 1rem; /* Space below description */
        }
    }
`;
