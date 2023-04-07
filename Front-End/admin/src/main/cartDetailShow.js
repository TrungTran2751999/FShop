import { useState, useEffect } from "react";
import port from "../util/until";
import Navbar from "../layout/navbar";
import Sidebar from "../layout/sidebar";
import Footer from "../layout/footer";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useParams, useNavigate} from "react-router-dom";
import checkLogin from "./checkLogin";
import Login from "./login";
function CartDetailShow(){
    const {id} = useParams();
    const [cartDetail, setCartDetail] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        checkLogin(navigate,`/cart-detail/${id}`)
        async function getCart(){
            let res = await axios.get(port+`cart/cart-detail/${id}`);
            setCartDetail(res.data);
        }
        getCart();
    },[])
    return(
        <>
            <body class="sb-nav-fixed">
            {/* NAVBAR START */}
            <Navbar />
            {/* NAVBAR END */}
            <div id="layoutSidenav">
                {/* SIDEBAR START */}
                <Sidebar />
                {/* SIDEBAR END */}
                <div id="layoutSidenav_content">
                    <main>
                        <div class="container-fluid px-4">
                            <h1 class="mt-4">Cart</h1>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active">Cart</li>
                            </ol>
                        
                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-table me-1"></i>
                                    Cart
                                </div>
                                <div class="card-body">
                                {cartDetail.length > 0 && 
                                <table id="myTable" class="display">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartDetail.map((item, index)=>{
                                                return (
                                                    <tr>
                                                        <td>{index+1}</td>
                                                        <td>
                                                            <NavLink to={`/product-create/${item.id}`}>{item.product.name}</NavLink>
                                                        </td>
                                                        <td>{item.quantity}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                }
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
            </body>
        </>
    )
}
export default CartDetailShow;