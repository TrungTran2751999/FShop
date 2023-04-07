import { useState, useEffect } from "react";
import port from "../util/until";
import Navbar from "../layout/navbar";
import axios from "axios";
import { NavLink , useNavigate} from "react-router-dom";
import { useToast, immediateToast } from "izitoast-react";
import "izitoast-react/dist/iziToast.css";

function Login(){
    let navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    function getCookie(cookieName) {
        let cookie = {};
        document.cookie.split(';').forEach(function(el) {
          let [key,value] = el.split('=');
          cookie[key.trim()] = value;
        })
        return cookie[cookieName];
      }
    function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    useEffect(()=>{
        let admin = localStorage.getItem("admin");
        if(admin!=null){
            async function check(){
                let res = await axios.post(port+"auth/check",JSON.parse(admin)).then((res)=>{
                    return navigate("/");
                }).catch(()=>{
                    return navigate("/login")
                })
            }
            check();
        }else{
            return navigate("/login");
        }
    },[])
    const handleLogin = ()=>{
        let data = {username,password};
        let res = axios.post(port+"auth/login",data).then((res)=>{
            setCookie("JWT", res.data.token);
            let admin = localStorage.getItem("admin");
            let info = {
                username:res.data.username, 
                password: res.data.password
            }
            if(admin===null){
                localStorage.setItem("admin",JSON.stringify(info));
            }
            navigate("/");
        }).catch(()=>{
            document.querySelector(".error").innerHTML = "Username or password is wrong. Please check again"
        })
    }
    return(
        <body class="bg-primary">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                                    <div class="card-body">
                                        <div>
                                            <div class="form-floating mb-3">
                                                <input class="form-control" id="inputEmail" type="email" placeholder="name@example.com" value={username} onChange={(e)=>setUserName(e.target.value)}/>
                                                <label for="inputEmail">Admin</label>
                                            </div>
                                            <div class="form-floating mb-3">
                                                <input class="form-control" id="inputPassword" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                                <label for="inputPassword">Password</label>
                                            </div>
                                            <div className="error" style={{color:"red"}}></div>
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                                <label class="form-check-label" for="inputRememberPassword">Remember Password</label>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a class="small" href="password.html">Forgot Password?</a>
                                                <button class="btn btn-primary" onClick={handleLogin}>Login</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer text-center py-3">
                                        <div class="small"><a href="register.html">Need an account? Sign up!</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Your Website 2022</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="js/scripts.js"></script>
        </body>
    )
}
export default Login