import styled from "styled-components";

export const MainLayout = styled.div`
    padding: 2rem; // Default padding for larger screens
    height: 100%;
    display: flex;
    gap: 2rem; // Default gap for larger screens
    flex-direction: column; // Column layout by default

    @media (min-width: 768px) {
        flex-direction: row; // Row layout for medium and larger screens
    }

    @media (max-width: 768px) {
        padding: 1.5rem; // Adjust padding for tablets and medium-sized screens
    }

    @media (max-width: 480px) {
        padding: 1rem; // Less padding for very small screens
        gap: 1rem; // Smaller gap for very small screens
    }
`;


export const InnerLayout = styled.div`
    padding: 2rem 1.5rem; // Default padding for larger screens
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Consistent shadow for visual separation

    @media (max-width: 768px) {
        padding: 1.5rem 1rem; // Adjust padding for tablets and smaller screens
    }

    @media (max-width: 480px) {
        padding: 1rem; // Further adjust padding for very small screens
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Slightly smaller shadow for very small screens
    }
`;
