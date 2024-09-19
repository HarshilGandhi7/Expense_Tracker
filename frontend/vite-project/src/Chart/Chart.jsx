import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "../Context/globalContext";
import styled from 'styled-components';
import { Line } from "react-chartjs-2";
import { DateFormat } from "../Utils/DateFormat";
import {
    Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

// Register necessary chart.js components
ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement, 
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

// Helper function to parse and sort dates
const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day); // month - 1 because months are 0-based
};

// Main Chart component
export const Chart = () => {
    const { Incomes, Expenses, getIncome, getExpense } = useGlobalContext();
    const [dates, setDates] = useState([]);
    const [incomeDataByType, setIncomeDataByType] = useState({});
    const [expenseDataByType, setExpenseDataByType] = useState({});
    const dataFetched = useRef(false); // Ref to track if data has been fetched

    // Fetch income and expenses data when the component mounts
    useEffect(() => {
        if (!dataFetched.current) {
            const fetchData = async () => {
                await getIncome();
                await getExpense();
                
                const incomeItems = Object.values(Incomes).flat();
                const expenseItems = Object.values(Expenses).flat();
                const allItems = [...incomeItems, ...expenseItems];

                // Create a unified list of dates and sort them
                const uniqueDates = Array.from(new Set(allItems.map(item => DateFormat(item.date))));
                uniqueDates.sort((a, b) => parseDate(a) - parseDate(b));
                setDates(uniqueDates);

                // Prepare data by type
                const incomeData = prepareDataByType(incomeItems, 'type');
                const expenseData = prepareDataByType(expenseItems, 'type');
                setIncomeDataByType(incomeData);
                setExpenseDataByType(expenseData);

                dataFetched.current = true; // Mark data as fetched
            };

            fetchData();
        }
    }, [Expenses,Incomes]);

    // Function to get data by type
    const prepareDataByType = (items, typeKey) => {
        const dataByType = {};
        items.forEach(item => {
            console.log(item);
            const date = DateFormat(item.date);
            const type = item[typeKey] ? item[typeKey].toLowerCase() :'money'; 
            if (!dataByType[date]) {
                dataByType[date] = {};
            }
            dataByType[date][type] = (dataByType[date][type] || 0) + item.amount;
        });
        return dataByType;
    };

    // Generate datasets for income and expenses based on types
    const generateDatasets = (dataByType, typeLabel, colors) => {
        const datasets = [];
        const types = new Set();
        Object.values(dataByType).forEach(dateData => {
            Object.keys(dateData).forEach(type => {
                types.add(type);
            });
        });

        const typeArray = Array.from(types);
        typeArray.forEach((type, index) => {
            datasets.push({
                label: `${typeLabel} ${type}`,
                data: dates.map(date => dataByType[date] && dataByType[date][type] ? dataByType[date][type] : 0),
                backgroundColor: colors[index % colors.length],
                borderColor: colors[index % colors.length],
                tension: 0.4,
                fill: true,
            });
        });

        return datasets;
    };

    // Define colors for different types
    const incomeColors = ['rgba(0, 128, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(34, 139, 34, 0.5)'];
    const expenseColors = ['rgba(255, 0, 0, 0.5)', 'rgba(255, 69, 0, 0.5)', 'rgba(255, 99, 71, 0.5)'];

    // Data for the chart
    const data = {
        labels: dates,
        datasets: [
            ...generateDatasets(incomeDataByType, 'Income', incomeColors),
            ...generateDatasets(expenseDataByType, 'Expense', expenseColors),
        ]
    };

    return (
        <ChartStyled>
            <Line data={data} />
        </ChartStyled>
    );
};

// Styled component for the chart
const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart;
