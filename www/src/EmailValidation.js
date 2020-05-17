import React,{Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import  { Redirect } from 'react-router-dom'
import Projects from './projects'
import { withStyles } from "@material-ui/core/styles";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.orefox.com/">
        Orefox Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});




class EmailValidation extends Component{
  constructor (props){
    super(props)
    this.state={tosignin: false,errormsg:"",email:"",password:""}
    }

    handleChange = event => {
      this.setState({ [event.target.name]:event.target.value })
      }

      
    
      handleSubmit = event => {
        event.preventDefault()
        const url = "/api/ForgotPassword"
        const data={email:this.state.email}
          fetch(url, { 
            method: "POST", 
            // credentials: "include",
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(data),
            redirect:"follow",
            headers:{ 
            "Content-Type": "application/json" } })
            .then(res => res.json(data))
            .catch(error => console.error("Error:", error))
            .then(res => {console.log(res);if (res===true) { this.setState(() => ({
              tosignin: true}));
          } else {this.setState(() => ({
                errormsg: "Error"}));}})}
        
    

  render(){
    const { classes } = this.props;
    if (this.state.tosignin === true) {
      return <Redirect to='/signin' />}

      return(
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset password: Stage 1
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={this.handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {this.handleSubmit}
            > 
            Send recovery e-mail
          </Button>
          
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    )
  }
}

export default withStyles(styles, { withTheme: true })(EmailValidation);

