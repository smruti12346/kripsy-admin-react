import React, {useState,  useEffect} from "react";
import { Drawer } from "@mui/material";
import { useCart } from "react-use-cart";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { img_path } from "../../config";
import {Button, ButtonGroup} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckoutModal from "../checkoutModal/CheckoutModal";
const CartModal = (props) => {
  const cartItems = useCart()
  const [check, setCheck] = useState(false)
  const [checkoutBtn, setCheckoutBtn] = useState(false)
  const [count, setCount] = useState(1)
  useEffect(()=>{
     setCheck(props.cart)
  },[props.btn])
  const cartClose = () => {
     setCheck(prevCheck => ! prevCheck)
  }
  const removeItem = (id) => {
    cartItems.removeItem(id)
  }

  const addQty = (id) => {
     cartItems.updateItemQuantity(id, cartItems.getItem(id).quantity + 1)
  }
  const removeQty = (id) => {
    cartItems.updateItemQuantity(id, cartItems.getItem(id).quantity - 1)
  }
  const addMore = () => {
     setCheck(false)
     console.log('hello add more')
     window.location.href = "/"
  }
  const handleCheckout = () => {
     setCheckoutBtn(true)
     setCheck(false)
     setCount(count + 1)
  }
  return (
    <>
    <CheckoutModal btn={checkoutBtn} count={count}/>
    <Drawer open={check} anchor="right" onClose={cartClose}>
      <div id="cartModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                My cart <span className="small">({cartItems.totalItems} items)</span>
                {cartItems.isEmpty ? null :
                (<Button  onClick={()=> cartItems.emptyCart()} className="small text-danger" style={{marginLeft: '60px', fontSize: '12px'}}>Empty Cart</Button>)}
              </h5>
              <button
                type="button"
                className="close"
                onClick={cartClose}
              >
                <span aria-hidden="true" >&times;</span>
              </button>
            </div>
            <div className="modal-body osahan-my-cart">
              {/* <a
                href="#"
                className="text-dark d-flex align-items-center mb-3"
                data-toggle="modal"
                data-target="#myaddressModal"
              >
                <div>
                  <p className="mb-0 text-danger">Delivered to</p>
                  <p className="mb-0 small">300 Post Street San Francico, CA</p>
                </div>
                <div className="ml-auto">
                  <p className="mb-0 text-info">
                    Edit<i className="mdi h6 m-0 mdi-chevron-right"></i>
                  </p>
                </div>
              </a> */}
              <div className="details-page pt-3 osahan-my-cart-item">
                {cartItems.items && cartItems.items.map((item)=> 
                (<div className="d-flex align-items-center mb-3">
                  <div className="mr-2">
                    <img style={{width: '50px'}} src={`${img_path}/product/${item.image}`} className="img-fluid rounded" />
                  </div>
                  <div className="small text-black-50">{item.quantity} x</div>
                  <div className="ml-2">
                    <p className="mb-0 text-black">{item.product_name}</p>
                    <p className="mb-0 small">₹ {item.sale_price}
                    
                    </p>
                  </div>
                  <div className="ml-auto d-flex">
                  <ButtonGroup className="mt-2" variant="outlined" color="warning" size="small">
                       <Button size="small" onClick={() => removeQty(item.id)}>
                         <RemoveIcon style={{fontSize: '16px'}} />                        
                       </Button>
                        <Button size="small">
                           {item.quantity}
                        </Button>
                       <Button size="small" onClick={() => addQty(item.id)}>
                         <AddIcon  style={{fontSize: '16px'}} />
                       </Button>
                   </ButtonGroup>
                  <Button className="ml-auto" onClick={() => removeItem(item.id)}>
                    <DeleteOutlineIcon color="warning" />
                  </Button>
                  </div>
                </div>)
                 )}
                <div className="my-3">
                  <a
                    href="#"
                    onClick={addMore}
                    className="text-primary"
                  >
                    <i className="mdi mdi-plus mr-2" ></i> Add more items
                  </a>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-start osahan-my-cart-footer">
              <div className="row w-100">
                <div className="col-12 pr-0">
                {cartItems.cartTotal != 0 ?
                  (<button
                    className="btn btn-primary btn-block"
                    onClick={handleCheckout}
                  >                    
                      {`Checkout (₹ ${cartItems.cartTotal})`}
                  </button>)
                  : null
                 }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Drawer>
    </>
  );
};
export default CartModal
