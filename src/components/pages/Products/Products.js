import { Table, TableCell, TableContainer, TableFooter, TableHead, TableRow, Button } from "@mui/material";
import React, {useEffect, useState} from "react";
import { getProduct } from "../../../services/product";
import { getCategory } from "../../../services/category";
import { img_path } from "../../../config";
import AddProductDialog from "./AddProductDialog";
const Products = () => {
    const [data, setData] = useState()
    const [category, setCategory] = useState()
    const [open,setOpen] = useState(false)
    const [count, setCount] = useState(0)
    useEffect(()=>{     
         getProduct.then((res)=>{
            setData(res.data.data)
         }).catch((err)=>{
            console.log(err)
         })
         getCategory.then((res)=>{
            setCategory(res.data.result)
         }).catch((error)=>{
            console.log(error)
         })
    },[])
    const handleProductAdd = () => {
        setOpen(true) 
        setCount(count + 1)   
    }
    return (
        <>
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
                                Price
                            </TableCell>
                            <TableCell>
                                Sale Price
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
                                {item.price}
                            </TableCell>
                            <TableCell>
                            {item.sale_price}
                            </TableCell>
                            <TableCell>
                                {item.product_type}
                            </TableCell>
                            <TableCell>
                                <img src={`${img_path}/product/${item.image}`} style={{width: '80px'}}/>
                                
                            </TableCell>
                            <TableCell>
                                {                                   
                                    category.find((cat_item)=> cat_item.id === item.category_id).cat_name
                                }                                   
                            </TableCell>
                            <TableCell>
                                <div className="d-flex">
                                <Button size="small" variant="outlined">Edit</Button>  
                                <Button size="small" variant="outlined" className="ml-2">Delete</Button>  
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