import Navbar from "../layout/navbar";
import Sidebar from "../layout/sidebar";
import Footer from "../layout/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import port from "../util/until";
import { NavLink, useNavigate} from "react-router-dom";
import checkLogin from "./checkLogin";
function ProductShow(){
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        checkLogin(navigate, "/product");
        async function getProduct(){
            let data = await axios.get(port+"product");
            setProducts(data.data);
        }
        getProduct();
    },[])
    return (
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
                                <h1 class="mt-4">Product</h1>
                                <ol class="breadcrumb mb-4">
                                    <li class="breadcrumb-item active">Product</li>
                                </ol>
                            
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <i class="fas fa-table me-1"></i>
                                        Product
                                    </div>
                                    <div class="card-body">
                                    {products.length > 0 && 
                                    <table id="myTable" class="display">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Name</th>
                                                <th>Create at</th>
                                                <th>Update at</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((item, index)=>{
                                                    return (
                                                        <tr>
                                                            <td>{index+1}</td>
                                                            <td>
                                                                <NavLink to={`/product-create/${item.product.id}`}>{item.product.name}</NavLink>
                                                            </td>
                                                            <td>{item.product.createAt}</td>
                                                            <td>{item.product.updateAt}</td>
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
export default ProductShow;