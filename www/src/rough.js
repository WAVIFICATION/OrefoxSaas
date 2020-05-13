import React,{Component,useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DropzoneDialogExample from './dropzone.js'

import { withStyles } from "@material-ui/core/styles";
import  { Redirect } from 'react-router-dom'


// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount, value) {
  return { id, date, name, shipTo, paymentMethod, amount,value };
}

const rows = [
  createData(0, '1 May, 2020', 'Project 1','Services',<Tooltip title="Delete">
  <IconButton aria-label="delete">
    <DeleteIcon />
  </IconButton>
</Tooltip>),
 
];

const styles = theme => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  });
          
class ProjectTables extends Component{
  constructor(props){
    super(props)
    this.state={data:"", error:"", Signin:"",rowdata:{}}
  }
handleChange = event => {
    this.setState({ [event.target.value]:event.target.value })
}
preventDefault(event) {
    event.preventDefault();
}
componentDidMount(){
    const url ="http://54.252.132.199/api/ListProjectFiles";
    fetch(url,{method:"GET",redirect:"follow",headers:{"Content-type":"application/json"} })
    .then(res=>res.json())
    .then(res=>console.log(res))
    .then(data=>this.setState({rowdata:data}))
    .then(data=>console.log(data))
    .catch(error=>console.error("Error:",error))
}


       
  render(){
    const {classes} = this.props;
    console.log("entering")
    console.log(this.rowdata)

    return(
        <React.Fragment>
      <Title>Project List</Title>
      {/*
       <table className="tat"> 
        <th>Project</th>
        <th>Filename</th>
        {
            this.state.rowdata.map((dynamicData) =>
            <tr className="trow"> 
            <td>  {dynamicData.projectName} </td> 
            <td> {dynamicData.fileName} </td>
            </tr>
            )
        }
    </table>
      
      */}
     
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={this.preventDefault}>
          See more projects
        </Link>
      </div>
    </React.Fragment>
    )

  }
}


export default withStyles(styles, { withTheme: true })(ProjectTables);

/*
<Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Project Name </TableCell>
            
            <TableCell>Files Uploaded</TableCell>
            
            <TableCell> Services </TableCell>
            <TableCell>  </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="left">{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell >{row.amount}</TableCell>
              <TableCell>{row.value}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
*/



