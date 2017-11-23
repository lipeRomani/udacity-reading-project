import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    fetchDetailedPost,
    addDetailedPost,
    addAlert,
    removePost,
    addComment,
    commentFormReset,
    removeComment,
    addEditComment,
    removeEditComment
} from '../actions';
import {
    getOnePostById,
    getCommentsByPostId,
    deletePost,
    createComment,
    deleteComment,
    getOneCommentById,
    updateComment,
    voteById,
    OPTION_UP_VOTE,
    OPTION_DOWN_VOTE,
    voteComment
} from '../services/ApiService';
import {Grid, Row, Col} from 'react-flexbox-grid';
import PostBody from './PostBody';
import {withRouter} from 'react-router-dom';
import isEmpty from 'is-empty';
import NotFound404 from './NotFound404';
import FlatButton from 'material-ui/FlatButton';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import CommentItem from './CommentItem';
import Dialog from 'material-ui/Dialog';
import CommentForm from './CommentForm';
import {makeId} from '../helpers/IdHelper';
import sortBy from 'sort-by';
import PropTypes from 'prop-types';

class PostDetailContainer extends Component {

    state = {
        loadPost : true,
        loadComments : true,
        isOpenModalAddComment : false,
        isOpenEditModal : false
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this._loadPost(id);
        this._loadComments(id);
    }

    _loadPost = (postId) => {
        // getOnePostById(postId)
        //     .then(post => {
        //         this.props.addDetailedPost(post);
        //         this.setState({loadPost : false})
        //     })
        this.props.fetchDetailedPost(postId);
    }

    _loadComments = (postId) => {
        getCommentsByPostId(postId)
            .then(comments => {
                comments.forEach(comment => {
                    this.props.addComment(comment, postId);
                });
            })
    }

    onEdit = (postId) => {
        const {history} = this.props;
        history.push(`/post/edit/${postId}`);
    }

    onDelete = (postId) => {
        const {addAlert, history, removePost} = this.props;
        deletePost(postId)
            .then(post => {
                addAlert({
                    typeMessage : 'success',
                    message : `Post ${post.title} deleted`,
                    time : 5000
                });
                removePost(postId);
                history.push("/");
            })
    }

    onCommentSubmit = ({author, body}) => {
        const {id} = this.props.match.params;
        createComment({
            id : makeId(),
            timestampt: Date.now(),
            body,
            author,
            parentId : id

        })
        .then(comment => {
            this.props.commentFormReset();
            this._loadComments(id);
            this.setState({
                isOpenModalAddComment : false
            })
        });
    }

    onCommentEditSubmit = ({id, author, body}) => {
        const postId = this.props.match.params.id;
        updateComment({id, body})
            .then(result => {
                this.props.removeEditComment();
                this.props.commentFormReset();
                this._loadComments(postId);
                this.setState({
                    isOpenEditModal : false
                });
            });
    } 

    onDeleteComment = (commentId) => {
        const {id} = this.props.match.params;
        deleteComment(commentId)
            .then(() =>{
                this.props.removeComment(commentId, id);
                this._loadComments(id)
            } )
    }

    handleModalAddComment = () => {
        this.props.removeEditComment();
        this.setState({isOpenModalAddComment : !this.state.isOpenModalAddComment})
    }

    handleModalEditComment = () => {
        this.setState({isOpenEditModal : !this.state.isOpenEditModal})
    }

    handleModalEditForm = (commentId) => {
        getOneCommentById(commentId)
            .then(comment => {
                this.props.addEditComment(comment);
                this.setState({
                    isOpenEditModal : true,
                    isOpenModalAddComment : false
                });
            })
    }

    onPostVoteUp = (postId) => {
        voteById(postId, OPTION_UP_VOTE)
            .then(post => {
                this.props.addDetailedPost(post)
            });
    }

    onPostVoteDown = (postId) => {
        voteById(postId, OPTION_DOWN_VOTE)
            .then(post => {
                this.props.addDetailedPost(post)
            });
    }

    onCommentVoteUp = (commentId) => {
        const {id} = this.props.match.params;

        voteComment(commentId, OPTION_UP_VOTE)
            .then(result => {
                this._loadComments(id)
            })
    }

    onCommentVoteDown = (commentId) => {
        const {id} = this.props.match.params;

        voteComment(commentId, OPTION_DOWN_VOTE)
            .then(result => {
                this._loadComments(id)
            })
    }

    render() {
        const {post, comments} = this.props;

        const addModalActions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                keyboardFocused={false}
                onClick={this.handleModalAddComment}
            />
        ];

        const editModalActions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                keyboardFocused={false}
                onClick={this.handleModalEditComment}
            />
        ];
        
        return (
            <Grid fluid>
                <Row>
                    <Col md={12} xs={12}>
                    {(isEmpty(post) && !this.state.loadPost) && 
                        <NotFound404 message="The post you requested does not exist!" /> }
                    {!isEmpty(post) && <PostBody post={post} onEdit={this.onEdit} onDelete={this.onDelete} onVoteUp={this.onPostVoteUp} onVoteDown={this.onPostVoteDown} />}
                    </Col>
                </Row>
                <Row>
                    <Col md={12} xs={12}>
                        <div style={{marginTop:'1em'}}>
                            <FlatButton
                                label="Add Comment"
                                secondary={true}
                                icon={<FaPlusCircle />} 
                                onClick={this.handleModalAddComment} />
                        </div>
                        
                        {comments && comments.map(_comment => (
                            <CommentItem
                                key={_comment.id}
                                comment={_comment}
                                onDelete={this.onDeleteComment}
                                onEdit={this.handleModalEditForm}
                                onVoteUp={() => this.onCommentVoteUp(_comment.id)} 
                                onVoteDown={() => this.onCommentVoteDown(_comment.id)}/>
                        ))}

                    </Col>
                </Row>

                <Dialog
                    title="New Comment"
                    actions={addModalActions}
                    modal={false}
                    open={this.state.isOpenModalAddComment}
                    onRequestClose={this.handleModalAddComment}
                    >
                    Write your comment:
                    <CommentForm form='commentForm' onSubmit={this.onCommentSubmit} />
                </Dialog>

                <Dialog
                    title="Edit Comment"
                    actions={editModalActions}
                    modal={false}
                    open={this.state.isOpenEditModal}
                    onRequestClose={this.handleModalEditComment}
                    >
                    Write your comment:
                    <CommentForm form='commentEditForm' onSubmit={this.onCommentEditSubmit} />
                </Dialog>
            </Grid>    
        )
    }
}

PostDetailContainer.propTypes = {
    post : PropTypes.object.isRequired,
    comments : PropTypes.array
}

const mapStateToProps = ({posts, comments}) => {
    const {detail} = posts;
    const {list} = comments;
    let commentsArray = list[detail.id] ? Object
            .keys(list[detail.id])
            .reduce((reducer, key) => {
                reducer.push(list[detail.id][key])
                return reducer;
            }, [])
            .sort(sortBy('-voteScore')) : []
            
    return {
        post : detail,
        comments : commentsArray
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDetailedPost : (data) => dispatch(addDetailedPost(data)),
        fetchDetailedPost : (postId) => dispatch(fetchDetailedPost(postId)),
        addAlert : (data) => dispatch(addAlert(data)),
        removePost : (data) => dispatch(removePost(data)),
        addComment : (comment, postId) => dispatch(addComment(comment, postId)),
        commentFormReset : () => dispatch(commentFormReset()),
        removeComment : (commentId, postId) => dispatch(removeComment(commentId, postId)),
        addEditComment : (comment) => dispatch(addEditComment(comment)),
        removeEditComment : () => dispatch(removeEditComment())
    }
}

PostDetailContainer = withRouter(PostDetailContainer);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetailContainer);