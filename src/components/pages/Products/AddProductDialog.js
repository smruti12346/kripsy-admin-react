import React, {useEffect, useState} from "react";
import { Button, Dialog,DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, TextField,MenuItem } from "@mui/material";
import { addProduct } from "../../../services/product";
import swal from "sweetalert";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { getCategory } from "../../../services/category";
import './product.css'
const AddProductDialog = (props) => {
    const [open, setOpen] = useState(false)
    const [category, setCategory] = useState(null)
    useEffect(()=>{
       setOpen(props.status)  
    },[props.count])
    const handleClose = () => {
         setOpen(false)
    }
    const handleUpload = () => {
        document.getElementById('file').click()
    }
    const handleDialogClose = () =>{ 
         setOpen(false)
    }
    
    useEffect(()=>{
       getCategory.then((res)=>{
          setCategory(res.data.result)
       }).catch((error)=>{
          console.log(error)
       })
    },[])
    const formik = useFormik({
        initialValues: {
            product_name: '',
            slug: '',
            description: '',
            price: '',
            sale_price: '',
            product_type: '',
            image: '',
            category_id: ''
        },
        validationSchema: Yup.object({
            product_name: Yup.string().min(3).required().label('Product Name'),
            slug: Yup.string().min(3).required(),
            description: Yup.string(),
            price: Yup.number().required(),
            sale_price: Yup.number().required().label('Sale Price'),
            product_type: Yup.string().required().label('Product Type'),
            image: Yup.mixed().required(),
            category_id: Yup.number().required()
        }),
        onSubmit: (values) => {
            console.log(values)
            // addProduct(values).then((res)=>{
            //     swal({
            //       title: 'Success',
            //       text: 'Product Added Success!',
            //       icon: 'success',
            //       button: 'OK'
            //     })
            //     console.log(res)
            //  }).catch((error)=>{
            //     console.log(error)
            //  })
        }
    })

    const handleProductAdd = () => {
       formik.handleSubmit();
        
     }
    return (
        <>
          <Dialog open={open} onClose={handleClose}>
             <DialogTitle className="text-center">
                Add Product
             </DialogTitle>
             <DialogContent className="py-3">
                 <div className="d-flex mb-2">
                   <TextField label="product name" sx={{maxWidth: 222,}} name="product_name" onChange={formik.handleChange} size="small" helperText={formik.errors.product_name}/>
                   <TextField label="slug" size="small" name="slug" className="ml-2" onChange={formik.handleChange} helperText={formik.errors.slug}/> 
                 </div>
                 <div className="d-flex mb-2">
                  <TextField label="description" name="description" size="small" onChange={formik.handleChange} helperText={formik.errors.description}/>
                  <TextField label="price" size="small" name="price" className="ml-2" onChange={formik.handleChange}/>
                 </div>
                  <div className="d-flex mb-2">
                    <TextField label="sale price" name="sale_price" size="small" onChange={formik.handleChange}/> 
                    <TextField label="position" size="small" className="ml-2" onChange={formik.handleChange}/>
                  </div>
                  <div className="d-flex">
                  <FormControl size="small" sx={{minWidth: 222}}>
                    <InputLabel>product type</InputLabel>
                     <Select label="product type" name="product_type" onChange={formik.handleChange}>
                        <MenuItem value="veg">veg</MenuItem>
                        <MenuItem value="non-veg">non-veg</MenuItem>
                     </Select>
                  </FormControl>
                  <FormControl size="small" sx={{minWidth: 222}} className="ml-2">
                    <InputLabel>category</InputLabel>
                     <Select label="product type" name="product_type" onChange={formik.handleChange}>
                        <MenuItem>--select category--</MenuItem>
                        {category && category.map((item)=>
                              <MenuItem key={item.id} value={item.id}>{item.cat_name}</MenuItem>
                         )
                        }
                     </Select>
                  </FormControl>
                  </div>   
                  <div className="mx-auto mt-4 text-center">
                    <input type="file" name="image" id="file" className="d-none"/>
                    <Button onClick={handleUpload} variant="contained" color="info" className="mx-auto" size="small">Upload Image</Button>  
                  </div>              
             </DialogContent>
             <DialogActions className="mt-4">
                <Button size="small" variant="outlined" onClick={handleDialogClose}>Cancel</Button>
                <Button size="small" variant="outlined" onClick={handleProductAdd}>Add Product</Button>
             </DialogActions>
          </Dialog>
        </>
    )
}
export default AddProductDialog