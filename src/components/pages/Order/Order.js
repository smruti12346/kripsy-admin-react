import { Table, TableBody, TableCell, TableContainer, TableRow,Button, TableHead } from "@mui/material";
import React, {useState, useEffect} from "react";
import { useCart } from "react-use-cart";
import url from "../../../config";
import axios from "axios";
import PrintIcon from '@mui/icons-material/Print';
import Invoice from "../../Invoice/Invoice";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./Order.css"
const Order = () => {
    const cartItems = useCart()
    const [order, setOrder] = useState()
    const [content, setContent] = useState(null)
    const componentRef = useRef(null)
     const sendData = (item) => {
        console.log(item)
        setContent(item)
     }
    const handlePrint =  useReactToPrint({
        content: () => componentRef.current,
        documentTitle:  "Invoice",
        onAfterPrint: () => console.log("print success"),
    })

    useEffect(()=>{
      axios.get(`${url}/order`).then((res)=>{
        console.log(res.data.data)
         setOrder(res.data.data)
      }).catch((error)=>{
         console.log(error)
      })
      console.log('perfect side  effect')
    },[cartItems.isEmpty])
    return (
        <>
         <div ref={componentRef} className="media">
            <Invoice content={content}/>
         </div>
          <TableContainer > 
            <Table style={{marginTop: '80px'}}>   
             <TableHead>
             <TableRow>
                    <TableCell>
                        Order Id
                    </TableCell>
                    <TableCell>
                        Mobile No
                    </TableCell>
                    <TableCell>
                       Name
                    </TableCell>
                    <TableCell>
                        Items  
                    </TableCell>
                    <TableCell>
                        Total Price
                    </TableCell>
                    <TableCell>
                        Order Status
                    </TableCell>
                    <TableCell>
                        Order Date
                    </TableCell>
                    <TableCell className="text-center">
                        Billing
                    </TableCell>
                </TableRow>
            </TableHead>            
             <TableBody>
             
                {order && order.map((item)=>               
                (<TableRow>
                    <TableCell>
                        #{item.id}
                    </TableCell>
                    <TableCell>
                         {item.customer_number}
                    </TableCell>
                    <TableCell>
                        {item.customer_name}
                    </TableCell>
                    <TableCell>
                        {JSON.parse(item.items).map((place_item)=>  
                                                  <>
                                                    <p>{place_item.product_name} × <span className="text-danger">({place_item.quantity})</span></p>
                                                  {/* `${place_item.product_name}(${place_item.quantity}),` */}
                                                  </>
                                    )}
                    </TableCell>
                    <TableCell>
                        {item.total_cost}
                    </TableCell>
                    <TableCell>
                        {item.order_status === 1 ? 'Placed' : null}
                        {item.order_status === 2 ? 'Confirmed' : null}
                        {item.order_status === 3 ? 'Complete' : null}
                    </TableCell>
                    <TableCell>
                        {item.created_at}
                    </TableCell>
                    <TableCell>
                        <Button size="small" className="ml-1" onClick={() => {sendData(item); handlePrint(item);}}><PrintIcon/></Button>
                    </TableCell>
                </TableRow>)
                )}
             </TableBody>
             </Table>
            </TableContainer>      
        </>
    )
}
export default Order