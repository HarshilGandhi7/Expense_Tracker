import React from 'react';
import styled from 'styled-components';
import { menuItems } from "../Utils/menuItems";
import avatar from "../img/avatar.png";
import { SignoutIcon } from "../Utils/Icons";

const Navigation = ({ active, setActive }) => {
  return (
    <NavStyled>
      <div className="content">
        <div className="user-con">
          <img src={avatar} alt="User Avatar" />
          <div>
            <h2>Harshil Gandhi</h2>
            <p>Expense Tracker</p>
          </div>
        </div>
        <ul className="menu-items">
          {menuItems.map(item => (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? "active" : ""}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
        <div className="bottom-nav">
          <button className="signout-btn">
            {SignoutIcon}
            Sign Out
          </button>
        </div>
      </div>
    </NavStyled>
  );
};

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #FFFFFF;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    flex: 1;
  }

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #FFFFFF;
      padding: .2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }

    h2 {
      color: rgba(34, 34, 96, 1);
    }

    p {
      color: rgba(34, 34, 96, .6);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: .6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all .4s ease-in-out;
      color: rgba(34, 34, 96, .6);
      padding-left: 1rem;
      position: relative;

      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all .4s ease-in-out;
      }

      &:hover {
        color: rgba(34, 34, 96, 1);
        i {
          color: rgba(34, 34, 96, 1);
        }
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }

  .bottom-nav {
    display: flex;
    justify-content: center;
    align-items: center;

    .signout-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border: none;
      background: rgba(34, 34, 96, 0.1);
      color: rgba(34, 34, 96, 1);
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s ease, color 0.3s ease;
      border-radius: 8px;
      
      &:hover {
        background: rgba(34, 34, 96, 0.2);
        color: rgba(34, 34, 96, 1);
      }
      
      &:active {
        background: rgba(34, 34, 96, 0.3);
        color: rgba(34, 34, 96, 0.8);
      }
    }
  }
`;

export default Navigation;
