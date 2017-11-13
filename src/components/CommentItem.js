import React from 'react';
import {calculateCommentDaysHelper} from '../helpers/calculateCommentDaysHelper';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const CommentItem = ({comment, onDelete}) => {
    const {author, body, id, timestamp, voteScore} = comment;
    const postDays = calculateCommentDaysHelper(timestamp);

    return (
        <div>
            <Paper style={{marginTop : '0.8em', position: 'relative'}} zDepth={0}>
                <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    style={{position : 'absolute',top : 0,right : 0, zIndex : 300}}
                    >
                    <MenuItem primaryText="Edit" onClick={() => {}} />
                    
                    <MenuItem primaryText="Delete" onClick={() => onDelete(id)} style={{color : 'red'}}/>
                </IconMenu>
                <List>
                    <ListItem
                        disabled={true}
                        leftAvatar={<Avatar>A</Avatar>}>
                        {author}
                    </ListItem>
                </List>
                <div style={{padding:'1.2em', fontSize:'0.9em'}}>
                    {body}
                </div>
                <p style={{padding:'1.2em', fontSize:'0.6em', color: "#d8d8d8"}}>
                    {postDays} | <span style={{color : 'purple'}}>Score :  {voteScore}</span>
                </p>
                <Divider />
            </Paper>
        </div>
    );
}

CommentItem.propTypes = {
    comment : PropTypes.shape({
        author : PropTypes.string,
        body : PropTypes.string,
        id : PropTypes.string,
        voteScore : PropTypes.number,
        timestamp : PropTypes.number
    }).isRequired
}

export default CommentItem;