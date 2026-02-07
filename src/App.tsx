import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import ProductDetails from './Components/SpecifiedComponents/HomePage/ProductDetails';
import AllProducts from './Components/Pages/AllProducts';
import OneDayOffer from './Components/Pages/OneDayOffer';
import TShirts from './Components/Pages/TShirts';
import KeepShopping from './Components/Pages/KeepShopping';
import ShopByCategory from './Components/Pages/ShopByCategory';
import CategoryPage from './Components/Pages/CategoryPage';
import Login from './Components/WrapperComponents/Login';
import Register from './Components/Pages/Register';
import Wholesale from './Components/Pages/Wholesale';
import QuickCommerce from './Components/Pages/QuickCommerce';
import Resale from './Components/Pages/Resale';
import Profile from './Components/Pages/Profile';

import Freelance from './Components/Pages/Freelance';
import WholesaleProductDetails from './Components/SpecifiedComponents/WholeSale/Components/WholesaleProductDetails';
import QCategoryPage from './Components/Pages/QCategoryPage';
import QAllProducts from './Components/Pages/QAllProducts';
import QProductDetails from './Components/SpecifiedComponents/Q-Commerces/Components/QProductDetails';
import ResaleProductDetails from './Components/SpecifiedComponents/Second-hand/Components/ResaleProductDetails';
import AdminDashboard from './Components/SpecifiedComponents/Admin/AdminDashboard';
import RetailManagement from './Components/SpecifiedComponents/Admin/RetailManagement';
import WholesaleManagement from './Components/SpecifiedComponents/Admin/WholesaleManagement';
import QCommerceManagement from './Components/SpecifiedComponents/Admin/QCommerceManagement';
import ResaleManagement from './Components/SpecifiedComponents/Admin/ResaleManagement';
import FreelanceManagement from './Components/SpecifiedComponents/Admin/FreelanceManagement';
import ProtectedAdminRoute from './Components/SpecifiedComponents/Admin/ProtectedAdminRoute';
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
          <Route path="/resale/product/:id" element={<ResaleProductDetails />} />
          <Route path="/freelance" element={<Freelance />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/wholesale/product/:id" element={<WholesaleProductDetails />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products/all" element={<AllProducts />} />
          <Route path="/products/one-day-offer" element={<OneDayOffer />} />
          <Route path="/products/tshirt" element={<TShirts />} />
          <Route path="/products/keep-shopping" element={<KeepShopping />} />
          <Route path="/products/categories" element={<ShopByCategory />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/quick/category/:categoryName" element={<QCategoryPage />} />
          <Route path="/quick/all" element={<QAllProducts />} />
          <Route path="/quick/product/:id" element={<QProductDetails />} />


          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
          <Route path="/admin/retail" element={<ProtectedAdminRoute><RetailManagement /></ProtectedAdminRoute>} />
          <Route path="/admin/wholesale" element={<ProtectedAdminRoute><WholesaleManagement /></ProtectedAdminRoute>} />
          <Route path="/admin/quick" element={<ProtectedAdminRoute><QCommerceManagement /></ProtectedAdminRoute>} />
          <Route path="/admin/resale" element={<ProtectedAdminRoute><ResaleManagement /></ProtectedAdminRoute>} />
          <Route path="/admin/freelance" element={<ProtectedAdminRoute><FreelanceManagement /></ProtectedAdminRoute>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
