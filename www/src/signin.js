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
        Your Website
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




class Signin extends Component{
  constructor (props){
    super(props)
    this.state={tosignin: false,errormsg:"",email:"",password:""}
    }

    handleChange = event => {
      this.setState({ [event.target.name]:event.target.value })
      }

      
    
      handleSubmit = event => {
        event.preventDefault()
        const url = "/api/SignIn"
        const data={email:this.state.email,password:this.state.password}
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
      return <Redirect to='/projects' />}

      return(
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange = {this.handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {this.handleSubmit}
            > 
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Signin);

/*

export default function SignIn() {
  const classes = useStyles();
  const [tosignin,setToSignin]=React.useState(false)
  const [email,SetEmail] =React.useState('')
  const [error,setError] =React.useState('')
  const [password,setPassword] = React.useState('')

  const url = "http://54.252.132.199/api/SignIn"
  const data = { email:email,password:password}

  

const handleSubmit = () => {
  fetch(url, { 
    method: "POST", 
    body: JSON.stringify(data),
    redirect:"follow",
    headers:{ 
    "Content-Type": "application/json" } })
    .then(res => res.json(data))
    .catch(error => console.error("Error:", error))
    .then(res => {console.log(res);if (res===true) { Redirect() ;console.log("entering");
      } else {setError("Error") }})}

      

    const Redirect=()=>{
        console.log("entering");
        return <Link to="/projects"/>;
    }
    

   
    

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
            onChange={e=>SetEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange = {e=>setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {handleSubmit}
            > 
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    
  );
}
*/