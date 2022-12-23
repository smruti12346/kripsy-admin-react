import React, {useEffect, useState} from "react";
import { Backdrop, CircularProgress } from "@mui/material";
const BackDrop = (props) => {
    const [open, setOpen] = useState(false)
   const handleClose = () => {
        setOpen(false)
    }
    useEffect(()=>{
       setOpen(props.status)
    },[props])
    return (
        <>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        >
        <CircularProgress color="inherit" />
        </Backdrop> 
        </>
    )
}
export default BackDrop