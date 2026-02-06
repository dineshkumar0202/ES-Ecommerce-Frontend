import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import ProductDetails from './Components/SpecifiedComponents/HomePage/ProductDetails';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import Wholesale from './Components/Pages/Wholesale';
import QuickCommerce from './Components/Pages/QuickCommerce';
import Resale from './Components/Pages/Resale';
import Freelance from './Components/Pages/Freelance';
import './App.css';

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="/quick" element={<QuickCommerce />} />
          <Route path="/resale" element={<Resale />} />
          <Route path="/freelance" element={<Freelance />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
