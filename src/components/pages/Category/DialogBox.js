import React, { useEffect, useState, useContext } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, TextField } from "@mui/material";
import './Category.css'
import { useFormik } from "formik";
import * as Yup from 'yup'
import axios from "axios";
import url from "../../../config";
const DialogBox = (props) => {
    const [open, setOpen] = useState(true)
    const handleClose = () => {
       setOpen(false)
    }
    const handleInput = () => {
         document.getElementById('image').click() 
    }
    useEffect(()=>{
       setOpen(props.status)
    },[props.box])

    const formik = useFormik({
       initialValues: {
           cat_name: '',
           image: '', 
       },
       validationSchema: Yup.object({
          cat_name: Yup.string().required().label('Category'),
          image: Yup.string().required()
       }),
       onSubmit: (values) => {
            let form = new FormData();
            form.append('cat_name',values.cat_name)
            form.append('image', values.image)
              axios.post(`${url}/category`,form).then((res)=> {

              }).catch((error)=>{
                 console.log(error)
              })
       }
    })
    return (
        <>         
          <Dialog open={open} onClose={handleClose}>
             <DialogTitle className="text-center bg-light">Add Category</DialogTitle>
             <DialogContent className="p-4">
                  <TextField name="cat_name" variant="filled" label="Category Name" onChange={formik.handleChange} className="m-2" helperText={formik.errors.cat_name && formik.errors.cat_name}/><br/>
                  <input type="file" name="image" className="d-none" id="image" onChange={formik.handleChange}/>
                  <div className="text-center">
                  <Button variant="contained" size="small" onClick={handleInput}>Upload Image</Button>
                  <p className="text-danger">{formik.errors.image && formik.errors.image}</p>
                  </div>
             </DialogContent>
             <DialogActions className="bg-light">
                <Button variant="outlined" color="info" onClick={handleClose} size="small">Cancel</Button>
                <Button variant="outlined" size="small" color="success" onClick={formik.handleSubmit}>Add</Button>
             </DialogActions>
          </Dialog>      
        </>
    )
}
export default DialogBox;