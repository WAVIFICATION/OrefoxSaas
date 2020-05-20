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

const styles = theme => ({
    root: {
        
        width: '100%',
        
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
          
      }
    
  });

  



class Dash extends Component{
    constructor(props){
        super(props)
        this.state=({projectData:[]})
    }

    componentDidMount() {
        fetch('/api/ListProjectFiles')
          .then(response => response.json())
          .then(data => {this.setState({ projectData:data });console.log(this.state.projectData)});
          
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
        const { classes } = this.props;
        const { projectData } = this.state;
        return(
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
            {/*
            
            */}
                                {projectData.map((row) => (
                            <TableRow >
                            <TableCell>{row.ProjectName}</TableCell>
                            <a onClick={() => this.FileDownload(row.ProjectName,row.File)}>
                            <TableCell>{row.File}</TableCell>
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
          {projectData.map((row) => (
            <TableRow >
              <TableCell>{row.ProjectName}</TableCell>
              <a onClick={() => this.FileDownload(row.ProjectName,row.File)}>
              <TableCell>{row.File}</TableCell>
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
                    <TableContainer className={classes.container}>
                    <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell>Number of Projects</TableCell>
            <TableCell>Expected Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {/*
            
            */}
          {projectData.map((row) => (
            <TableRow >
              <TableCell>{row.ProjectName}</TableCell>
              <a onClick={() => this.FileDownload(row.ProjectName,row.File)}>
              <TableCell>{row.File}</TableCell>
              </a>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer> 
                    </Paper>
                </Grid>
                </Grid>
        
                </Container>
            </React.Fragment>

        )
    }
}


export default withStyles(styles, { withTheme: true })(Dash);


