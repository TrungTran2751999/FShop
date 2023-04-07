import HeadNotSlide from "../../layout/client/headNotSlider";
import Footer from "../../layout/client/footer";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import port from "../../util/util";
import { NavLink } from "react-router-dom";
import { useToast, immediateToast } from "izitoast-react";
import "izitoast-react/dist/iziToast.css";
function Detail(){
    const {id} = useParams();
    const [products, setProducts] = useState();
    const [cart, setCart] = useState();
    const [quantity, setQuantity] = useState(1);
    const [isAddCart, setIsAddCart] = useState(false);
    useEffect(()=>{
        let getProduct = async ()=>{
            let res = await axios.get(port+`product/${id}`);
            setProducts(res.data);
        }
        getProduct();
        
    },[]);
    const minusQuantity = async ()=>{
        if(quantity>=2){
            await setQuantity(quantity-1);
        }
    }
    const addQuantity = async()=>{
        setQuantity(Number(quantity)+1)
    }
    
    async function saveCart(){
        let price = products.product.price;
        let res = await axios.get(port+`product/${id}`);
        if(quantity > res.data.product.quantity){
            immediateToast("info",{
                title: "Error",
                theme:"light",
                color: "red",
                message: "Quantity is not enough"
            })
            return;
        }
        await setCart({ 
            id:+id, 
            name: products.product.name,
            price: products.product.price,
            quantity });
        immediateToast("info",{
            title: "Success",
            theme:"light",
            color: "green",
            message: "Add cart successfully"
        })
        let listCart = JSON.parse(localStorage.getItem("listCart"));
    }
    useEffect(()=>{
        let listCart = JSON.parse(localStorage.getItem("listCart"));
        if(cart != undefined && quantity >0 && !isNaN(quantity)){
            if(listCart.length==0){
                listCart.push(cart);  
                localStorage.setItem("listCart", JSON.stringify(listCart));
                setIsAddCart(true);
                return;
            }
            for(let i=0; i<listCart.length; i++){
                if(cart.id===listCart[i].id){
                    listCart[i].quantity+=quantity;
                    localStorage.setItem("listCart", JSON.stringify(listCart));
                    setIsAddCart(true);
                    break;
                }else if(i===listCart.length-1){
                    listCart.push(cart);  
                    localStorage.setItem("listCart", JSON.stringify(listCart));
                    setIsAddCart(true);
                    break;
                }
            }
        }
        
        return ()=>{
            
        }
    },[cart])
    return (
        <>
            <HeadNotSlide 
                isAddCart = {isAddCart}
            />
            {/* Page Header Start */}
            <div class="container-fluid bg-secondary mb-5">
                <div class="d-flex flex-column align-items-center justify-content-center" style={{minHeight: "300px"}}>
                    <h1 class="font-weight-semi-bold text-uppercase mb-3">Shop Detail</h1>
                    <div class="d-inline-flex">
                        <p class="m-0"><NavLink to="/" exact>Home</NavLink></p>
                        <p class="m-0 px-2">-</p>
                        <p class="m-0">Shop Detail</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}
            {/* <!-- Shop Detail Start --> */}
            <div class="container-fluid py-5">
                <div class="row px-xl-5">
                    <div class="col-lg-5 pb-5">
                        <div id="product-carousel" class="carousel slide" data-ride="carousel">
                            <div class="carousel-inner border">
                                <div class="carousel-item active">
                                    <img class="w-100 h-100" src={products!=undefined && products.fileUrl.split("upload")[0]+"upload/w_500,h_500"+products.fileUrl.split("upload")[1]} alt="Image"/>
                                </div>
                            </div>
                            {/* <a class="carousel-control-prev" href="#product-carousel" data-slide="prev">
                                <i class="fa fa-2x fa-angle-left text-dark"></i>
                            </a>
                            <a class="carousel-control-next" href="#product-carousel" data-slide="next">
                                <i class="fa fa-2x fa-angle-right text-dark"></i>
                            </a> */}
                        </div>
                    </div>

                    <div class="col-lg-7 pb-5">
                        <h3 class="font-weight-semi-bold">{products!=undefined && products.product.name}</h3>
                        <div class="d-flex mb-3">
                            <div class="text-primary mr-2">
                                <small class="fas fa-star"></small>
                                <small class="fas fa-star"></small>
                                <small class="fas fa-star"></small>
                                <small class="fas fa-star-half-alt"></small>
                                <small class="far fa-star"></small>
                            </div>
                            <small class="pt-1">(50 Reviews)</small>
                        </div>
                        <h3 class="font-weight-semi-bold mb-4">${products!=undefined && products.product.price}</h3>
                        <p class="mb-4"></p>
                        <div class="d-flex align-items-center mb-4 pt-2">
                            <div class="input-group quantity mr-3" style={{width: "130px"}}>
                                <div class="input-group-btn">
                                    <button class="btn btn-primary btn-minus" onClick={minusQuantity}>
                                    <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                <input type="text" class="form-control bg-secondary text-center" value={quantity} onChange={(e)=>setQuantity(+e.target.value)}/>
                                <div class="input-group-btn">
                                    <button class="btn btn-primary btn-plus" onClick={addQuantity}>
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <button class="btn btn-primary px-3" onClick={saveCart}><i class="fa fa-shopping-cart mr-1"></i> Add To Cart</button>
                        </div>
                        <div class="d-flex pt-2">
                            <p class="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                            <div class="d-inline-flex">
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
                                    <i class="fab fa-pinterest"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row px-xl-5">
                    <div class="col">
                        <div class="nav nav-tabs justify-content-center border-secondary mb-4">
                            <a class="nav-item nav-link active" data-toggle="tab" href="#tab-pane-1">Description</a>
                        </div>
                        <div class="tab-content">
                            <div class="tab-pane show active" id="tab-pane-1">
                                <h4 class="mb-3">Product Description</h4>
                                <h5>Size: {products!=undefined && products.product.width} x {products!=undefined && products.product.length} x {products!=undefined && products.product.height} (mm)</h5>
                                <h5>Description: {products!=undefined && products.product.description}</h5>
                                <h5>Quantity: {products!=undefined && products.product.quantity}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Shop Detail End --> */}
            <Footer />
        </>
    )
}
export default Detail;