import React, {useState} from "react";
import { Alert, Drawer, TextField} from "@mui/material";
import { useEffect } from "react";
import { useCart } from "react-use-cart";
import * as Yup from 'yup'
import { useFormik } from "formik";
import BackDrop from "../backDrop/BackDrop";
import axios from "axios";
import url from "../../config";
import swal from "sweetalert";
const CheckoutModal = (props) => {
    const cartItems = useCart()
    const [open, setOpen] = useState(false)
    const [cardStatus, setCardStatus] = useState(false)
    const [codStatus, setCodStatus] = useState(true)
    const [paypalStatus, setPaypalStatus] = useState(false)
    const [dropStatus, setDropStatus] = useState(false)
    const formik = useFormik({
      initialValues: {
        name: '',
        mobile: ''
      },
      validationSchema: Yup.object({
        name: Yup.string().min(3),
        mobile: Yup.string().matches(/^\d{10}$/,'Please Enter 10 digit valid phone number').required(),
      }),
      onSubmit: function(values){
         console.log(values)
         setDropStatus(true)
         let data = {
            customer_name: values.name,
            customer_number: values.mobile,
            items: JSON.stringify(cartItems.items),
            total_cost: cartItems.cartTotal
         }
         console.log(data);
         axios.post(`${url}/order`, data).then((res)=>{
             setDropStatus(false)
             setOpen(false)
             swal("Placed!", "You order is successfully placed!", "success");
             cartItems.emptyCart()
             console.log(res)
         }).catch((error)=>{
             console.log(error);
         })
      }
    })
    useEffect(()=>{
        setOpen(props.btn)
    },[props.count])
    const handleClose = () => {
        setOpen(false)
    }
    const handleCod = () => {
      setCardStatus(false)
      setPaypalStatus(false)
      setCodStatus(true)
    }
    const handleCard = () =>{
      setCardStatus(true)
      setPaypalStatus(false)
      setCodStatus(false)
    }
    const handlePaypal = () => {
      setPaypalStatus(true)
      setCardStatus(false)
      setCodStatus(false)
    }
    const handlePayment = () => {
     document.getElementById('codForm').submit()
    }

  return (
    <>
      <BackDrop status={dropStatus}/>
      <Drawer open={open} anchor="right" onClose={handleClose}>
      <div
        id="checkoutModal"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Checkout
              </h5>
              <button
                type="button"
                className="close"
                onClick={handleClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              
              <p className="text-dark mb-2 small">Payment methods</p>
              <div
                className="btn-group btn-group-toggle mb-3"
                data-toggle="buttons"
              >
                <label className={`btn osahan-radio btn-light btn-sm rounded ${cardStatus? 'active' : null}`}>
                  <input type="radio" name="options" id="option1"  onClick={handleCard}/>{" "}
                  <i className="mdi mdi-credit-card-outline"></i> Card
                </label>
                <label className={`btn osahan-radio btn-light btn-sm rounded ${codStatus? 'active' : null}`} >
                  <input type="radio" name="options" id="option2" onClick={handleCod}/>{" "}
                  <i className="mdi mdi-currency-usd"></i> COD
                </label>
                <label className={`btn osahan-radio btn-light btn-sm rounded ${paypalStatus? 'active' : null}`}>
                  <input type="radio" name="options" id="option3" onClick={handlePaypal}/>{" "}
                  <i className="fab fa-paypal"></i> Paypal
                </label>
              </div>
              {cardStatus ? 
              (<>
              <h6 className="mb-3">
                My cards <span className="small">(2)</span>
              </h6>
              <div
                className="btn-group btn-group-toggle osahan-card"
                data-toggle="buttons"
              >
                <label className="btn osahan-radio osahan-card-pay btn-light btn-sm rounded mb-2 active w-100">
                  <input type="radio" name="options" id="option1" checked />
                  <div className="d-flex align-items-center card-detials small mb-3">
                    <p className="small">
                      <i className="mdi mdi-chip"></i>
                    </p>
                    <p className="ml-auto d-flex align-items-center">
                      <span className="card-no mr-2">
                        <i className="mdi mdi-circle"></i>{" "}
                        <i className="mdi mdi-circle"></i>{" "}
                        <i className="mdi mdi-circle"></i>{" "}
                        <i className="mdi mdi-circle"></i>
                      </span>
                      <span className="small">1211</span>
                    </p>
                  </div>
                  <h1 className="mb-0">Mastercard</h1>
                  <p className="small mb-1">Platinum</p>
                  <p className="text-right mb-0">
                    <i className="fab fa-cc-mastercard text-warning"></i>
                  </p>
                </label>
                <label className="btn osahan-radio osahan-card-pay btn-light btn-sm rounded mb-2 w-100">
                  <input type="radio" name="options" id="option2" />
                  <div className="d-flex align-items-center card-detials small mb-3">
                    <p className="small">
                      <i className="mdi mdi-chip"></i>
                    </p>
                    <p className="ml-auto d-flex align-items-center">
                      <span className="card-no mr-2">
                        <i className="mdi mdi-circle"></i>{" "}
                        <i className="mdi mdi-circle"></i>{" "}
                        <i className="mdi mdi-circle"></i>{" "}
                        <i className="mdi mdi-circle"></i>
                      </span>
                      <span className="small">2277</span>
                    </p>
                  </div>
                  <h1 className="mb-0">Visa Debit</h1>
                  <p className="small mb-1">Plantinum</p>
                  <p className="text-right mb-0">
                    <i className="fab fa-cc-visa"></i>
                  </p>
                </label>
              </div>
              <form id="cardForm">
              <TextField name="Phone" size="small" label="*Phone Number"/>
              <TextField name="name" size="small" label="Full Name" className="ml-3"/>
              <TextField name="card" size="small" label="Card Number" className="mt-4"/>
              <TextField name="cvv" size="small" label="CVV Code" className="ml-3 mt-4"/>
              </form>
              </>): null }
              {codStatus ? 
              (
                <>
                  <form id="codForm">
                    <div>
                  <TextField name="name" size="small" label="Full Name" onChange={formik.handleChange}/>
                  <p><span className="text-danger">{formik.touched && formik.errors && formik.errors.name}</span></p>
                  </div>
                  <div>
                  <TextField name="mobile" size="small" label="*Phone Number" onChange={formik.handleChange}/>
                  <p><span className="text-danger">{formik.touched && formik.errors && formik.errors.mobile}</span></p>
                  </div>
                  </form>
                </>
              ): null           
              }
              {paypalStatus ? 
              (
                <>
                 <form id="paypalForm">
                  <TextField name="Phone" size="small" label="*Phone Number"/>
                  <TextField name="name" size="small" label="Full Name" className="ml-3"/>
                </form>
                </>
              ): null
              }
            </div>
            <div className="modal-footer justify-content-start">
              <a onClick={codStatus ? formik.handleSubmit : null} className="btn btn-primary btn-block text-white">
                Confirm payment (₹ {parseFloat(cartItems.cartTotal) + parseFloat(cartItems.cartTotal * 5/100)})
              </a>
            </div>
          </div>
        </div>
      </div>
      </Drawer>
    </>
  );
};
export default CheckoutModal;
