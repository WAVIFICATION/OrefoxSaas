import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TypoGraphy from '@material-ui/core/Typography'

function NavBar(props) {
    return(
        <List component="nav">
            <ListItem component="div">
                <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title" >
                        <li>Log-IN</li>
                    </TypoGraphy>
                </ListItemText>

                <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                        <li>Services</li>
                    </TypoGraphy>
                </ListItemText>

                <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                        <li>Model</li>
                    </TypoGraphy>
                </ListItemText>

                <ListItemText inset>
                    <TypoGraphy color="inherit" variant="title">
                        <li>FAQ</li>
                    </TypoGraphy>
                </ListItemText>

            </ListItem> 
        </List>
    )
}

export default NavBar;