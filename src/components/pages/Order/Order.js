import { Table, TableBody, TableCell, TableContainer, TableRow,Button, TableHead } from "@mui/material";
import React, {useState, useEffect} from "react";
import { useCart } from "react-use-cart";
import url from "../../../config";
import axios from "axios";
import PrintIcon from '@mui/icons-material/Print';
import Invoice from "../../Invoice/Invoice";
import { useRef } from "react";
import ReactToPrint,{ useReactToPrint } from "react-to-print";
import "./Order.css"
import BackDrop from "../../backDrop/BackDrop";
import ThermalPrint from "../../thermalPrint/ThermalPrint";
const Order = () => {
    
    const [open, setOpen] =useState(false)
    const [order, setOrder] = useState()
    const [content, setContent] = useState(null)
    const componentRef = useRef(null)
    const cartItems = useCart()
    const ready = useReactToPrint({
        content: () => componentRef.current,
        documentTitle:  "Invoice",
        onAfterPrint: (item) => setOpen(false),
    })
     const sendData = (item) => {
        setOpen(true)
        setContent(item)       
        setTimeout(()=>{
            ready()
        },500)
     }
    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    //     documentTitle:  "Invoice",
    //     onAfterPrint: () => console.log("print success"),
    // })
    useEffect(()=>{
        //console.log(handlePrint())
    },[])

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
        <BackDrop status={open}/>
       <div ref={componentRef} className="media">
          <Invoice  content={content}/>
       </div>
       <ThermalPrint/>
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
                (<TableRow key={item.id}>
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
                        {JSON.parse(item.items).map((place_item ,id)=>  
                                                  <>
                                                    <p key={id}>{place_item.product_name} × <span className="text-danger">({place_item.quantity})</span></p>
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
                        <Button size="small" className="ml-1" onClick={() => sendData(item)}><PrintIcon/></Button>
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