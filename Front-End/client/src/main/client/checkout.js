import HeadNotSlide from "../../layout/client/headNotSlider";
import Footer from "../../layout/client/footer";
import { useEffect,useState } from "react";
import axios from "axios";
import port from "../../util/util";
import { NavLink } from "react-router-dom";
import { useToast, immediateToast } from "izitoast-react";
import "izitoast-react/dist/iziToast.css";
function CheckOut(){
    const [listCart, setCart] = useState([]);
    const [sum, setSum] = useState(0);
    const [subTotal, setSubtotal] = useState(0);
    const [listProvince, setListProvince] = useState({});
    const [listDistrict, setListDistrict] = useState({});
    const [listWard, setListWard] = useState({});
    
    const [province, setProvince] = useState("0");
    const [district, setDistrcit] = useState("0");
    const [ward, setWard] = useState("0");

    const [provinceName, setProvinceName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [wardName, setWardName] = useState("");
    const [data, setData] = useState();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [listCartBooking, setListCartBooking] = useState([]);
    const [isPayment, setPayment] =useState(false);
    useEffect(()=>{
        setSubtotal(sum+10);
    },[sum]);
    useEffect(()=>{
        let list = localStorage.getItem("listCart");
        setCart(JSON.parse(list));
        async function getProvince(){
            let res = await axios.get("https://vapi.vnappmob.com/api/province/");
            setListProvince(res.data);
        }
        getProvince();
    },[])
    useEffect(()=>{
        let total = 0;
        let list = [];
        for(let i=0; i<listCart.length; i++){
            total+=listCart[i].price*listCart[i].quantity;
            let cartBooking = {
                productId: listCart[i].id,
                quantity: listCart[i].quantity  
            }
            list.push(cartBooking)
        }
        setListCartBooking(list);
        setSum(total);
    },[listCart])
    
    useEffect(()=>{
         async function getDistrict(id){
            let res = await axios.get(`https://vapi.vnappmob.com/api/province/district/${id}`);
            setListDistrict(res.data);
         }
         getDistrict(province);
         let provinceElement = document.getElementById("province");
         let provinceText = provinceElement.options[provinceElement.selectedIndex].text;
         setProvinceName(provinceText);
    },[province])
    useEffect(()=>{
        async function getWard(id){
            let res = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${id}`);
            setListWard(res.data);
        }
        getWard(district);
        let districtElement = document.getElementById("district");
        let districtText = districtElement.options[districtElement.selectedIndex].text;
        setDistrictName(districtText);
    },[district])
    useEffect(()=>{
        let wardElement = document.getElementById("ward");
        let wardText = wardElement.options[wardElement.selectedIndex].text;
        setWardName(wardText);
    },[ward])
    function updateProvince(value){
        setProvince(value);
        setListDistrict([]);
        setListWard([]);
        setDistrcit("0");
        setWard("0");
    }
    function updateDistrict(value){
        setDistrcit(value)
        setListWard([]);
        setWard("0");
    }
    function payMentCarts(){
        let data = {
            "listCartBooking":listCartBooking,
            "customerDTO":{
                name:name,
                email: email,
                phone: phone,
                address:{
                    provinceId: +province,
                    provinceName: provinceName,
                    districtId: +district,
                    districtName: districtName,
                    wardId: +ward,
                    wardName: wardName,
                    address: address
                }
            },
            "address": address,
            "province": +province,
            "district": +district,
            "ward": +ward
        }
        setData(data);
        setPayment(true);
    }

    useEffect(()=>{
        let listCart = JSON.parse(localStorage.getItem("listCart"));
        let errorKey = ["name", "email", "phone", "address", "province", "district", "ward"];
        async function payMent(){
            for(let i=0; i<errorKey.length; i++){
                document.querySelector(".error-"+errorKey[i]).innerHTML = "";
            }
            if(data != undefined && listCart!=null && listCart.length > 0){
                let res = await axios.post(port+"cart",data).then((res)=>{
                    immediateToast("info",{
                        title: "Success",
                        message: res.data,
                        theme: "light",
                        color:"green"
                    })
                    localStorage.setItem("listCart", JSON.stringify([]));
                }).catch((res)=>{
                    let errors = res.response.data;
                    for(let error in errors){
                        if(error.split(".").length == 2){
                            document.querySelector(".error-"+error.split(".")[1]).innerHTML = errors[error];
                        }else{
                            document.querySelector(".error-"+error.split(".")[0]).innerHTML = errors[error];
                        }  
                    }
                });
            }else if(data != undefined && (listCart!=null || listCart.length < 0)){
                immediateToast("info",{
                    title: "Error",
                    message: "Cart is not exist. Please check cart",
                    theme: "light",
                    color:"red"
                })
            }
        }
        payMent();
        
    },[data]);
    return (
        <>
            <HeadNotSlide 
                isPayment = {isPayment}
            />
            {/* <!-- Page Header Start --> */}
            <div class="container-fluid bg-secondary mb-5">
                <div class="d-flex flex-column align-items-center justify-content-center" style={{minHeight: "300px"}}>
                    <h1 class="font-weight-semi-bold text-uppercase mb-3">Checkout</h1>
                    <div class="d-inline-flex">
                        <p class="m-0"><a href="">Home</a></p>
                        <p class="m-0 px-2">-</p>
                        <p class="m-0">Checkout</p>
                    </div>
                </div>
            </div>
            {/* <!-- Page Header End --> */}

            {/* <!-- Checkout Start --> */}
            <div class="container-fluid pt-5">
                <div class="row px-xl-5">
                    <div class="col-lg-8">
                        <div class="mb-4">
                            <h4 class="font-weight-semi-bold mb-4">Billing Address</h4>
                            <div class="row">
                                <div class="col-md-6 form-group">
                                    <label>Name</label>
                                    <input class="form-control" type="text" placeholder="Trung" value={name} onChange={(e)=>setName(e.target.value)}/>
                                    <div className="error-name" style={{color:"red"}}></div>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>E-mail</label>
                                    <input class="form-control" type="text" placeholder="example@email.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    <div className="error-email" style={{color:"red"}}></div>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Mobile No</label>
                                    <input class="form-control" type="text" placeholder="+123 456 789" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                                    <div className="error-phone" style={{color:"red"}}></div>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Province</label>
                                    <select id="province" class="custom-select" value={province} onChange={(e)=>updateProvince(e.target.value)}>
                                        <option value="0" disabled>---Select province---</option>
                                        {listProvince.results!=undefined && listProvince.results.map((item)=>{
                                            return (
                                                <option value={item.province_id}>{item.province_name}</option>
                                            )
                                        })}
                                    </select>
                                    <div className="error-province" style={{color:"red"}}></div>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>District</label>
                                    <select id="district" class="custom-select" value={district} onChange={(e)=>updateDistrict(e.target.value)}>
                                        <option value="0" disabled>---Select district---</option>
                                        {listDistrict.results!=undefined && listDistrict.results.map((item)=>{
                                            return (
                                                <option value={item.district_id}>{item.district_name}</option>
                                            )
                                        })}
                                    </select>
                                    <div className="error-district" style={{color:"red"}}></div>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Ward</label>
                                    <select id="ward" class="custom-select" value={ward} onChange={(e)=>setWard(e.target.value)}>
                                        <option value="0" disabled>---Select ward---</option>
                                        {listWard.results!=undefined && listWard.results.map((item)=>{
                                            return (
                                                <option value={item.ward_id}>{item.ward_name}</option>
                                            )
                                        })}
                                    </select>
                                    <div className="error-ward" style={{color:"red"}}></div>
                                </div>
                                <div class="col-md-6 form-group">
                                    <label>Address</label>
                                    <input class="form-control" type="text" placeholder="New York" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                                    <div className="error-address" style={{color:"red"}}></div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-lg-4">
                        <div class="card border-secondary mb-5">
                            <div class="card-header bg-secondary border-0">
                                <h4 class="font-weight-semi-bold m-0">Order Total</h4>
                            </div>
                            <div class="card-body">
                                <h5 class="font-weight-medium mb-3">Products</h5>
                    {/* -------------------------------CART----------------------------- */}
                                {listCart.length>0 && listCart.map((item)=>{
                                    return(
                                        <div class="d-flex justify-content-between">
                                            <p>{item.name}</p>
                                            <p>{item.price*item.quantity}</p>
                                        </div>
                                    )
                                })}
                    {/* -------------------------------CART----------------------------- */}
                                <hr class="mt-0"/>
                                <div class="d-flex justify-content-between mb-3 pt-1"/>
                                    <h6 class="font-weight-medium">Subtotal</h6>
                                    <h6 class="font-weight-medium">
                                        ${sum}
                                    </h6>
                                </div>
                            </div>
                            <div class="card-footer border-secondary bg-transparent">
                                <div class="d-flex justify-content-between mt-2">
                                    <h5 class="font-weight-bold">Total</h5>
                                    <h5 class="font-weight-bold">${subTotal}</h5>
                                </div>
                            </div>
                            <div class="col-md-6 form-group">
                                <button class="btn btn-primary btn-block border-0 py-3" type="submit" onClick={payMentCarts}>Payment</button>
                            </div>
                        </div>
                    </div>
            </div>
            {/* <!-- Checkout End --> */}
            <Footer />
        </>
    )
}
export default CheckOut;