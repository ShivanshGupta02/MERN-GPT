import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import axios from "axios";
import {Toaster} from 'react-hot-toast'
axios.defaults.baseURL = "http://localhost:5000/api/v1";
// allows setting the cookies from the backend and exchanging the cookies with backend
axios.defaults.withCredentials=true;

const theme = createTheme({
  typography : {
    fontFamily : "Roboto Slab,serif",
    allVariants : {color : "white"},
  }
});
ReactDOM.createRoot(document.getElementById('root')!).render(
 
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme = {theme}>
          <Toaster position="top-right" />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>

)
