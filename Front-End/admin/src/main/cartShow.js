import { useState, useEffect } from "react";
import port from "../util/until";
import Navbar from "../layout/navbar";
import Sidebar from "../layout/sidebar";
import Footer from "../layout/footer";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useToast, immediateToast } from "izitoast-react";
import "izitoast-react/dist/iziToast.css";
import { useNavigate } from "react-router-dom";
function CartShow(){
    let navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [status, setStatus] = useState("1");
    useEffect(()=>{
        let admin = localStorage.getItem("admin");
        if(admin!=null){
            async function check(){
                let res = await axios.post(port+"auth/check",JSON.parse(admin)).then(()=>{
                    return navigate("/cart");
                }).catch(()=>{
                    return navigate("/login")
                })
            }
            check();
        }else{
            navigate("/login");
        }
        async function getAllCart(){
            let res = await axios.get(port+`cart/status/${status}`);
            setCart(res.data);
        }
        getAllCart()
    },[]);
    useEffect(()=>{
        async function getAllCart(status){
            let res = await axios.get(port+`cart/status/${status}`);
            setCart(res.data);
        }
        getAllCart(status);
    },[status])
    async function updateStatus(id){
        let res = await axios.post(port+`cart/${id}`).then((res)=>{
            immediateToast("info",{
                title: "Success",
                message: res.data,
                timeout:5000,
                color:"green",
                icon:"success",
                theme: "green"
            })
            async function getAllCart(){
                let res = await axios.get(port+`cart/status/1`).then(()=>{
                    setCart(res.data);
                }).catch(()=>{
                    setStatus("2");
                });
            }
            getAllCart();
            document.getElementById(`close${id}`).click();
        }).catch((error)=>{
            immediateToast("info",{
                title: "Error",
                message: error.response.data,
                timeout:5000,
                color:"green",
                icon:"error",
                theme: "light"
            })
        })
    }
    return (
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
                        <select id="pended" className="form-select mb-4" style={{width: "50%", marginLeft:"50%"}} value={status} onChange={(e)=>setStatus(e.target.value)}>
                            <option value="1">Pending</option>
                            <option value="2">Pended</option>
                        </select>
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-table me-1"></i>
                                Cart
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
                                        <th>Pended</th>
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
                                                    <td><button disabled={item.status==2?true:false} type="button" class="btn btn-warning" data-toggle="modal" data-target={`#exampleModal${item.id}`}>Pended</button></td>
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
                {cart.length>0 && cart.map((item)=>{
                    return(
                        <div class="modal fade" id={`exampleModal${item.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" class="close" id={`close${item.id}`} data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    Do you want update cart of {item.customer.name}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onClick={()=>updateStatus(item.id)}>Pended</button>
                                </div>
                                </div>
                        </div>
                        </div>
                    )
                })}
                <Footer />
            </div>
        </div>
        </body>
    )
}
export default CartShow;