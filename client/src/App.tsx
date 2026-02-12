import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Retail from './Components/Pages/Retail';
import Wholesale from './Components/Pages/Wholesale';
import QCommerce from './Components/Pages/Q_Commrece';
import Resale from './Components/Pages/Resale';
import Freelance from './Components/Pages/Freelance';
import Login from './Components/WrapperComponents/Login';
import Register from './Components/WrapperComponents/Register';
import Profile from './Components/Pages/Profile';
import Checkout from './Components/Pages/Checkout';
import PaymentSuccess from './Components/Pages/PaymentSuccess';
import AdminDashboard from './Components/SpecifiedComponents/Admin/AdminDashboard';
import RetailManagement from './Components/SpecifiedComponents/Admin/RetailManagement';
import WholesaleManagement from './Components/SpecifiedComponents/Admin/WholesaleManagement';
import QCommerceManagement from './Components/SpecifiedComponents/Admin/QCommerceManagement';
import ResaleManagement from './Components/SpecifiedComponents/Admin/ResaleManagement';
import FreelanceManagement from './Components/SpecifiedComponents/Admin/FreelanceManagement';
import SellerProfile from './Components/Pages/SellerProfile';
import CategoryPage from './Components/Pages/CategoryPage';
import ShopByCategory from './Components/Pages/ShopByCategory';
import AllProducts from './Components/Pages/AllProducts';
import AddProduct from './Components/Pages/AddProduct';
import KeepShopping from './Components/Pages/KeepShopping';
import OneDayOffer from './Components/Pages/OneDayOffer';

// Import specific detail components and rename them to avoid conflict
import RetailProductDetails from './Components/SpecifiedComponents/Retail/ProductDetails';
import QCommerceProductDetails from './Components/SpecifiedComponents/Q-Commerces/ProductDetails';
import WholesaleProductDetails from './Components/SpecifiedComponents/WholeSale/Components/WholesaleProductDetails';
import ResaleProductDetails from './Components/SpecifiedComponents/Second-hand/Components/ResaleProductDetails';
import AuthSuccess from './Components/Pages/AuthSuccess';

import ProtectedAdminRoute from './Components/SpecifiedComponents/Admin/ProtectedAdminRoute';

function App() {
    return (
        <Router>
            <Routes>
                {/* Landing Page */}
                <Route path="/" element={<Navigate to="/retail" replace />} />

                {/* Core Marketplace Sections */}
                <Route path="/retail" element={<Retail />} />
                <Route path="/wholesale" element={<Wholesale />} />
                <Route path="/quick" element={<QCommerce />} />
                <Route path="/resale" element={<Resale />} />
                <Route path="/freelance" element={<Freelance />} />

                {/* Auth & User Management */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auth/success" element={<AuthSuccess />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/seller/profile" element={<SellerProfile />} />

                {/* Shopping Flow */}
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/cart" element={<Profile />} />

                {/* Product Details - Dynamic Routes */}
                <Route path="/product/:id" element={<RetailProductDetails />} />
                <Route path="/retail/product/:id" element={<RetailProductDetails />} />
                <Route path="/quick/product/:id" element={<QCommerceProductDetails />} />
                <Route path="/wholesale/product/:id" element={<WholesaleProductDetails />} />
                <Route path="/resale/product/:id" element={<ResaleProductDetails />} />

                {/* Category & Exploration */}
                <Route path="/category/:categoryName" element={<CategoryPage />} />
                <Route path="/shop-by-category" element={<ShopByCategory />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/keep-shopping" element={<KeepShopping />} />
                <Route path="/one-day-offer" element={<OneDayOffer />} />

                {/* Admin Section */}
                <Route path="/admin" element={
                    <ProtectedAdminRoute>
                        <AdminDashboard />
                    </ProtectedAdminRoute>
                } />
                <Route path="/admin/dashboard" element={
                    <ProtectedAdminRoute>
                        <AdminDashboard />
                    </ProtectedAdminRoute>
                } />
                <Route path="/admin/retail" element={
                    <ProtectedAdminRoute>
                        <RetailManagement />
                    </ProtectedAdminRoute>
                } />
                <Route path="/admin/wholesale" element={
                    <ProtectedAdminRoute>
                        <WholesaleManagement />
                    </ProtectedAdminRoute>
                } />
                <Route path="/admin/quick" element={
                    <ProtectedAdminRoute>
                        <QCommerceManagement />
                    </ProtectedAdminRoute>
                } />
                <Route path="/admin/resale" element={
                    <ProtectedAdminRoute>
                        <ResaleManagement />
                    </ProtectedAdminRoute>
                } />
                <Route path="/admin/freelance" element={
                    <ProtectedAdminRoute>
                        <FreelanceManagement />
                    </ProtectedAdminRoute>
                } />

                {/* Catch-all Routing */}
                <Route path="*" element={<Navigate to="/retail" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
