import React from 'react'
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider
} from '@material-ui/core'
import ListAltIcon from '@material-ui/icons/ListAlt'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import { NavLink } from 'react-router-dom'

const SelectedList = ({ onClose }) => {

    return (
        <List component="nav" aria-label="drawer-list">
            <ListItem
                component={NavLink}
                end
                to="/"
                button
                activeClassName="Mui-selected"
                onClick={onClose ? () => onClose() : null}
            >
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItem>
            <ListItem
                component={NavLink}
                end
                to="/menu"
                button
                activeClassName="Mui-selected"
                onClick={onClose ? () => onClose() : null}
            >
                <ListItemIcon>
                    <RestaurantMenuIcon />
                </ListItemIcon>
                <ListItemText primary="Menu" />
            </ListItem>
            <Divider />
        </List>
    )
}

export default SelectedList
