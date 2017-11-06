import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import TiHeartOutline from 'react-icons/lib/ti/heart-outline';
import TiDocumentAdd from 'react-icons/lib/ti/document-add';
import TiArrowLeftThick from 'react-icons/lib/ti/arrow-left-thick';

const navLinkInactiveStyle = {
  color : 'grey',
  textDecoration : 'none'
}

const navLinkActiveStyle = {
  color : 'purple'
}

class HeaderMenu extends Component {
    
    state = {
        isDrawerOpen : false
    }

    handleDrawerMenu = () => {
        this.setState({isDrawerOpen : !this.state.isDrawerOpen})
    }
    
    render() {

       return (
            <div>
                <AppBar
                    title="Reading"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.handleDrawerMenu}
                    style={{backgroundColor : "purple"}}
                />
            
                <Drawer open={this.state.isDrawerOpen} onRequestChange={(open) =>  this.handleDrawerMenu()} docked={false}>
                    <Subheader>My Reading Menu</Subheader>       
                    <Divider />
                    <MenuItem>
                        <NavLink exact to='/' style={navLinkInactiveStyle} activeStyle={navLinkActiveStyle} onClick={() => this.handleDrawerMenu()}>
                        <TiHeartOutline /> All Posts
                        </NavLink>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <NavLink exact to='/new/post' style={navLinkInactiveStyle} activeStyle={navLinkActiveStyle} onClick={() => this.handleDrawerMenu()}>
                        <TiDocumentAdd /> Add New Post
                        </NavLink>
                    </MenuItem>
                    <Divider />
                    <MenuItem style={{color : 'grey'}} onClick={() => this.handleDrawerMenu()}>
                        <TiArrowLeftThick style={{ color : 'grey'}} /> Close Menu
                    </MenuItem>
                </Drawer>
            </div>
       );
    }
}

export default HeaderMenu;