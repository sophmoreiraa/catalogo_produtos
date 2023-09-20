import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './Login';
import Cadastro from "./Cadastro";
import Produto from './Produtos';
import EditaProdutos from './EditaProdutos';

//650adfda2a26e4e19b7760e5 id

document.body.style.backgroundColor = "#f6dcff";

const theme = createTheme ({
  palette: {
    mode: 'light',
    primary: {
      main: '#ab47bc',
    },
    secondary: {
      main: '#00bfa5',
    },
    background: {
      default: '#f6dcff',
    },
    error: {
      main: '#880e4f',
    },
    warning: {
      main: '#d32f2f',
    },
    info: {
      main: '#1976d2',
    },
    success: {
      main: '#53e658',
    },
    divider: '#1a237e',
  }
});
  


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/produtos",
    element: <Produto />
  },
  {
    path: "/edicao/:id",
    element: <EditaProdutos />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
