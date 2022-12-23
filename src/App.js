import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./components/pages/Home/Home";
import Category from "./components/pages/Category/Category";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/pages/Login/Login";
import { CartProvider } from "react-use-cart";
import Products from "./components/pages/Products/Products";
import  auth  from "./auth";
import { useEffect } from "react";
import Order from "./components/pages/Order/Order";
function App() {
  const path = window.location.pathname;
  console.log('auth', auth)
  //const navigate = useNavigate()
  useEffect(()=>{
   
    // if(!auth){
    //     navigate("/login")
    //   }else{
    //     navigate("/")
    //   }
  },[])
  return (
   <CartProvider>
    <Router>
      <Routes>
           <Route exact path="/login" element={<Login />} />
      </Routes>
      {path === "/login" ? null : (
        <>
          <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Navbar />
                <Routes>
                  <Route exact path="/" element={auth ? <Home /> : window.location.href = "/login"} />
                  <Route exact path="/category" element={<Category />} />
                  <Route exact path="/products" element={<Products />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/order" element={<Order />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </div>
        </>
      )}
    </Router>
    </CartProvider>
  );
}

export default App;
