import React,{useEffect, useState} from "react";
import {TableContainer, Table, TableBody, TableCell, TableFooter, TableRow, TablePagination, Button} from '@mui/material'
import DialogBox from "./DialogBox";
import { getCategory } from "../../../services/category";
import { img_path } from "../../../config";
const Category = () => {
//     const data = [
//         {name: 'rolls', image: 'abc.jpg'},
//         {name: 'rolls', image: 'abc.jpg'},
//         {name: 'rolls', image: 'abc.jpg'},
//         {name: 'rolls', image: 'abc.jpg'},
//         {name: 'rolls', image: 'abc.jpg'},        
//     ]
    const [count, setCount] = useState(0)
    const [open,setOpen] = useState(false)
    const [data, setData] = useState(null)
    const handleOpen = () =>{
      setOpen(true)
      setCount(count + 1)
    }
    const handleChangePage = () => {
      console.log('handle change')
    }
    const handleChangeRowsPerPage = () => {
        console.log('handle change');
    }
    useEffect(()=>{
      getCategory.then((res)=>{
          setData(res.data.result)
      }).catch((error)=>{
            console.log(error)
      }) 
    },[])
    return (
        <>
          {open ? (<DialogBox status={open} box={count}/>): null  }                
        <div className="container" style={{marginTop: '80px'}}>
            <Button className="float-right" color="primary" variant="contained" size="small" onClick={handleOpen}>Add Category</Button>
         <TableContainer>
            <Table>
                <TableBody>
                   <TableRow>
                      <TableCell>
                            Sr No.
                      </TableCell>
                      <TableCell>
                            Category Name
                      </TableCell>
                      <TableCell>
                            Image
                      </TableCell>
                      <TableCell>
                            Action
                      </TableCell>
                   </TableRow>
                    {data && data.map((item, id)=>
                        (
                              <TableRow key={id}>
                              <TableCell>
                                    {id + 1}
                              </TableCell>
                              <TableCell>
                                    {item.cat_name}
                              </TableCell>
                              <TableCell>
                                   <img style={{width: '70px'}} src={`${img_path}/category/${item.image}`} />
                              </TableCell>
                              <TableCell>
                                    <Button variant="outlined">Edit</Button>
                                    <Button variant="outlined">Delete</Button>
                              </TableCell>
                           </TableRow>
                        )
                    )}
                   
                </TableBody>
                <TableFooter>
                   <TablePagination 
                   rowsPerPageOptions={[10, 25, 101]}
                   rowsPerPage={1}
                   page={2}
                   onPageChange={handleChangePage}
                   onRowsPerPageChange={handleChangeRowsPerPage}
                   >    
                   </TablePagination>
                </TableFooter>
            </Table>
         </TableContainer>
         </div>
        </>
    )
}
export default Category;