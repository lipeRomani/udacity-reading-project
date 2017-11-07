import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    addDetailedPost,
    addAlert,
    removePost,
    addComment
} from '../actions';
import {
    getOnePostById,
    getCommentsByPostId,
    deletePost
} from '../services/ApiService';
import {Grid, Row, Col} from 'react-flexbox-grid';
import PostBody from './PostBody';
import {withRouter} from 'react-router-dom';
import isEmpty from 'is-empty';
import NotFound404 from './NotFound404';
import FlatButton from 'material-ui/FlatButton';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import CommentItem from './CommentItem';

class PostDetailContainer extends Component {

    state = {
        loadPost : true,
        loadComments : true
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this._loadPost(id);
        this._loadComments(id);
    }

    _loadPost = (postId) => {
        getOnePostById(postId)
            .then(post => {
                this.props.addDetailedPost(post);
                this.setState({loadPost : false})
            })
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

    render() {
        const {post, comments} = this.props;
        return (
            <Grid fluid>
                <Row>
                    <Col md={12} xs={12}>
                    {(isEmpty(post) && !this.state.loadPost) && 
                        <NotFound404 message="The post you requested does not exist!" /> }
                    {!isEmpty(post) && <PostBody post={post} onEdit={this.onEdit} onDelete={this.onDelete} />}
                    </Col>
                </Row>
                <Row>
                    <Col md={12} xs={12}>
                        <div style={{marginTop:'1em'}}>
                            <FlatButton
                                label="Add Comment"
                                secondary={true}
                                icon={<FaPlusCircle />} />
                        </div>
                        
                        {comments.map(_comment => (
                            <CommentItem key={_comment.id} comment={_comment} />
                        ))}

                    </Col>
                </Row>
            </Grid>    
        )
    }
}

const mapStateToProps = ({posts, comments}) => {
    const {detail} = posts;
    const {list} = comments;
    
    return {
        post : detail,
        comments : list[detail.id] ? Object
            .keys(list[detail.id])
            .reduce((reducer, key) => {
                reducer.push(list[detail.id][key])
                return reducer;
            }, []) : []
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDetailedPost : (data) => dispatch(addDetailedPost(data)),
        addAlert : (data) => dispatch(addAlert(data)),
        removePost : (data) => dispatch(removePost(data)),
        addComment : (comment, postId) => dispatch(addComment(comment, postId))
    }
}

PostDetailContainer = withRouter(PostDetailContainer);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetailContainer);