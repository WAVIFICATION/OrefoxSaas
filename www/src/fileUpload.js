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
import {DropzoneDialog} from 'material-ui-dropzone'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';



const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2),
      },
    absolute: {
        top:theme.spacing(0.5),
        bottom: theme.spacing(10),
        right: theme.spacing(2),
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
      },
      formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
      },
      formControlLabel: {
        marginTop: theme.spacing(1),
      },
      dialogtext:{
        marginTop:theme.spacing(4)
      }
  }));
  
export default function FormDialog() {
  const classes = useStyles();  
  const [open, setOpen] = React.useState(false);
  const [files,setFiles] = React.useState([]);
  const [selection,setSelection] = React.useState(null)
  const [ProjectName,setProjectName]=React.useState("")
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('');
  const [projectData, setProjectData] = React.useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  const handleSave=(files)=> {
    //Saving files to state for further use and closing Modal.
    setFiles(files)
    setOpen(false)
}

    

  const handleOpen = () => {
    setOpen(false);  
  };

  const onChangeHandler=(event)=>{

    console.log(event.target.files)
    setSelection(event.target.files)

}


  fetch('/api/ListProjectFiles')
      .then(response => response.json())
      .then(data => {setProjectData(data);console.log(projectData)});
  
      console.log(projectData.map((item) => <li>{item}</li>))

  return (
    <div>
        <Tooltip title="Add New Project" aria-label="add" onClick={handleClickOpen}>
        <Fab variant="extended" size="small">
          <AddIcon className={classes.extendedIcon} />
            File Upload
        </Fab>
        </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Please Enter the Following Details to Create a New Project
          </DialogContentText>
          <form className={classes.form} noValidate method="post">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="Project Name">Project Name</InputLabel>
              <Select
                autoFocus
                onChange={handleMaxWidthChange}
                inputProps={{
                  name: 'Project Name',
                  id: 'Project Name',
                }}
              >
                {/* 

                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
                
                */}
              </Select>
              <DialogContentText className={classes.dialogtext}>
              Upload Your File
              </DialogContentText>
                <input type="file" className={classes.form} multiple onChange={onChangeHandler}/>

            </FormControl>
          </form>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {/* <Link to="/"> */}
          <Button onClick={handleOpen} color="primary">
            Confirm
          </Button>
          {/* </Link> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}


