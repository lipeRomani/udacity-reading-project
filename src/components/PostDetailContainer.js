import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    addDetailedPost,
    addAlert,
    removePost
} from '../actions';
import {
    getOnePostById,
    getCommentsByPostId,
    deletePost
} from '../services/ApiService';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Paper from 'material-ui/Paper'
import PostBody from './PostBody';
import {withRouter} from 'react-router-dom';
import isEmpty from 'is-empty';
import NotFound404 from './NotFound404';


import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';

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
            .catch(err => console.log(err, 'deu merrdaaaaaaaaaa'))
    }

    _loadComments = (postId) => {
        getCommentsByPostId(postId)
            .then(result => {
                //aquiiii
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
        const {post} = this.props;
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
                        <Paper style={{marginTop : '0.8em'}} zDepth={1}>
                            <List>
                                <ListItem
                                    disabled={true}
                                    leftAvatar={<Avatar>A</Avatar>}>
                                    Felipe Antunes
                                </ListItem>
                            </List>
                            <Divider />
                            <div style={{padding:'1.2em', fontSize:'0.9em'}}>
                            asdasda
                            </div>
                        </Paper>

                        <Paper style={{marginTop : '0.8em'}} zDepth={1}>
                            <List>
                                <ListItem
                                    disabled={true}
                                    leftAvatar={<Avatar>A</Avatar>}>
                                    Felipe Antunes
                                </ListItem>
                            </List>
                            <Divider />
                            <div style={{padding:'1.2em', fontSize:'0.9em'}}>
                            asdasda
                            </div>
                        </Paper>

                    </Col>
                </Row>
            </Grid>    
        )
    }
}

const mapStateToProps = ({posts}) => {
    const {detail} = posts;
    return {
        post : detail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDetailedPost : (data) => dispatch(addDetailedPost(data)),
        addAlert : (data) => dispatch(addAlert(data)),
        removePost : (data) => dispatch(removePost(data))
    }
}

PostDetailContainer = withRouter(PostDetailContainer);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetailContainer);