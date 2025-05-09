import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.jsx';
import LoginForm from './components/Login.jsx';
import Register from './components/Register.jsx';
import UserContext from './UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserContext>
        <App/>
      </UserContext> 
    </BrowserRouter>
  </StrictMode>,
)
