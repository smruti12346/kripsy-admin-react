import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import React,{useState, useEffect} from 'react';

const UserAddModal = (props) => {
    const [open, setOpen] = useState(true)
    useEffect(() => {
         setOpen(!open)
    }, [props]);

    const handleUser = () => {
        alert('handleUser')
    }
    return (
       <>
         <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle className='text-center'>Add User</DialogTitle>
            <DialogContent className='py-4'>
                <div className='d-flex mb-3'>
                  <TextField type="text" label="Name" name="name" size='small' className=''/>
                  <TextField type="email" label="Email" name="email" size='small' className='ml-2'/>
                </div>
                <div className='d-flex mb-3'>
                  <TextField type="text" label="User Name" name="user" size='small' className=''/>
                  <TextField type="password" label="Password" name="password" size='small' className='ml-2'/>
                </div>
                <div className='d-flex mb-3'>                  
                  <FormControl sx={{width: '222px'}}>
                    <InputLabel>select user type</InputLabel>
                    <Select size="small" label="select user type">
                        <MenuItem>--Select--</MenuItem>
                        <MenuItem value="2">kitchen</MenuItem>
                    </Select>
                  </FormControl>
                </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleUser} variant="outlined" size='small' className='mr-3'>Add User</Button>
            </DialogActions>
         </Dialog>
       </>
    );
}

export default UserAddModal;
