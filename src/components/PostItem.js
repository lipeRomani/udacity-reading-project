import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {resumeText} from '../helpers/StringHelper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import dateFormat from 'date-format';
import {withRouter} from 'react-router-dom';
import FaHandOUp from 'react-icons/lib/fa/hand-o-up';
import FaHandODown from 'react-icons/lib/fa/hand-o-down';
import FaEye from 'react-icons/lib/fa/eye';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const handUpIcon = <FaHandOUp />;
const handDownIcon = <FaHandODown />
const detailIcon = <FaEye />;
const editIcon = <FaEdit />
const removeIcon = <FaTrashO />

class PostItem extends Component {

    state = {
        isOpenConfirmDeleteModal : false
    }

    handleConfirmModal = () => {
        this.setState({
            isOpenConfirmDeleteModal : !this.state.isOpenConfirmDeleteModal
        })
    }

    render() {
        const {post, onUpVote, onDownVote, onDelete, history} = this.props;
        const postDate = new Date(post.timestamp);
        const subtitleMessage = `Date: ${dateFormat('dd-MM-yyyy hhhmm', postDate)} | Author: ${post.author} | Category: ${post.category} | Vote Score: ${post.voteScore} | Comments: ${post.commentCount}`
        const postDetailUrl = `/${post.category}/${post.id}`;
        
        const dialogConfirmActions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleConfirmModal}
            />,
            <FlatButton
              label="Yes do it!"
              secondary={true}
              onClick={() => onDelete(post.id)}
            />,
          ];

        return (
            <Card style={{marginBottom : '10px'}} zDepth={1}>
                <Dialog
                    title="Caution!"
                    actions={dialogConfirmActions}
                    modal={true}
                    open={this.state.isOpenConfirmDeleteModal}>
                    Do you really want to delete this post?
                </Dialog>
                <CardHeader
                    title={post.title}
                    subtitle={subtitleMessage}
                    subtitleStyle={{marginTop : "8px", fontSize : "0.7em"}}
                    actAsExpander={false}
                    showExpandableButton={false}
                />
                <CardText expandable={false}>
                    {resumeText(post.body, 150)}
                </CardText>
                <CardActions>
                    <BottomNavigation>
                        <BottomNavigationItem
                            label="Detail"
                            icon={detailIcon}
                            onClick={() => history.push(postDetailUrl)}
                        />
                        <BottomNavigationItem
                            label="Up vote"
                            icon={handUpIcon}
                            onClick={() => {onUpVote(post.id)} }
                        />
                        <BottomNavigationItem
                            label="Down vote"
                            icon={handDownIcon}
                            onClick={() => {onDownVote(post.id)} }
                        />
                        <BottomNavigationItem
                            label="Edit"
                            icon={editIcon}
                            onClick={() => {history.push(`/post/edit/${post.id}`)} }
                        />
    
                        <BottomNavigationItem
                            label="Delete"
                            icon={removeIcon}
                            onClick={this.handleConfirmModal}
                        />
                    </BottomNavigation>
                </CardActions>
            </Card>
        );
    }
    
}

PostItem.propTypes = {
    post : PropTypes.shape({
        id : PropTypes.string.isRequired,
        timestamp : PropTypes.number.isRequired,
        title : PropTypes.string.isRequired,
        body : PropTypes.string.isRequired,
        author : PropTypes.string.isRequired,
        category : PropTypes.string.isRequired,
        voteScore : PropTypes.number.isRequired,
        deleted : PropTypes.bool.isRequired,
        commentCount : PropTypes.number.isRequired
    }).isRequired,
    onUpVote : PropTypes.func, 
    onDownVote : PropTypes.func
}

export default withRouter(PostItem);