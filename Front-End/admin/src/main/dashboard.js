import { useState, useEffect } from "react";
import port from "../util/until";
import Navbar from "../layout/navbar";
import Sidebar from "../layout/sidebar";
import Footer from "../layout/footer";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useParams , useNavigate} from "react-router-dom";
import Login from "./login";
function Dashboard(){
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        let admin = localStorage.getItem("admin");
        if(admin!=null){
            async function check(){
                let res = await axios.post(port+"auth/check",JSON.parse(admin)).then(()=>{
                    return navigate("/");
                }).catch(()=>{
                    return navigate("/login")
                })
            }
            check();
        }else{
            return navigate("/login");
        }
        async function getAllCart(){
            let res = await axios.get(port+"cart/status/1");
            setCart(res.data);
        }
        getAllCart()
    },[]);
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
                            <h1 class="mt-4">Dashboard</h1>
                            <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active">Dashboard</li>
                            </ol>
                        
                            <div class="card mb-4">
                                <div class="card-header">
                                    <i class="fas fa-table me-1"></i>
                                    Dashboard
                                </div>
                                <div class="card-body">
                                {cart.length > 0 && 
                                <table id="myTable" class="display">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Customer</th>
                                            <th>Status</th>
                                            <th>Total Price</th>
                                            <th>Create At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item, index)=>{
                                                return (
                                                    <tr>
                                                        <td>{index+1}</td>
                                                        <td>
                                                            <NavLink to={`/customer/${item.customer.id}`}>{item.customer.name}</NavLink>
                                                        </td>
                                                        <td>{item.status===1?"Pending":"Pended"}</td>
                                                        <td>
                                                            <NavLink to={`/cart-detail/${item.id}`}>{item.totalPrice}</NavLink>
                                                        </td>
                                                        <td>{item.createAt}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                }
                                {cart.length===0 && 
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th className="scope">STT</th>
                                            <th className="scope">Customer</th>
                                            <th className="scope">Status</th>
                                            <th className="scope">Total Price</th>
                                            <th className="scope">Create At</th>
                                            <th className="scope">Pended</th>
                                        </tr>
                                    </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={6} style={{textAlign:"center"}}>No data available</td>
                                    </tr>
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
export default Dashboard;