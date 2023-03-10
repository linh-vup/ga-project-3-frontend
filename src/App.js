import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductsIndex from './components/ProductsIndex';
import Product from './components/Product';
import Login from './components/Login';
import Register from './components/Register';
import GetAllBrands from './components/GetAllBrands';
import BrandProductList from './components/common/BrandProductList';

import './styles/Index.scss';
import 'react-toastify/dist/ReactToastify.css';
import UserIndex from './components/UserIndex';
import User from './components/User';
import CreateProduct from './components/ CreateProduct';
import ReviewProduct from './components/ReviewProduct';
import EditCategory from './components/EditCategory';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import CreateNewBrand from './components/CreateBrand';
import EditProduct from './components/EditProduct';

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductsIndex />} />
        <Route path='/products/create' element={<CreateProduct />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path='/products/:id/edit' element={<EditProduct />} />
        <Route path='/products/:id/reviews' element={<ReviewProduct />} />
        <Route path='/brands/:id/products' element={<BrandProductList />} />
        <Route path='/profile/:userId' element={<User />} />
        <Route path='/users' element={<UserIndex />} />
        <Route path='/brands' element={<GetAllBrands />} />
        <Route path='/brands/create' element={<CreateNewBrand />} />
        <Route path='/categories/edit' element={<EditCategory />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <ToastContainer></ToastContainer>
    </Router>
  );
}

export default App;
