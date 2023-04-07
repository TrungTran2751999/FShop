import HeadNotSlide from "../../layout/client/headNotSlider";
import Footer from "../../layout/client/footer";
import { useEffect,useState } from "react";
import axios from "axios";
import port from "../../util/util";
import { NavLink } from "react-router-dom";
function Cart(){
    const [listCart, setListCart]= useState([]);
    const [sum, setSum] = useState(0);
    const [isAddCart, setIsAddCart] = useState(false);
    useEffect(()=>{
        if(localStorage.getItem("listCart")!=null){
            let list = JSON.parse(localStorage.getItem("listCart"));
            setListCart(list);
        }
    },[])
    useEffect(()=>{
        let total = 0;
        for(let i=0; i<listCart.length; i++){
            total+=listCart[i].price*listCart[i].quantity;
        }
        setSum(total);
    },[listCart])
    function handleDeleteCart(id){
        let list = [...listCart]
        let close = document.getElementById(`close${id}`);
        for(let i=0; i<list.length; i++){
            if(id===list[i].id){
                list.splice(i,1);
                break;
            }
        }
        setListCart(list);
        close.click();
        localStorage.setItem("listCart", JSON.stringify(list));
        setIsAddCart(true);
    }
    return (
        <>  
            <HeadNotSlide isAddCart={isAddCart} />
            {/* <!-- Cart Start --> */}
            <div class="container-fluid pt-5">
                <div class="row px-xl-5">
                    <div class="col-lg-8 table-responsive mb-5">
                        <table class="table table-bordered text-center mb-0">
                            <thead class="bg-secondary text-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody class="align-middle">
                                {listCart.length > 0 && listCart.map((item)=>{
                                    return (
                                        <tr>
                                        <td class="align-middle">{item.name}</td>
                                        <td class="align-middle">${item.price}</td>
                                        <td class="align-middle">{item.quantity}</td>
                                        <td class="align-middle">${item.price*item.quantity}</td>
                                        <td class="align-middle"><button class="btn btn-sm btn-primary" data-toggle="modal" data-target={`#exampleModal${item.id}`}><i class="fa fa-times"></i></button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div class="col-lg-4">
                        <form class="mb-5" action="">
                            <div class="input-group">
                                <input type="text" class="form-control p-4" placeholder="Coupon Code"/>
                                <div class="input-group-append">
                                    <button class="btn btn-primary">Apply Coupon</button>
                                </div>
                            </div>
                        </form>
                        <div class="card border-secondary mb-5">
                            <div class="card-header bg-secondary border-0">
                                <h4 class="font-weight-semi-bold m-0">Cart Summary</h4>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between mb-3 pt-1">
                                    <h6 class="font-weight-medium">Subtotal</h6>
                                    <h6 class="font-weight-medium">${sum}</h6>
                                </div>
                            </div>
                            <div class="card-footer border-secondary bg-transparent">
                                <div class="d-flex justify-content-between mt-2">
                                    <h5 class="font-weight-bold">Total</h5>
                                    <h5 class="font-weight-bold">${sum}</h5>
                                </div>
                                <NavLink to="/check-out" className="btn btn-block btn-primary my-3 py-3">Proceed To Checkout</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Cart End --> */}
            {listCart.length > 0 && listCart.map(item=>{
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
                            Do you want cart has name that is {item.name};
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={()=>handleDeleteCart(item.id)}>Delete</button>
                        </div>
                        </div>
                    </div>
                    </div>
                )
            })}
            <Footer />
        </>
    )
}
export default Cart;