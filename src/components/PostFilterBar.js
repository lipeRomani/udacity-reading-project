import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const PostFilterBar = (props) => {

    return (
        <Toolbar>
            <ToolbarGroup firstChild={false}>
                <ToolbarTitle text="Filter" />
                <ToolbarSeparator />
                <DropDownMenu value={1} onChange={() => {}}>
                    <MenuItem value={1} primaryText="Date" />
                    <MenuItem value={2} primaryText="Vote Score" />
                </DropDownMenu>
            </ToolbarGroup>
        </Toolbar>
    );
}

export default PostFilterBar;