import { Stack,Chip, Table, TableBody, TableCell, TableContainer, TableRow,Button,InputLabel, TableHead, TextField, TablePagination, TableFooter, Select, ListItem, MenuItem, FormControl } from "@mui/material";
import React, {useState, useEffect, useMemo, useRef} from "react";
import { useCart } from "react-use-cart";
import url from "../../../config";
import axios from "axios";
import PrintIcon from '@mui/icons-material/Print';
import Invoice from "../../Invoice/Invoice";
import ReactToPrint,{ useReactToPrint } from "react-to-print";
import BackDrop from "../../backDrop/BackDrop";
import ThermalPrint from "../../thermalPrint/ThermalPrint";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import QRCode from 'qrcode.react';
import {channel} from '../../../services/pusher'
import { orderUpdate } from "../../../services/order";
import auth from "../../../auth";
const Kitchen = () => {  
     
    const [path, setPath] = useState('/kitchen')
    const [open, setOpen] =useState(false)
    const [order, setOrder] = useState()
    const [content, setContent] = useState(null)
    const [data, setData] = useState()
    // pagination state 
    const [links, setLinks] = useState({})
    const [total, setTotal] = useState(0)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [count, setCount] = useState(0)
    const [allData, setAllData] = useState([])
    const [editable, setEditable] = useState()
    const [top, setTop] = useState('80px')
   //pagination end
   const styles = {
    borderBottomGreen: {
       'borderBottom': '1px solid green',
       'borderTop' : '1px solid green',
    },
 }
    const componentRef = useRef(null)
    const cartItems = useCart()

    const reference = useRef()
    //let allData = [];
   
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
        setPath(window.location.pathname)
        if(window.location.pathname == '/sub-admin/kitchen'){
          setTop('10px')
        }
        console.log(window.location.pathname)
     },[])
     
    useEffect(()=>{
      axios.get(`${url}/order?page=${page + 1}&per_page=${rowsPerPage}`).then((res)=>{
        setLinks(res.data.data.links)
        setTotal(res.data.data.total)
        setOrder(res.data.data.data)
        setData(res.data.data.data)
        //allData.push(res.data.data.data)
      }).catch((error)=>{
         console.log(error)
      })
    },[page, rowsPerPage])
    const handleSearch = (event) => {
        let search = event.target.value
       let searchItem = data.filter((item) => {
           return item.customer_number.includes(search)
        })
        setOrder(searchItem)
    }
    useMemo(()=>{
     channel.bind('order-event', function(pushdata) {
        console.log(pushdata)
        //setAllData([pushdata.order.data, ...allData]);
        //setAllData(pushdata.order.data)
        setLinks(pushdata.order.links)
        setTotal(pushdata.order.total)
        setOrder(pushdata.order.data)
        setData(pushdata.order.data)
      });     
    },[])
    const StackElement = () => {
      return (
        <><Stack direction="row" spacing={1}>
       <Chip label="Clickable"  />
       <Chip label="Clickable" variant="outlined"  />
        </Stack></>
      )
    }
    const handleEditable = (event) => {
      //  event.target.firstElementChild = <StackElement/>
      //  console.log(event)
    }
    const handleOrderChange = (id, event) => {
        setOpen(true)
        orderUpdate(id, event.target.value).then((res)=> {
          setOpen(false)
            console.log(res);
        }).catch((error)=>{
          console.log(error)
        })

    }
    const handleOrderStatus = (event) => {
          console.log(event)
    }
    const logout = () => {
      const token = localStorage.getItem('token')
      setOpen(true)      
      axios.post(`${url}/logout`,{'token': token}).then((res)=>{
        setOpen(false)
        localStorage.removeItem('token')
        window.location.href = "/"        
      }).catch((error)=>{
        console.log(error)
      })
   }
    return (
        <>        
        <BackDrop status={open}/>
       <div ref={componentRef} className="media">
          <Invoice  content={content}/>
       </div>
         <div className="container" style={ {marginTop: top}}>
            <div className="mt-4">
               <Button variant="outlined" onClick={logout}>Logout</Button>
            </div>
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
          <TableContainer className="container"> 
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
                        Order Date
                    </TableCell>
                    <TableCell>
                        Order Status
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
                        {item.created_at}
                    </TableCell>
                    <TableCell onClick={(event) => handleEditable(event)}>
                      <FormControl sx={{width: '130px'}}>
                        <InputLabel>Order Status</InputLabel>
                      <Select label="Order Status" onChange={(event) => handleOrderChange(item.id, event)} value={item.order_status} size="small"> 
                          <MenuItem value="1">Placed</MenuItem>
                          <MenuItem value="2">Confirmed</MenuItem>
                          <MenuItem value="3">Complete</MenuItem>
                          <MenuItem value="0">Cancel</MenuItem>
                      </Select>
                      </FormControl>
                    </TableCell>
                    {/* <TableCell>
                        <Button size="small" className="ml-1" onClick={() => sendData(item)}><PrintIcon/></Button>
                    </TableCell> */}
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
            {/* <QRCode value="https://www.google.com/search?q=G-01%2C+Raghunath+city+Mall%2C+Maal+road%2C+Almora+krispy+chicken&rlz=1C1YTUH_enIN1019IN1019&oq=G-01%2C+Raghunath+city+Mall%2C+Maal+road%2C+Almora+krispy+chicken&aqs=chrome..69i57.14958j0j7&sourceid=chrome&ie=UTF-8#lrd=0x39a0b1ee5b75e3c7:0x8e5f24bbe6c560a,1,,," renderAs="canvas"/>    */}
        </>
    )
}
export default Kitchen