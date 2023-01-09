import React, {useState, useEffect} from "react";
import FilterListIcon from '@mui/icons-material/FilterList';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CartModal from "../cartModal/CartModal";
import { Badge } from "@mui/material";
import { useCart } from "react-use-cart";
import auth, {auth_check} from "../../auth";
const Navbar = () => {
  const [check, setCheck] = useState(false)
  const [btn, setBtn] = useState(1)
  const cartItems = useCart()
  const count = cartItems.totalItems
  const openCart = () => {
     setCheck(true)
     setBtn(btn + 1)
  }
  useEffect(() => {
    if(auth){
      auth_check.then((res)=>{
         if(res.data.user.type == 1){
             console.log('reson too many request')
            //  window.location.href = "/"
         }else if(res.data.user.type == 2){
              window.location.href = "/sub-admin/kitchen"
         }
      }).then((error)=>{
          console.log(error)
      })
      
   }else{
      console.log('false')
   }
   
  }, []);
  return (
    <>
      <CartModal cart={check} btn={btn}/>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow-sm osahan-nav-top fixed-top">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars"></i>
        </button>

        <ul className="navbar-nav">
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-search fa-fw"></i>
            </a>

            <div
              className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown"
            >
            </div>
          </li>

          <li className="nav-item dropdown no-arrow mx-2 osahan-t-loc">
            <a
              className="nav-link dropdown-toggle text-dark"
              href="#"
              data-toggle="modal"
              data-target="#addressModal"
            >
              <span className="mdi mdi-crosshairs-gps"></span>
              {/* <span className="ml-2">San Frnciso, california</span> */}
            </a>
          </li>

          {/* <li className="nav-item dropdown no-arrow mx-2 osahan-t-pu">
            <a className="nav-link dropdown-toggle text-dark" href="orders.html">
              <i className="mdi mdi-shopping text-danger"></i>
              <span className="ml-2">Pick up</span>
            </a>
          </li>

          <li className="nav-item dropdown no-arrow mx-2 osahan-t-bd">
            <a
              className="nav-link dropdown-toggle text-dark"
              data-toggle="modal"
              data-target="#mycoupansModal"
              href="#"
            >
              <i className="mdi mdi-sack-percent text-warning"></i>
              <span className="ml-2">Best Deals</span>
            </a>
          </li> */}
        </ul>

        <div className="ml-auto">
          <a
            href="#"
            className="btn btn-primary "
            data-toggle="modal"
            data-target="#filtersModal"
          >  
          <FilterListIcon />        
          </a>
          <a
            onClick={openCart}
            className="btn btn-danger ml-2"
            data-toggle="modal"
            data-target="#cartModal"
          >
            <Badge badgeContent={count} color="primary">
              <ShoppingCartOutlinedIcon style={{color: '#fff'}}/>
            </Badge>
          </a>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
