import React,{Component} from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Link from '@material-ui/core/Link';
import { mainListItems } from './projectListItems';
import { withStyles } from "@material-ui/core/styles";
import Logout from './LogOut';
import HomeIcon from '@material-ui/icons/Home';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


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
  
  header:{
    textAlign:"center",
    paddingTop:theme.spacing(30),
  },
  fab: {
    margin: theme.spacing(2),
  },
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
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
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  
  
});


class FAQ extends Component{
  constructor(props){
    super(props)
    this.state={onState:false,open:true,pname:"",FAQ:""}
  }

  handleDrawerOpen = () => {
    this.setState({open:true});
  };

  handleDrawerClose = () => {
    this.setState({open:false});
  };


  render(){
    const {open} = this.state
    const { classes } = this.props;
    
    
    return(
      <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
         
          <Typography component="h1" variant="h4" color="inherit"  align = "center" noWrap className={classes.title}>
           FAQ 
           
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
      <Typography component="h6" variant="h6" color="inherit"  align = "left" noWrap className={classes.title}>
      <br/><br/>
      
     <MuiExpansionPanel >
        <MuiExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography> Q1:  I would like to change my  login account details</Typography>
        </MuiExpansionPanelSummary>
        <MuiExpansionPanelDetails>
          <Typography>
          - To change any of your contact details, please email  services@orefox.com quoting your client ID with the details that need to be updated.
          </Typography>
        </MuiExpansionPanelDetails>
      </MuiExpansionPanel>
      <br/>
      <MuiExpansionPanel >
        <MuiExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography> Q2: Is My Data Safe?</Typography>
        </MuiExpansionPanelSummary>
        <MuiExpansionPanelDetails>
          <Typography>
          - Yes.<br/>
          We encourage you to read the terms and conditions of the Company to learn more.
            

          </Typography>
        </MuiExpansionPanelDetails>
      </MuiExpansionPanel>
      <br/>
      <MuiExpansionPanel >
        <MuiExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography> Q3: How do I make changes to a request I’ve already placed?</Typography>
        </MuiExpansionPanelSummary>
        <MuiExpansionPanelDetails>
          <Typography>
          - To change the request you have already made, please email us at services@orefox.com, citing your client ID with details.
          </Typography>
        </MuiExpansionPanelDetails>
      </MuiExpansionPanel>
      <br/>
      <MuiExpansionPanel >
        <MuiExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography> Q4: What payment methods  do you accept?</Typography>
        </MuiExpansionPanelSummary>
        <MuiExpansionPanelDetails>
          <Typography>
          - We accept all Credit Cards and Debit Cards Online.
          </Typography>
        </MuiExpansionPanelDetails>
      </MuiExpansionPanel>
      <br/>
      <MuiExpansionPanel >
        <MuiExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography> Q5: How long it would take to complete my request and get the desired outcome?</Typography>
        </MuiExpansionPanelSummary>
        <MuiExpansionPanelDetails>
          <Typography>
          - It will be based on the complexity of the data and you can also track your request by sending an email toservices@orefox.com, <br/>
          citing your client ID with details.
          </Typography>
        </MuiExpansionPanelDetails>
      </MuiExpansionPanel>
      <br/>
      <MuiExpansionPanel >
        <MuiExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography> Q6: Where do I redeem a discount or special offer as a regular customer?</Typography>
        </MuiExpansionPanelSummary>
        <MuiExpansionPanelDetails>
          <Typography>
          - Please email subscriptions@miningmagazine.com quoting your subscription reference number with the details.
          </Typography>
        </MuiExpansionPanelDetails>
      </MuiExpansionPanel>
     <br/>

           
          </Typography>


      {/* Conditional Rendering Part Goes here */}
     
      <Box pt={4}>
          <Copyright />
      </Box>
      </main>
    </div>

    )
  }
}

export default withStyles(styles, { withTheme: true })(FAQ);


