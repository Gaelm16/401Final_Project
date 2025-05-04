import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import App from './App.jsx';
import LoginForm from './components/Login.jsx';
import Register from './components/Register.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
