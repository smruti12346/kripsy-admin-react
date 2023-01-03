import { Table, TableCell, TableContainer, TableFooter, TableHead, TableRow, Button } from "@mui/material";
import React, {useEffect, useState} from "react";
import { getProduct } from "../../../services/product";
import { getCategory } from "../../../services/category";
import url, { img_path } from "../../../config";
import AddProductDialog from "./AddProductDialog";
import swal from "sweetalert";
import axios from 'axios'
import BackDrop from "../../backDrop/BackDrop";
import EditProductDialog from "./EditProductDialog";
const Products = () => {
    const [data, setData] = useState()
    const [category, setCategory] = useState()
    const [open,setOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [status, setStatus] = useState(false)
    const [count, setCount] = useState(0)
    const [editId, setEditId] = useState(null);
    useEffect(()=>{     
         getProduct.then((res)=>{
            setIsLoading(false)
            setData(res.data.data)
         }).catch((err)=>{
            setIsLoading(false)
            console.log(err)
         })
         getCategory.then((res)=>{
            setCategory(res.data.result)
         }).catch((error)=>{
            console.log(error)
         })
    },[count])
    useEffect(()=>{
        setIsLoading(false) 
    },[])
    const handleProductAdd = () => {
        setOpen(!open)   
    }
    const handleEdit = (id) => {
        setEditId(id)
        setEditOpen(!editOpen)
        setCount(count + 1)
        //console.log(id)
        setStatus(true)
    }
    const handleDelete = (id) => {
        swal({
            title: 'Are you sure!',
            icon: 'warning',
            text: 'Once you are deleted not recovered.',
            buttons: true,
            dangerMode: true
        }).then((res=>{
            setIsLoading(true)
            if(res){
                axios.delete(`${url}/product/${id}`).then((result)=>{
                    axios.get(`${url}/product`).then((result)=>{
                        setData(result.data.data)
                    })
                    setCount(count + 1)
                    setIsLoading(false)
                    swal({
                        title: 'Delete Success!',
                        icon: 'success',
                        button: true
                    })
                }).catch((error)=>{
                    setIsLoading(false)
                    swal({
                        title: 'Error ocured',
                        icon: 'error',
                        button: true
                    })
                })
            }else{
                setIsLoading(false) 
            }
        }))
    }
    return (
        <>
        <EditProductDialog status={editOpen} id={editId}/>
        <BackDrop status={isLoading}/>
          <AddProductDialog status={open} count={count}/>
          <div className="container" style={{marginTop: '80px'}}>
          <Button className="float-right" color="primary" variant="contained" onClick={handleProductAdd} size="small">Add Product</Button>
              <TableContainer>
                  <Table>
                     <TableHead>
                         <TableRow>
                            <TableCell>
                                Sr No.
                            </TableCell>
                            <TableCell>
                                Product Name
                            </TableCell>
                            <TableCell>
                                Description
                            </TableCell>
                            <TableCell>
                                MRP
                            </TableCell>
                            <TableCell>
                                Price
                            </TableCell>
                            <TableCell>
                               Product Type
                            </TableCell>
                            <TableCell>
                                Product Image
                            </TableCell>
                            <TableCell>
                                Category
                            </TableCell>
                            <TableCell>
                                Action
                            </TableCell>
                         </TableRow>
                         {data && data.map((item, id)=> 
                         (<TableRow>
                            <TableCell>
                               {id + 1}
                            </TableCell>
                            <TableCell>
                                {item.product_name}
                            </TableCell>
                            <TableCell>
                                {item.description}
                            </TableCell>
                            <TableCell>
                                {item.sale_price}
                            </TableCell>
                            <TableCell>
                            {item.price}
                            </TableCell>
                            <TableCell>
                                {item.product_type}
                            </TableCell>
                            <TableCell>
                                <img src={`${img_path}/product/${item.image}`} style={{width: '80px'}}/>
                                
                            </TableCell>
                            <TableCell>
                                {                                   
                                    category && category.find((cat_item)=> cat_item.id === item.category_id).cat_name
                                }                                   
                            </TableCell>
                            <TableCell>
                                <div className="d-flex">
                                <Button size="small" variant="outlined" onClick={() => handleEdit(item.id)}>Edit</Button>  
                                <Button size="small" variant="outlined" className="ml-2" onClick={() => handleDelete(item.id)}>Delete</Button>  
                                </div>                             
                            </TableCell>
                         </TableRow>)
                         )}
                     </TableHead>
                     <TableFooter>

                     </TableFooter>
                  </Table>

              </TableContainer>

          </div>
        </>
    )
}
export default Products