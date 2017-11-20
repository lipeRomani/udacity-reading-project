import React, {Component} from 'react';
import Paper from 'material-ui/Paper'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import dateFormat from 'date-format';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import VoteMenu from './VoteMenu';

const style = {
    title : {
        fontSize : '1.8em'
    },
    subTitle : {
        marginTop : '0.8em',
        color : '#bababa',
        fontSize : '0.9em',
        lineHeight : '1.5em'
    },
    body : {
        marginTop : '0.8em'
    },
    paper : {
        position: 'relative',
        padding : '0.8em',
        marginTop : '10px'
    },
    iconMenu : {
        position : 'absolute',
        top : 0,
        right : 0
    },
    divider : {
        marginTop : '1em',
        marginBottom : '1em'
    }
}

class PostBody extends Component{
    
    state = {
        openModal : false
    }

    handleModal = () => {
        this.setState({
            openModal : !this.state.openModal
        })
    }

    render () {
        const {post, onEdit, onDelete, onVoteDown, onVoteUp} = this.props;
        const {author, voteScore, timestamp, id, category} = post;
        const postDateTime = dateFormat('dd-MM-yyyy hhhmm', new Date(timestamp));

        const dialogActions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.handleModal}
          />,
          <FlatButton
            label="Yes do it!"
            secondary={true}
            onClick={() => onDelete(id)}
          />,
        ];

        return (
            <Paper style={style.paper}>
                <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    style={style.iconMenu}
                    >
                    <MenuItem primaryText="Edit" onClick={() => onEdit(id)} />
                    <Divider />
                    <MenuItem primaryText="Delete" onClick={this.handleModal} style={{color : 'red'}}/>
                </IconMenu>

                <h1 style={style.title}>{post.title}</h1>
                <p style={style.subTitle}>{`Author: ${author} | Category: ${category} | Vote score: ${voteScore} | Publish date: ${postDateTime} | Comments: ${post.commentCount}`}</p>
                <p style={style.body}>{post.body}</p>
                <Divider style={style.divider}/>
                <VoteMenu onVoteUp={() => onVoteUp(id)} onVoteDown={() => onVoteDown(id)} />

                <Dialog
                    title="Caution!"
                    actions={dialogActions}
                    modal={true}
                    open={this.state.openModal}>
                    Do you really want to delete this post?
                </Dialog>
            </Paper>
        )
    }
}

PostBody.propTypes = {
    post : PropTypes.shape({
        "id": PropTypes.string,
        "timestamp": PropTypes.number,
        "title": PropTypes.string,
        "body": PropTypes.string,
        "author": PropTypes.string,
        "category": PropTypes.string,
        "voteScore": PropTypes.number,
        "deleted": PropTypes.bool,
        "commentCount": PropTypes.number
    }).isRequired,
    onEdit : PropTypes.func.isRequired,
    onDelete : PropTypes.func.isRequired,
    onVoteUp : PropTypes.func,
    onVoteDown : PropTypes.func
}

export default PostBody;