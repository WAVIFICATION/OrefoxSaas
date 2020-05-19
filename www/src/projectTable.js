import React,{Component} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { withStyles } from "@material-ui/core/styles";
import SimpleMenu from './ServicesMenu';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function preventDefault(event) {
  event.preventDefault();
}

const styles = theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
});

class ProjectTable extends Component {
  constructor(props){
    super(props)
    this.state={
      projectData:[],
      menuopen: [],
      anchorEl: null
    }
  }

  reload=()=>{
    console.log("entering")
    fetch('/api/ListProjectFiles')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ projectData:data });
        console.log(this.state.projectData)
      }
    );
      
  }
  menuopenfun=(event, index)=>{
    this.setState({ anchorEl: event.currentTarget});
//     this.setState({ 
//       menuopen : this.state.menuopen.map((item, j) => {
//        if (j === index) {
//          return true;
//        } else {
//          return item;
//        }
//  })
// });
  }
  menuclosefun=()=>{
    this.setState({ menuopen: false });
  }
  
  componentDidMount() {
    fetch('/api/ListProjectFiles')
      .then(response => response.json())
      .then(data => {this.setState({ projectData:data });console.log(this.state.projectData)
      // for(var i=0;i<Object.keys(data).length;i++)
      // {
      //   this.state.menuopen.push(false);
      // }
      // console.log(this.state.menuopen)
    });
      
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
  apiCall=( project, file, operation)=>{
    fetch('/api/AnalyticsAPI',{ 
      method: "POST", 
      body: JSON.stringify({
        'projectName':project,
        'fileName': file,
        'operation': operation
      }), 
      redirect:"follow",
      headers:{ 
      "Content-Type": "application/json" } })
      .then(response => response.json())
      .then(data => {console.log(data)});
  }
  render(){
    const { classes } = this.props;
    const { projectData } = this.state;
    const options = [
      ['correlation map','correlation_map']
    ];
    var index=0;
  return (
    <React.Fragment>
    <br></br>
      <Title>Project List
      <Button onClick={this.reload}>
      <RefreshIcon></RefreshIcon>
      </Button>
      </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell>Files</TableCell>
            <TableCell> Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectData.map((row) => (
            <TableRow >
              <TableCell>{row.ProjectName}</TableCell>
              <a onClick={() => this.FileDownload(row.ProjectName,row.File)}>
              <TableCell>{row.File}</TableCell>
              </a>
              <TableCell>
              <Button onClick={() =>this.apiCall(row.ProjectName,row.File, 'correlation_map')}>
                Correlation Map
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </React.Fragment>
  );
}
}
export default withStyles(styles, { withTheme: true })(ProjectTable);