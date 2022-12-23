import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import React, {useState, useEffect} from "react";
import { useCart } from "react-use-cart";
import url from "../../../config";
import axios from "axios";
const Order = () => {
    const cartItems = useCart()
    const [order, setOrder] = useState()
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
          <TableContainer> 
            <Table style={{marginTop: '80px'}}>               
             <TableBody>
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
                </TableRow>
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
                        {JSON.parse(item.items).map((place_item)=> `${place_item.product_name}, `)}
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
                </TableRow>)
                )}
             </TableBody>
             </Table>
            </TableContainer>      
        </>
    )
}
export default Order