import React,{useEffect, useState} from "react";
import {TableContainer, Table, TableBody, TableCell, TableFooter, TableRow, TablePagination, Button} from '@mui/material'
import DialogBox from "./DialogBox";
import { getCategory } from "../../../services/category";
import { img_path } from "../../../config";
import axios from "axios";
import swal from "sweetalert";
import url from "../../../config";
import EditDialog from "./EditDialog";
import { singleData } from "../../store";
import { useRecoilState } from "recoil";
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
    const [editOpen, setEditOpen] = useState(false);
    const [ecount, setEcount] = useState(0)
    const [id, setId] = useState(null);
    const [single, setSingle] = useRecoilState(singleData)
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
    const handleDelete = (id) => {
        swal({
            text: 'Are you want to delete!',
            icon: 'warning',
            buttons: true
        }).then((bool)=>{
            if(bool){
                  axios.delete(`${url}/category/${id}`).then((res)=> {
                        setData(data.filter((item)=>{
                             return item.id != id 
                        }))
                       swal({
                          text: 'Category delete Success',
                          icon: 'success'
                       })
                  }).catch((error)=>{
                      console.log(error)
                  })
            }
        })
        
    }
    const handleEdit = (id) => {
        console.log('test',id)
        console.log('fff')
        setEditOpen(true)
        setEcount(ecount + 1)
        setId(id)
    }
    return (
        <>
        {editOpen ? (<EditDialog status={editOpen} box1={ecount} id={id}/>) : null }
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
                                    <Button variant="outlined" size="small" onClick={() => handleEdit(item.id)}>Edit</Button>
                                    <Button variant="outlined" className="ml-2" size="small" onClick={() => handleDelete(item.id)}>Delete</Button>
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