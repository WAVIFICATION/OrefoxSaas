import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DropzoneDialogExample from './dropzone'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2),
      },
    absolute: {
        top:theme.spacing(0.5),
        bottom: theme.spacing(10),
        right: theme.spacing(2),
      },
  }));
  
export default function FormDialog() {
  const classes = useStyles();  
  const [open, setOpen] = React.useState(false);
  const [ProjectName,setProjectName]=React.useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const url = "http://54.252.132.199/api/CreateProject"
  const data =  {ProjectName:ProjectName}
    

  const handleOpen = () => {
    fetch(url, { 
      method: "POST", 
      body: JSON.stringify(data), 
      redirect:"follow",
      headers:{ 
      "Content-Type": "application/json" } })
      .then(res => res.json(data))
      .then(res=>console.log(res));
    setOpen(false);
    console.log(ProjectName)
      
  };
  const handleClose = (e) => {
    setOpen(false);
    
  };
  


  return (
    <div>
       <Tooltip title="Add" aria-label="add" onClick={handleClickOpen}>
            <Fab color="primary" aria-label="edit" className={classes.absolute}>
                <AddIcon />
            </Fab>
        </Tooltip> 
        
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter the Following Details to Create a New Project
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
            onChange={e=>setProjectName(e.target.value)}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Link to="/">
          <Button onClick={handleOpen} color="primary">
            Confirm
          </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}