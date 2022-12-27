import React, {useEffect, useState} from "react";
import { Button, Dialog,DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, TextField,MenuItem, FormHelperText } from "@mui/material";
import swal from "sweetalert";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { getCategory } from "../../../services/category";
import './product.css'
import axios from "axios";
import url from "../../../config";
import BackDrop from "../../backDrop/BackDrop";

const EditProductDialog = (props) => {
    const [open, setOpen] = useState(false)
    const [category, setCategory] = useState(null)
    const [slug, setSlug] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
       setOpen(props.status)  
    },[props])
    const handleClose = () => {
         setOpen(false)
    }
    const handleUpload = () => {
        document.getElementById('file').click()
    }
    const handleDialogClose = () =>{ 
         setOpen(false)
    }
    const slugify = str =>
       str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
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
            slug: slug,
            description: '',
            price: '',
            sale_price: '',
            product_type: '',
            position: '',
            image: '',
            category_id: ''
        },
        validationSchema: Yup.object({
            product_name: Yup.string().min(3).required().label('Product Name'),
            slug: Yup.string().min(3).required(),
            description: Yup.string(),
            price: Yup.string('price must be a number').matches(/^[0-9]+$/ ,'Please enter correct price').required(),
            sale_price: Yup.string('sale price must be a number').matches(/^[0-9]+$/ ,'Please enter correct price').required().label('Sale Price'),
            product_type: Yup.string().required().label('Product Type'),
            position: Yup.string().matches(/^[0-9]+$/, 'Please enter correct number').required(),
            image: Yup.mixed().required(),
            category_id: Yup.number().required().label('category id')
        }),
        onSubmit: (values) => {
         setIsLoading(true)
           let formData = new FormData()
           formData.append('product_name', values.product_name)
           formData.append('slug',values.slug)
           formData.append('description', values.description)
           formData.append('price', values.price)
           formData.append('sale_price', values.sale_price)
           formData.append('product_type', values.product_type)
           formData.append('position', values.position)
           formData.append('image', values.image)
           formData.append('category_id', values.category_id)

           axios.post(`${url}/product`, formData).then((res)=>{
            setOpen(false)
            setIsLoading(false)
               console.log(res)
                swal({
                  title: 'Success',
                  text: 'Product Added Success!',
                  icon: 'success',
                  button: 'OK'
                }).then((response)=>{
                  if(response){
                     window.location.href = '/products'
                  }
                })
                console.log(res)
             }).catch((error)=>{
               setOpen(false)
               setIsLoading(false)
                console.log(error)
             })
        },
    })
    const handleProductName = (event) => {
      formik.values.slug = event.target.values
      setSlug(slugify(event.target.value))
      return formik.values.slug = slugify(event.target.value)
     
    }
    const handleProductAdd = () => {
       formik.handleSubmit();
       console.log(formik)
        
     }
    return (
        <>
          <BackDrop status={isLoading}/>
          <Dialog open={open} onClose={handleClose}>
             <DialogTitle className="text-center">
                Add Product
             </DialogTitle>
             <DialogContent className="py-3">
                 <div className="d-flex mb-2">
                   <TextField label="product name" sx={{maxWidth: 222,}} name="product_name" onChange={ (event) => {
                      formik.handleChange(event) 
                      handleProductName(event)}
                      } size="small" helperText={formik.errors.product_name}/>
                   <TextField label="slug" size="small" value={slug} name="slug" className="ml-2" onChange={formik.handleChange} helperText={formik.errors.slug}/> 
                 </div>
                 <div className="d-flex mb-2">
                  <TextField label="description" name="description" size="small" focused onChange={formik.handleChange} helperText={formik.errors.description}/>
                  <TextField label="price" size="small" name="price" className="ml-2" onChange={formik.handleChange} helperText={formik.errors.price}/>
                 </div>
                  <div className="d-flex mb-2">
                    <TextField label="sale price" name="sale_price" size="small" onChange={formik.handleChange} helperText={formik.errors.sale_price}/> 
                    <TextField label="position" name="position" size="small" className="ml-2" onChange={formik.handleChange} helperText={formik.errors.position}/>
                  </div>
                  <div className="d-flex">
                  <FormControl size="small" sx={{minWidth: 222}}>
                    <InputLabel>product type</InputLabel>
                     <Select label="product type" name="product_type" onChange={formik.handleChange} >
                        <MenuItem>--select product type--</MenuItem>
                        <MenuItem value="veg">veg</MenuItem>
                        <MenuItem value="non-veg">non-veg</MenuItem>
                     </Select>
                     <FormHelperText>{formik.errors.product_type}</FormHelperText>
                  </FormControl>
                  <FormControl size="small" sx={{minWidth: 222}} className="ml-2">
                    <InputLabel>category</InputLabel>
                     <Select label="Category" name="category_id" onChange={formik.handleChange}>
                        <MenuItem>--select category--</MenuItem>
                        {category && category.map((item)=>
                              <MenuItem key={item.id} value={item.id}>{item.cat_name}</MenuItem>
                         )
                        }
                     </Select>
                     <FormHelperText>{formik.errors.category_id}</FormHelperText>
                  </FormControl>
                  </div>   
                  <div className="mx-auto mt-4 text-center">
                    <input type="file" name="image" id="file" className="d-none" onChange={(event) => formik.setFieldValue('image', event.target.files[0])}/>
                    <Button onClick={handleUpload} variant="contained" color="info" className="mx-auto" size="small">Upload Image</Button>  
                    <p className="text-center">{formik.values.image.name}</p>
                    <FormHelperText className="text-center">{formik.errors.image}</FormHelperText>
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

export default EditProductDialog;