import React from "react";
import { useEffect } from "react";
const Invoice = (props) => {
    useEffect(()=>{
       console.log(props)
    },[])
  return (
    <>
      <div className="container bootdey mt-5 bg-white mx-auto" style={{width: '100%', height: window.innerHeight}}>
        <div className="row invoice row-printable">
          <div className="col-md-12">
            <div className="panel panel-default plain" id="dash_0">
              <div className="panel-body p30">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="invoice-logo"><img src="https://krispychicken.co/image/logo/logo.png" height="60px"/></div>
                  </div>
                  <div className="col-lg-6">
                    <div className="invoice-from">
                      <ul className="list-unstyled text-right">
                        <li>Dash LLC</li>
                        <li>2500 Ridgepoint Dr, Suite 105-C</li>
                        <li>Austin TX 78754</li>
                        <li>VAT Number EU826113958</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="invoice-details mt25">
                      <div className="well">
                        <ul className="list-unstyled mb0">
                          <li>
                            {/* <strong>Invoice</strong> #{props.content.id} */}
                          </li>
                          <li>
                            <strong>Invoice Date:</strong> {props.content.created_at}
                          </li>
                          <li>
                            <strong>Status:</strong>{" "}
                            <span className="label label-danger">PAID</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="invoice-to mt25">
                      <ul className="list-unstyled">
                        <li>
                          <strong>Invoiced To</strong>
                        </li>
                        <li>{props.content.customer_name}</li>
                        <li>{props.content.customer_number}</li>
                      </ul>
                    </div>
                    <div className="invoice-items">
                      <div
                        className="table-responsive"
                        style={{overflow: 'hidden', outline: 'none'}}
                        tabindex="0"
                      >
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th className="per70 text-center">Items</th>
                              <th className="per5 text-center">Price</th>
                              <th className="per5 text-center">Qty</th>
                              <th className="per25 text-center">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {JSON.parse(props.content.items).map((item)=>                            
                            (<tr>
                              <td>
                                {item.product_name}
                              </td>
                              <th className="per5 text-center">Rs {item.price}</th>
                              <td className="text-center">{item.quantity}</td>
                              <td className="text-center">Rs {item.price * item.quantity}</td>
                            </tr>)
                            )}
                          </tbody>
                          <tfoot>
                            <tr>
                              <th colspan="2" className="text-right">
                                Sub Total:
                              </th>
                              <th className="text-center">Rs {props.content.total_cost}</th>
                            </tr>
                            <tr>
                              <th colspan="2" className="text-right">
                                5% GST:
                              </th>
                              <th className="text-center">Rs {props.content.total_cost * 5/100}</th>
                            </tr>
                            <tr>
                              <th colspan="2" className="text-right">
                                Credit:
                              </th>
                              <th className="text-center">$00.00 USD</th>
                            </tr>
                            <tr>
                              <th colspan="2" className="text-right">
                                Total:
                              </th>
                              <th className="text-center">$284.4.40 USD</th>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                    <div className="invoice-footer mt25">
                      <p className="text-center">
                        Generated on Monday, October 08th, 2015{" "}
                        <a href="#" className="btn btn-default ml15">
                          <i className="fa fa-print mr5"></i> Print
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Invoice
