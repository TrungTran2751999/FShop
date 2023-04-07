import Navbar from "../layout/navbar";
import Sidebar from "../layout/sidebar";
import Footer from "../layout/footer";
import { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import port from "../util/until";
import axios from "axios";
import { useToast, immediateToast } from "izitoast-react";
import "izitoast-react/dist/iziToast.css";
import checkLogin from "./checkLogin";
function ProductEdit(){
    const {id} = useParams();
    const [product, setProduct] = useState("");
    const [categoryId, setCategoryId] = useState([]);
    const [imageProduct, setImageProduct]= useState();

    const [name, setName] = useState("");
    const [length,setLength] = useState("");
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [imageCloud, setImageCloud]= useState();
    const navigate = useNavigate();
    useEffect(()=>{
        checkLogin(navigate, `/product-create/${id}`);
        async function getProductById(){
            let res = await axios.get(port+`product/${id}`);
            setProduct(res.data);
        }
        getProductById();
        async function getAllCategory(){
            let category = await axios.get(port+"category");
            setCategoryId(category.data);
        }
        getAllCategory();
    },[])
    useEffect(()=>{
        if(product.product!=undefined){
            setName(product.product.name);
            setLength(product.product.length);
            setHeight(product.product.height);
            setWidth(product.product.length);
            setQuantity(product.product.quantity);
            setPrice(product.product.price);
            setCategory(product.product.categoryId.id);
            setDescription(product.product.description);
            setImageCloud(product.fileUrl);
        }
    },[product])
    const handleCreateCustomer = async()=>{
        let keys = Object.keys(product.product);
        for(let i=0; i<keys.length; i++){
            let errorName = document.getElementsByClassName("error-"+keys[i]);
            if(errorName.length >0){
                document.getElementsByClassName("error-"+keys[i])[0].innerHTML = "";
            }
        }
        let formData = new FormData();
        formData.append("name", name.trim());
        formData.append("width", parseFloat(width));
        formData.append("length", parseFloat(length));
        formData.append("height", parseFloat(height));
        formData.append("category", parseFloat(category));
        formData.append("price", parseFloat(price));
        formData.append("quantity", parseFloat(quantity));
        formData.append("description", description);
        if(imageProduct != undefined){
            formData.append("multipartFile", imageProduct);
        }
        let res = await axios.patch(port+`product/${id}`, formData).then((res)=>{
            immediateToast("info",{
                title: "Success",
                message: res.data,
                timeout:5000,
                color:"green",
                icon:"success",
                theme: "green"
            })
        }).catch((res)=>{
            let errors = res.response.data;
            for(let error in errors){
                let errorName = document.getElementsByClassName("error-"+error);
                if(errorName.length >0){
                    document.getElementsByClassName("error-"+error)[0].innerHTML = errors[error];
                }
            }
        })
    }
    const imageChange = async (e)=>{
        if(e.target.files && e.target.files.length > 0){
            await setImageProduct(e.target.files[0]);
        }
    }
    function removeImage(){
        setImageProduct();
        document.getElementById("imageUpload").value = "";
    }
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
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
                                            </div>
                                            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={name} onChange={(e)=>setName(e.target.value)}/>
                                        </div>
                                        <div className="error-name error" style={{color:"red"}}></div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroup-sizing-default">Length</span>
                                            </div>
                                            <input type="number" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={length} onChange={(e)=>setLength(e.target.value)}/>
                                        </div>
                                        <div className="error-length error"style={{color:"red"}}></div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroup-sizing-default">Height</span>
                                            </div>
                                            <input type="number" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={height} onChange={(e)=>setHeight(e.target.value)}/>
                                        </div>
                                        <div className="error-height error" style={{color:"red"}}></div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroup-sizing-default">Width</span>
                                            </div>
                                            <input type="number" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={width} onChange={(e)=>setWidth(e.target.value)}/>
                                        </div>
                                        <div className="error-width error"style={{color:"red"}}></div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroup-sizing-default">Quantity</span>
                                            </div>
                                            <input type="number" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                                        </div>
                                        <div className="error-quantity error"style={{color:"red"}}></div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroup-sizing-default">Price</span>
                                            </div>
                                            <input type="number" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                                        </div>
                                        <div className="error-price error"style={{color:"red"}}></div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroup-sizing-default">Description</span>
                                            </div>
                                            <textarea class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                                        </div>
                                        <div className="error-description"style={{color:"red"}}></div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroup-sizing-default">Category</span>
                                            </div>
                                            <select class="form-select" aria-label="Default" aria-describedby="inputGroup-sizing-default" value={category} onChange={(e)=>setCategory(e.target.value)}>
                                                {categoryId && categoryId.length > 0 && 
                                                    categoryId.map((item)=>{
                                                        return(
                                                            <option value={item.id}>{item.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="error-categoryId error"style={{color:"red"}}></div>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroup-sizing-default">Image</span>
                                            </div>
                                            <input id="imageUpload" accept="image/*" onChange={(e)=>{imageChange(e)}} type="file" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
                                        </div>
                                        {imageProduct && (
                                            <img
                                                src={URL.createObjectURL(imageProduct)}
                                                onClick = {removeImage}
                                                style={{width:"250px", height:"175px"}}
                                            />
                                        )}
                                        {!imageProduct&& (
                                            <img
                                                src={imageCloud}
                                                onClick = {removeImage}
                                                style={{width:"250px", height:"175px"}}
                                            />
                                        )}
                                        <div className="error-multipartFile error"style={{color:"red"}}></div>
                                        <button type="button" class="btn btn-primary" style={{float:"right"}} onClick={handleCreateCustomer}>
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
        </>
    )
}
export default ProductEdit