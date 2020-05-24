import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logout from './LogOut';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import  { Redirect } from 'react-router-dom'

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center" >
        {'Copyright © '}
        <Link color="inherit" href="https://orefox.com/">
          Orefox
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  const drawerWidth = 240;
const styles = theme => ({
  
 
    root: {
        
        width: '100%',
        display: 'flex',
      },
      paper: {
        textAlign: 'flex',
        color: "black",
        display:'flex',
      },
      paper1: {
        
        textAlign: 'flex',
        color: "black",
        display:'flex',
      },
      container: {
       
        paddingBottom: theme.spacing(10),
        maxHeight: 440,
      },
      grid1:{
          backgroundColor: "black"
          
      },
      toolbar: {
        paddingRight: 10,
      },
      toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '10px 8px',
        paddingLeft : '200px 300px',
        ...theme.mixins.toolbar,
      },
     
 
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(17),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(25),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },

  });


class Dash extends Component{
    constructor(props){
        super(props)
        this.state=({projectData:[],feedbacks:[]})
    }

    handleDrawerOpen = () => {
      this.setState({open:true});
    };
  
    handleDrawerClose = () => {
      this.setState({open:false});
    };
  
    componentDidMount() {
        const url='/api/private/Check_for_Admin'
        fetch(url, { 
          method: "GET", 
          // credentials: "include",
        }).then(res => res.json())
        .catch(error => console.error("Error:", error))
          .then(res => {console.log(res);if (res===false) { this.setState(() => ({
            tosignin: true}));
        } else {this.setState(() => ({
              errormsg: "Error"}));}})

        fetch('/api/private/ListUserProjects')
          .then(response => response.json())
          .then(data => {this.setState({ projectData:data });console.log(this.state.projectData)});
          
          fetch('/api/private/ListFeedbacks')
          .then(response=>response.json())
          .then(dato=> {this.setState({ feedbacks:dato });console.log(this.state.feedbacks)})
      }
       FileDownload(Projectname, filename){
         fetch('/api/DownloadFile/'+Projectname+'/'+filename)
         .then(response => {
          response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
          });
        });
      }

    render(){
      const {open} = this.state
        const { classes } = this.props;
        const { projectData } = this.state;
        const { feedbacks } = this.state;
        if (this.state.tosignin === true) {
          return <Redirect to='/signin' />}
        return(
          <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
         
          <Typography component="h1" variant="h4" color="inherit"  align = "center" noWrap className={classes.title}>
           OreFox Dashboard
           
          </Typography>
     
            <Logout/>
          
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        classes={{

          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
<div className={classes.toolbarIcon}>
        </div>
        <Divider />
        
        <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      
      <Link  href="/" >
      <ListItemText primary="Home" />
            </Link>
    </ListItem>

      </Drawer>
      <main className={classes.content}>
      <div className={classes.appBarSpacer} />
<br/> <br/>

            <React.Fragment>
                <CssBaseline />
                <Container maxwidth="sm" className={classes.container}>
                <Grid container spacing={3} claclassName={classes.grid1}>
                <Grid item xs={12} md={8} lg={6}>
                    <Paper className={classes.root}>
                     
                    <TableContainer className={classes.container}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Project Name</TableCell>
                                    <TableCell>Files</TableCell>  
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {projectData.map((row) => (
                            <TableRow >
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.ProjectName}</TableCell>
                            <a onClick={() => this.FileDownload(row.ProjectName,row.File)}>
                            <TableCell>{row.OriginalName}</TableCell>
                             </a>
                            </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
      
                     </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={5} className={classes.grid}>
                    <Paper className={classes.paper1}>
                    <TableContainer className={classes.container}>
                    <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell>Email</TableCell>
            <TableCell>Feedback</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {/*
            
            */}
          {feedbacks.map((row) => (
            <TableRow >
              <TableCell>{row.email}</TableCell>
              <a onClick={() => this.FileDownload(row.email,row.FeedbackBody)}>
              <TableCell>{row.FeedbackBody}</TableCell>
              </a>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={11} className={classes.grid}>
                    <Paper className={classes.paper}>
                    
                    </Paper>
                    <Box pt={4}>
          <Copyright />
      </Box>
                </Grid>
                </Grid>
        
                </Container>
            </React.Fragment>
            </main>
            </div>
        )
    }
}


export default withStyles(styles, { withTheme: true })(Dash);


