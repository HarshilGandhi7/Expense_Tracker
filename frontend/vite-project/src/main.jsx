import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; 
import './index.css'; 
import { GlobalStyle } from './Styles/GlobalStyles'; 
import { GlobalProvider } from './Context/globalContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle /> 
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>
);
