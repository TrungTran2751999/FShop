import { useEffect, useState } from "react";
import axios from "axios";
import port from "../../util/util";
import { NavLink } from "react-router-dom";
function Head(){
    const [countCart, setCountCart] = useState(0);
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    useEffect(()=>{
       let cart = JSON.parse(localStorage.getItem("listCart"));
       if(cart!=null){
            setCountCart(cart.length);
       }
    },[countCart])
    useEffect(()=>{
        async function getCategory(){
            let res = await axios.get(port+"category");
            console.log(res)
            setCategory(res.data);
        }
        async function getProduct(){
            let res = await axios.get(port+"product");
            setProduct(res.data);
        }
        getCategory();
        getProduct();
    },[]);
    return (
        <>
        <div class="container-fluid">
        <div class="row bg-secondary py-2 px-xl-5">
            <div class="col-lg-6 d-none d-lg-block">
                <div class="d-inline-flex align-items-center">
                
                </div>
            </div>
            <div class="col-lg-6 text-center text-lg-right">
                <div class="d-inline-flex align-items-center">
                    <a class="text-dark px-2" href="">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a class="text-dark px-2" href="">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a class="text-dark px-2" href="">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a class="text-dark px-2" href="">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a class="text-dark pl-2" href="">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="row align-items-center py-3 px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <a href="" class="text-decoration-none">
                    <NavLink to={"/"} style={{textDecoration:"none"}}><h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">F</span>Machine</h1></NavLink>
                </a>
            </div>
            <div class="col-lg-6 col-6 text-left">
                <form action="">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for products" />
                        <div class="input-group-append">
                            <span class="input-group-text bg-transparent text-primary">
                                <i class="fa fa-search"></i>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-lg-3 col-6 text-right">
                <a href="" class="btn border">
                    <i class="fas fa-heart text-primary"></i>
                    <span class="badge">0</span>
                </a>
                <NavLink to="/cart" className="btn border">
                    <i class="fas fa-shopping-cart text-primary"></i>
                    <span class="badge">{countCart}</span>
                </NavLink>
            </div>
        </div>
        </div>
        {/* Nav Start */}
        <div class="container-fluid mb-5">
        <div class="row border-top px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <a class="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" href="#navbar-vertical" style={{height: "65px", marginTop: "-1px", padding: "0 30px"}}>
                    <h6 class="m-0">Categories</h6>
                    <i class="fa fa-angle-down text-dark"></i>
                </a>
                <nav class="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical">
                    <div class="navbar-nav w-100 overflow-hidden" style={{height: "410px"}}>
                        {category && category.length > 0 && category.map((item)=>{
                            return(
                                <NavLink to={`/category/${item.id}`} className="nav-item nav-link">{item.name}</NavLink>
                            )
                        })}
                    </div>
                </nav>
            </div>
            <div class="col-lg-9">
                <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                    <a href="" class="text-decoration-none d-block d-lg-none">
                        <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                    </a>
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div class="navbar-nav mr-auto py-0">
                            <NavLink to="/" className="nav-item nav-link" activeClassName="active" exact>Home</NavLink>
                            <NavLink to="/check-out" className="nav-item nav-link" activeClassName="active" exact>Check Out</NavLink>
                        </div>
                        <div class="navbar-nav ml-auto py-0">
                            <a href="" class="nav-item nav-link">Login</a>
                            <a href="" class="nav-item nav-link">Register</a>
                        </div>
                    </div>
                </nav>
                <div id="header-carousel" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        {/* ----------SLIDER------- */}
                        {product.length > 0 && product.map((item, index)=>{
                            return(
                                <div class={index===0?"carousel-item active":"carousel-item"} style={{height: "410px"}}>
                                    <img class="img-fluid" src={item.fileUrl} alt="Image"/>
                                    <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div class="p-3" style={{maxWidth: "700px"}}>
                                            <h4 class="text-light text-uppercase font-weight-medium mb-3">{item.product.name}</h4>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <a class="carousel-control-prev" href="#header-carousel" data-slide="prev">
                        <div class="btn btn-dark" style={{width: "45px", height: "45px"}}>
                            <span class="carousel-control-prev-icon mb-n2"></span>
                        </div>
                    </a>
                    <a class="carousel-control-next" href="#header-carousel" data-slide="next">
                        <div class="btn btn-dark" style={{width: "45px", height: "45px"}}>
                            <span class="carousel-control-next-icon mb-n2"></span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        </div>
        {/* Nav End */}
        </>
    )
}
export default Head;