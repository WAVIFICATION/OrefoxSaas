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

function preventDefault(event) {
  event.preventDefault();
}

const styles = theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
});

class ReportsTable extends Component {
  constructor(props){
    super(props)
    this.state={
      projectData:[]
    }
  }
  componentDidMount() {
    fetch('/api/ListReports')
      .then(response => response.json())
      .then(data => {this.setState({ projectData:data });console.log(this.state.projectData)});
  }
   FileDownload(filename){
     fetch('/api/ViewReport/'+filename)
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
  return (
    <React.Fragment>
    <br></br>
      <Title>Reports List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell>File</TableCell>
            <TableCell>Operation</TableCell>
            <TableCell>Report</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectData.map((row) => (
            <TableRow >
              <TableCell>{row.ProjectName}</TableCell>
              <TableCell>{row.OriginalName}</TableCell>
              <TableCell>{row.Operation}</TableCell>
              <a onClick={() => this.FileDownload(row.ReportID)}>
              <TableCell>{row.ReportID}</TableCell>
              </a>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </React.Fragment>
  );
}
}
export default withStyles(styles, { withTheme: true })(ReportsTable);