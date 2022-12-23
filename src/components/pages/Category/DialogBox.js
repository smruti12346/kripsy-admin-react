import React, { useEffect, useState, useContext } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Input, TextField } from "@mui/material";
import './Category.css'
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
    return (
        <>         
          <Dialog open={open} onClose={handleClose}>
             <DialogTitle className="text-center bg-light">Add Category</DialogTitle>
             <DialogContent className="p-4">
                  <TextField name="title" variant="filled" label="Category Name" className="m-2"/><br/>
                  <input type="file" name="image" className="d-none" id="image"/>
                  <div className="text-center">
                  <Button variant="contained" size="small" onClick={handleInput}>Upload Image</Button>
                  </div>
             </DialogContent>
             <DialogActions className="bg-light">
                <Button variant="outlined" color="info" onClick={handleClose} size="small">Cancel</Button>
                <Button variant="outlined" size="small" color="success">Add</Button>
             </DialogActions>
          </Dialog>      
        </>
    )
}
export default DialogBox;