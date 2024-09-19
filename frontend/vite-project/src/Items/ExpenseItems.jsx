import React from "react";
import { useGlobalContext } from "../Context/globalContext";
import { BookIcon,FoodIcon,MedicalIcon,TvIcon,TakeawayIcon,ClothingIcon,TravellingIcon,ExpensesIcon,DollarIcon,CalendarIcon,CommentIcon,TrashIcon} from "../Utils/Icons";
import { DateFormat } from "../Utils/DateFormat";
import styled from "styled-components";
import Button from '../Components/Buttons'

export const ExpenseItems=(item)=>{
    const {id, title, amount, date, description,category} = item;
    const {deleteExpense} = useGlobalContext();

    const categoryIcon=()=>{
        switch(category){
            case 'education':
                return BookIcon;
            case 'groceries':
                return FoodIcon;
            case 'health':
                return MedicalIcon;
            case 'subscriptions':
                return TvIcon;
            case 'takeaways':
                return TakeawayIcon;
            case 'clothing':
                return ClothingIcon;
            case 'travelling':
                return TravellingIcon;
            case 'other':
                return ExpensesIcon;
            default:
                return ExpensesIcon;
        }
    }

    return(
        <ExpenseItemStyled>
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
                        hColor={'var(--color-red)'}
                        onClick={() => deleteExpense(id)}  
                        />
                    </div>
                </div>
            </div>
        </ExpenseItemStyled>
    )
}


const ExpenseItemStyled = styled.div`
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

