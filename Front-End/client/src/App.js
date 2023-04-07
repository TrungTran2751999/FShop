import logo from './logo.svg';
import './App.css';
import HeaderPage from './main/client/main';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Detail from './main/client/detail';
import CheckOut from './main/client/checkout';
import Cart from './main/client/cart';
import Category from './main/client/category';
function App() {
  if(localStorage.getItem("listCart")==null){
    localStorage.setItem("listCart",JSON.stringify([]));
  }
  return (
    <Router>
      <Routes>
          <Route path="/" element={<HeaderPage />} exact />
          <Route path="/detail/:id" element={<Detail />} exact />
          <Route path="/check-out" element={<CheckOut />} exact />
          <Route path="/cart" element={<Cart />} exact />
          <Route path="/category/:id" element={<Category />} exact />
      </Routes>
    </Router>
  );
}

export default App;
