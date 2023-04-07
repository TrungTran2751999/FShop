import Navbar from "../layout/navbar";
import Sidebar from "../layout/sidebar";
import Footer from "../layout/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import port from "../util/until";
import { NavLink, useNavigate} from "react-router-dom";
import checkLogin from "./checkLogin";
function CategoryShow(){
    const [role, setRole] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        checkLogin(navigate, "/category");
        async function getAllRole(){
            let res = await axios.get(port+"category");
            setRole(res.data);
        }
        getAllRole();
    },[]);

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
                                <h1 class="mt-4">Category</h1>
                                <ol class="breadcrumb mb-4">
                                    <li class="breadcrumb-item active">Category</li>
                                </ol>
                            
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <i class="fas fa-table me-1"></i>
                                        Category
                                    </div>
                                    <div class="card-body">
                                    {role.length > 0 && 
                                    <table id="myTable" class="display">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {role.map((item, index)=>{
                                                    return (
                                                        <tr>
                                                            <td>{index+1}</td>
                                                            <td>
                                                                <NavLink to={`/category-edit/${item.id}`}>{item.name}</NavLink>
                                                            </td>
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
    )
}
export default CategoryShow;