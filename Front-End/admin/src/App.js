import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Dashboard from './main/dashboard';
import ProductShow from './main/productShow';
import ProductCreate from './main/productCreate';
import ProductEdit from './main/productEdit';
import CategoryShow from './main/categoryShow';
import CategoryCreate from './main/categoryCreate';
import CategoryEdit from './main/categoryEdit';
import CartShow from './main/cartShow';
import Customer from './main/customer';
import CartDetailShow from './main/cartDetailShow';
import Login from './main/login';

function App() {
  return (
    <Router>
        <Routes>

            <Route path='/' element={<Dashboard />} exact/>
            <Route path='/product' element={<ProductShow/>} exact/>
            <Route path='/category' element={<CategoryShow />} exact/>

            <Route path='/product-create' element={<ProductCreate />} exact/>
            <Route path='/category-create' element={<CategoryCreate />} exact/>

            <Route path='/product-create/:id' element={<ProductEdit />} exact/>
            <Route path='/category-edit/:id' element={<CategoryEdit />} exact/>

            <Route path='/cart' element={<CartShow />} exact/>
            <Route path='/customer/:id' element={<Customer />} exact/>
            <Route path='/cart-detail/:id' element={<CartDetailShow />} exact/>

            <Route path='/login' element={<Login />} exact/>
        </Routes>
    </Router>
  );
}

export default App;
