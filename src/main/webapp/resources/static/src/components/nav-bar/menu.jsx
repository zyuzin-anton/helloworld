import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import InboxIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List";
import withRouter from "react-router/lib/withRouter";

import appRoutes from '../../utils/app-routes'

@withRouter
export default class Menu extends React.Component {
    render() {
        const { router } = this.props;
        return (
            <List>
                <ListItem button key={'Home'} onClick={() => router.push(appRoutes.ROOT)}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Home'} />
                </ListItem>
                <ListItem button key={'Todo List'} onClick={() => router.push(appRoutes.TODO)}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Todo'} />
                </ListItem>
            </List>
        )
    }
}