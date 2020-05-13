import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/core/styles";
import FormDialog from './dialogInput';



const styles = theme => ({
    /* Add icon tool tip */
    fab: {
        margin: theme.spacing(2),
      },
      absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
      },
});
 
class DropzoneDialogExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }
 
    handleClose() {
        this.setState({
            open: false
        });
    }
 
    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
    }
 
    handleOpen() {
        this.setState({
            open: true,
        });
        
    }
 
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Tooltip title="Add" aria-label="add" onClick={this.handleOpen.bind(this)}>
                    <Fab color="primary" className={classes.absolute}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['.csv']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
}
export default withStyles(styles, { withTheme: true })(DropzoneDialogExample);