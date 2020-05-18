import React, { Component } from 'react';
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
import { withStyles } from "@material-ui/core/styles";




const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        }},
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
  });

  class FeedBack extends Component{
    constructor(props){
      super(props)
      this.state={open:false,files:[],selection:null,ProjectName:"",fullWidth:true,maxWidth:'',projectData:[],name:[],value:'Controlled'}
    }

    handleClose = (e) => {
      this.setState({open:false});
      
    };
    handleOpen = (e) => {
      this.setState({open:true});
      
    };
    handleClickOpen = () => {
      this.setState({open:true});
      console.log(this.state.open)
    };
  

    
      render(){
        const { classes } = this.props;
        return(
          <div>
        <Tooltip title="Add New Project" aria-label="add" onClick={this.handleClickOpen}>
        <Fab variant="extended" size="small">
          <AddIcon className={classes.extendedIcon} />
            FeedBack
        </Fab>
        </Tooltip>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Write us your views and suggestions
          </DialogContentText>
          <DialogContentText>
          <div>
          <form className={classes.root} noValidate autoComplete="off">
          <TextField
          id="filled-multiline-static"
          label="Suggestions"
          multiline
          rows={4}
          variant="filled"
        />
        </form>
        </div> 
          </DialogContentText>
          
        </DialogContent>
        
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          {/* <Link to="/"> */}
          <Button onClick={this.handleOpen} color="primary">
            Confirm
          </Button>
          {/* </Link> */}
        </DialogActions>
      </Dialog>
    </div>
        )
      }

    }

    export default withStyles(styles, { withTheme: true })(FeedBack);
  