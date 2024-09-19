import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../Context/globalContext";
import {MoneyIcon,FreelanceIcon,StocksIcon,UsersIcon,BitcoinIcon,CardIcon,YtIcon,PiggyIcon,DollarIcon,CalendarIcon,CommentIcon,TrashIcon} from '../Utils/Icons'
import { DateFormat } from "../Utils/DateFormat";
import Button from "../Components/Buttons";

export const IncomeItems = ({id,amount,category,date,description,title})=>{
    const {deleteIncome}=useGlobalContext();

    const categoryIcon = () =>{
        switch(category) {
            case 'salary':
                return MoneyIcon; 
            case 'freelancing':
                return FreelanceIcon;
            case 'investments':
                return StocksIcon;
            case 'stocks':
                return UsersIcon;
            case 'bitcoin':
                return BitcoinIcon;
            case 'bank':
                return CardIcon;
            case 'youtube':
                return YtIcon;
            case 'other':
                return PiggyIcon;
            default:
                return MoneyIcon;
        }
    }

    return(
        <IncomeItemStyled>
            <div className="icon">
                {categoryIcon()}
            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{DollarIcon} {amount}</p>
                        <p>{CalendarIcon} {DateFormat(date)}</p>
                        <p>
                            {CommentIcon}
                            {description}
                        </p>
                    </div>
                    <div className="btn-con">
                       <Button
                        icon={TrashIcon}
                        bPad={'1rem'}
                        bRad={'50%'}
                        bg={'var(--primary-color'}
                        color={'#fff'}
                        iColor={'#fff'}
                        hColor={'var(--color-green)'}
                        onClick={() => deleteIncome(id)}  
                        />
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
    )

}

const IncomeItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    .icon{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    }
`;

