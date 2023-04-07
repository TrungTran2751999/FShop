import Navbar from "../layout/navbar";
import Sidebar from "../layout/sidebar";
import Footer from "../layout/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import port from "../util/until";
import { NavLink } from "react-router-dom";
import { useToast, immediateToast } from "izitoast-react";
import { useParams, useNavigate} from "react-router-dom";
import checkLogin from "./checkLogin";
function CategoryEdit(){
    const {id} = useParams();
    const [category, setCategory] = useState();
    let data = {
        name: category
    }
    let navigate = useNavigate();
    useEffect(()=>{
        checkLogin(navigate, `/category-edit/${id}`);
        async function getCategoryById(){
            let res = await axios.get(port+`category/${id}`);
            setCategory(res.data.name);
        }
        getCategoryById();
    },[])
    const handleCreateCategory = async ()=>{
        let res = await axios.patch(port+`category/${id}`,data).then((res)=>{
            immediateToast("info",{
                title: "Success",
                message: res.data,
                timeout:5000,
                color:"green",
                theme: "light"
            })
        }).catch((error)=>{
            if(error.response.data.name== undefined){
                immediateToast("info",{
                    title: "Error",
                    message: error.response.data,
                    timeout:5000,
                    color:"red",
                    theme: "light"
                })
            }else{
                immediateToast("info",{
                    title: "Error",
                    message: error.response.data.name,
                    timeout:5000,
                    color:"red",
                    theme: "light"
                })
            }
        })
    }
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
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroup-sizing-default">Category Name</span>
                                    </div>
                                    <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={category} onChange={(e)=>setCategory(e.target.value)}/>
                                </div>
                                <div className="error-name error" style={{color:"red"}}></div>
                                <button type="button" class="btn btn-primary" style={{float:"right"}} onClick={handleCreateCategory}>
                                    <i className="fa-sharp fa-solid fa-circle-plus"></i> Edit
                                </button>
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
export default CategoryEdit;