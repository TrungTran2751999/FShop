import Head from "../../layout/client/head";
import Footer from "../../layout/client/footer";
import { useEffect,useState } from "react";
import axios from "axios";
import port from "../../util/util";
import { NavLink } from "react-router-dom";
function HeaderPage(){
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        async function getAllProduct(){
            let res = await axios.get(port+"product");
            setProducts(res.data);
        }
        getAllProduct();
    },[]);
    return (
        <body>
        <>
        {/* Topbar start */}
        <Head />
        {/* Topbar end */}
        {/* Nav Start */}

        {/* Nav End */}
        {/* Featured Start */}
        <div class="container-fluid pt-5">
        <div class="row px-xl-5 pb-3">
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center border mb-4" style={{padding: "30px"}}>
                    <h1 class="fa fa-check text-primary m-0 mr-3"></h1>
                    <h5 class="font-weight-semi-bold m-0">Quality Product</h5>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center border mb-4" style={{padding: "30px"}}>
                    <h1 class="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                    <h5 class="font-weight-semi-bold m-0">Free Shipping</h5>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center border mb-4" style={{padding: "30px"}}>
                    <h1 class="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                    <h5 class="font-weight-semi-bold m-0">14-Day Return</h5>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="d-flex align-items-center border mb-4" style={{padding: "30px"}}>
                    <h1 class="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                    <h5 class="font-weight-semi-bold m-0">24/7 Support</h5>
                </div>
            </div>
        </div>
        </div>
    
        <div class="container-fluid pt-5">
        <div class="text-center mb-4">
            <h2 class="section-title px-5"><span class="px-2">Trandy Products</span></h2>
        </div>
        <div class="row px-xl-5 pb-3">
            {products && products.length>0 &&
                products.map((item)=>{
                    return(
                        <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div class="card product-item border-0 mb-4">
                            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                <img class="img-fluid w-100" src={item.fileUrl.split("upload")[0]+"upload/w_500,h_500"+item.fileUrl.split("upload")[1]} alt=""/>
                            </div>
                            <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                <h6 class="text-truncate mb-3">{item.product.name}</h6>
                                <div class="d-flex justify-content-center">
                                    <h6>${item.product.price}</h6>
                                </div>
                            </div>
                            <div class="card-footer d-flex justify-content-between bg-light border">
                                <NavLink to={`/detail/${item.product.id}`} className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</NavLink>
                            </div>
                        </div>
                        </div>
                    )
                })
            }
        </div>
        </div>
        {/* Subscribe End */}
        <Footer />
        </>
        </body>
    )
}
export default HeaderPage;