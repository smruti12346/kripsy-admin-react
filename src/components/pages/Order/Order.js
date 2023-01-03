import { Table, TableBody, TableCell, TableContainer, TableRow,Button, TableHead, TextField, TablePagination, TableFooter } from "@mui/material";
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
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

//let ThermalPrinterEncoder = require('thermal-printer-encoder')
// const ThermalPrinter = require("../node-thermal-printer").printer;
// const PrinterTypes = require("../node-thermal-printer").types;
import { Br, Cut, Line, Printer, Text, Row, render } from 'react-thermal-printer';
const Order = () => {   
    const [open, setOpen] =useState(false)
    const [order, setOrder] = useState()
    const [content, setContent] = useState(null)
    const [data, setData] = useState(null)
    // pagination state 
    const [links, setLinks] = useState({})
    const [total, setTotal] = useState(0)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
   //pagination end
    const componentRef = useRef(null)
    const cartItems = useCart()
     
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

    const ready = useReactToPrint({
        content: () => componentRef.current,
        documentTitle:  "Invoice",
        onAfterPrint: (item) => setOpen(false),
    })
     const sendData = async(item) => {        
        setOpen(true)
        setContent(item)       
        setTimeout(()=>{
            ready()
        },500)
     }
    useEffect(()=>{
      axios.get(`${url}/order?page=${page + 1}&per_page=${rowsPerPage}`).then((res)=>{
        setLinks(res.data.data.links)
        setTotal(res.data.data.total)
        setOrder(res.data.data.data)
        setData(res.data.data.data)
      }).catch((error)=>{
         console.log(error)
      })
    },[cartItems.isEmpty, rowsPerPage, page])
    const handleSearch = (event) => {
        let search = event.target.value
       let searchItem = data.filter((item) => {
           return item.customer_number.includes(search)
        })
        setOrder(searchItem)
    }
    return (
        <>
        <BackDrop status={open}/>
       <div ref={componentRef} className="media">
          <Invoice  content={content}/>
       </div>
       <ThermalPrint/>
         <div style={{marginTop: '80px'}}>
            <form className="d-none d-sm-inline-block form-inline mx-2 my-2 my-md-0 mw-100 navbar-search float-right" >
              <div className="input-group">
                {/* <TextField label="search by number" onChange={(event) => handleSearch(event)} size="small" placeholder="Ex: 1234567890"/> */}
                <input
                  type="text"
                  className="form-control bg-light"
                  placeholder="Search by number..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  onChange={(event) => handleSearch(event)}
                  style={{zIndex: 0}}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary button-outlined-0 float-right" type="button" style={{zIndex: 0}}>
                    <SearchOutlinedIcon />
                  </button>
                </div>
              </div>
            </form>
          </div> 
          <TableContainer> 
            <Table >   
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
             <TableFooter>
             
             </TableFooter>
             </Table>
             <TablePagination
      component="div"
      count={total}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
            </TableContainer>      
        </>
    )
}
export default Order