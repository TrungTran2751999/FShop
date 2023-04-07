import { NavLink } from "react-router-dom";
function Sidebar(){
    return (
        <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">Core</div>
                            <NavLink className="nav-link" to="/" exact>
                                <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </NavLink>
{/* ----------------------------------PRODUCT START------------------------------------------------------------ */}
                            <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#product" aria-expanded="false" aria-controls="collapseLayouts">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Product
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="product" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <NavLink className="nav-link loadDataTable" to="/product" exact>Show</NavLink>
                                    <NavLink className="nav-link" to="/product-create">Create</NavLink>
                                </nav>
                            </div>
{/* ----------------------------------PRODUCT END------------------------------------------------------------ */}

{/* ----------------------------------CART START------------------------------------------------------------ */}
                            <NavLink className="nav-link collapsed" to="/cart">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Cart
                            </NavLink>
{/* ----------------------------------CART END------------------------------------------------------------ */}
{/* ----------------------------------CATEGORY START------------------------------------------------------------ */}
                            <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#category" aria-expanded="false" aria-controls="collapseLayouts">
                                <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                Category
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="category" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <NavLink className="nav-link" to="/category" exact>Show</NavLink>
                                    <NavLink className="nav-link" to="/category-create">Create</NavLink>
                                </nav>
                            </div>
{/* ----------------------------------CATEGORY END------------------------------------------------------------ */}                           
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">Logged in as:</div>
                        Start Bootstrap
                    </div>
                </nav>
        </div>
    )
}
export default Sidebar;