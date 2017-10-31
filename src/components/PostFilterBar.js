import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {SORT_BY_DATE, SORT_BY_VOTE_SCORE} from '../helpers/SortHelper';
import FaRefresh from 'react-icons/lib/fa/refresh';

const PostFilterBar = ({selected, onChange, onRefresh}) => {
    return (
        <Toolbar>
            <ToolbarGroup firstChild={false}>
                <ToolbarTitle text="Sort by" />
                <DropDownMenu value={selected} onChange={onChange}>
                    <MenuItem value={SORT_BY_DATE} primaryText="Date" />
                    <MenuItem value={SORT_BY_VOTE_SCORE} primaryText="Vote Score" />
                </DropDownMenu>
                <ToolbarSeparator />
                <FlatButton label="Refresh posts" secondary={true} icon={<FaRefresh />} onClick={onRefresh} />
            </ToolbarGroup>
            
        </Toolbar>
    );
}

export default PostFilterBar;