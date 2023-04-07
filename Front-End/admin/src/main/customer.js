import Navbar from "../layout/navbar";
import Sidebar from "../layout/sidebar";
import Footer from "../layout/footer";
import port from "../util/until";
import { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import checkLogin from "./checkLogin";
function Customer(){
    const {id} = useParams();
    const [customer, setCustomer] = useState();
    let navigate = useNavigate();
    useEffect(()=>{
        checkLogin(navigate, `/customer/${id}`);
        async function getCustomer(){
            let res = await axios.get(port+`customer/${id}`);
            setCustomer(res.data);
        }
        getCustomer();
    },[])
    return(
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
                                <h1 class="mt-4">Customer</h1>
                                <ol class="breadcrumb mb-4">
                                    <li class="breadcrumb-item active">Customer</li>
                                </ol>
                            
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <i class="fas fa-table me-1"></i>
                                        Customer
                                    </div>
                                    <div class="card-body">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
                                            </div>
                                            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={customer!=undefined && customer.name}/>
                                        </div>
                                        <div className="error-name error" style={{color:"red"}}></div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
                                            </div>
                                            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={customer!=undefined && customer.email}/>
                                        </div>
                                        <div className="error-length error"style={{color:"red"}}></div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroup-sizing-default">Phone</span>
                                            </div>
                                            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={customer!=undefined && customer.phone}/>
                                        </div>
                                        <div className="error-height error" style={{color:"red"}}></div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroup-sizing-default">Province</span>
                                            </div>
                                            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={customer!=undefined && customer.address.provinceName}/>
                                        </div>
                                        <div className="error-width error"style={{color:"red"}}></div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroup-sizing-default">District</span>
                                            </div>
                                            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={customer!=undefined && customer.address.districtName}/>
                                        </div>
                                        <div className="error-quantity error"style={{color:"red"}}></div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroup-sizing-default">Ward</span>
                                            </div>
                                            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={customer!=undefined && customer.address.wardName}/>
                                        </div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroup-sizing-default">Address</span>
                                            </div>
                                            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={customer!=undefined && customer.address.address}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
        </body>
    )
}
export default Customer;