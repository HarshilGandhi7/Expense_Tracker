import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Orb movement animation
const moveOrb = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100px, 100px);
  }
`;

const Orb = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Update mouse position on mouse move
    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Attach the mouse move event listener when the component mounts
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <OrbStyled
            style={{ left: mousePosition.x, top: mousePosition.y }}
        />
    );
}

export default Orb;

// Styled-component for Orb with very light colors
const OrbStyled = styled.div`
    width: 70vh;
    height: 70vh;
    position: absolute;
    border-radius: 50%;
    margin-left: -37vh;
    margin-top: -37vh;
    background: linear-gradient(180deg, #FFE5E5 0%, #FFF0F0 100%);  // Very light colors
    filter: blur(400px);
    animation: ${moveOrb} 15s alternate linear infinite;
    pointer-events: none;
`;
