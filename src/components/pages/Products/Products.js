import { Table, TableCell, TableContainer, TableFooter, TableHead, TableRow, Button } from "@mui/material";
import React, {useEffect, useState} from "react";
import { getProduct } from "../../../services/product";
import { getCategory } from "../../../services/category";
import { img_path } from "../../../config";
const Products = () => {
    const [data, setData] = useState()
    const [category, setCategory] = useState()
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
    return (
        <>
          <div className="container">
              <TableContainer>
                  <Table sx={{marginTop: '80px'}}>
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