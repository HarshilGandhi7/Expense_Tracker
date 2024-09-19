import React from "react";
import { MainLayout } from './Styles/Layouts';
import styled from "styled-components";
import bg from "./img/bg.png";
import Orb from "./Components/Orb";
import { useState,useEffect } from "react";
import Navigation from "./Components/Navigation";
import Dashboard from "./Components/Dashboard"
import Income from "./Components/Income";
import Expenses from "./Components/Expenses";
import Transactions from "./Components/Transactions";

export default function App() {
  const [active,setActive]=useState(1);
  
  const displayData=()=>{
    switch(active){
      case 1:
        return <Dashboard/>
      case 2:
        return <Transactions/>
      case 3:
        return <Income/>
      case 4:
        return <Expenses/>
      default:
        return <Dashboard/>
    }
  }
  return (
    <>
      <AppStyled bg={bg} className="App">
        <Orb />
        <MainLayout>
          <Navigation active={active} setActive={setActive}/>
          <main>
            {displayData()}
          </main>

        </MainLayout>
      </AppStyled>
    </>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  position: relative;
  z-index:-1

  @media (max-width: 768px) {
    background-size: contain;
  }

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    margin: 0 1rem;

    @media (max-width: 768px) {
      margin: 0;
      padding: 1rem;
    }

    @media (max-width: 480px) {
      border-radius: 16px;
      backdrop-filter: blur(2px);
    }
  }
`;
