import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {
    getAllCategories,
    addPost,
    getOnePostById,
    updatePost
} from '../services/ApiService';
import Snackbar from 'material-ui/Snackbar';
import {resetPostForm, addEditPost, addCategory, removeEditPost} from '../actions';
import {connect} from 'react-redux';
import PostForm from './PostForm';

class PostFormContainer extends Component {

    state = {
        snackMessage : "",
        snackBarOpen : false,
        autoHideDuration : 3000,
        hasApiError : false
    }

    componentDidMount() {
        this._loadValuesIfEditForm();
        this._loadCategories()
    }

    onCreatePost = (values) => {
        this._createPost(values);
    }

    onEditPost = (values) => {
        this._updatePost(values);
    }

    _loadCategories = () => {
        getAllCategories()
            .then(result => result.categories)
            .then(categories => {
                categories.forEach(category => {
                    this.props.addCategory(category);
                });
            });
    }

    _createPost = (values) => {
        addPost(values)
            .then(result => {
                this.props.resetForm();
                this.setState({
                    snackMessage : "Success post created!",
                    snackBarOpen : true
                })
            })
            .catch(err => {
                this.setState({
                    snackMessage : "An server error occurred, try later!",
                    snackBarOpen : true,
                    hasApiError  : true
                })
            });
    }

    _updatePost = ({id, body, title}) => {
        updatePost({id, body, title})
            .then(post => {
                this.props.addEditPost(post);
                this.setState({
                    snackMessage : "Success post updated!",
                    snackBarOpen : true
                })
            })
    }

    _loadValuesIfEditForm = () => {
        const {id} = this.props;
        if (id) {
            getOnePostById(id)
                .then(post => this.props.addEditPost(post));
        } else {
            this.props.removeEditPost();
            this.props.resetForm();
        }
    }

    render() {
        const {categories, id} = this.props;
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} md={8} mdOffset={2}>     
                        {id && <PostForm form="editPost" categories={categories} onSubmit={this.onEditPost} id={id}/>}
                        {!id && <PostForm form="addPost" categories={categories} onSubmit={this.onCreatePost} />}
                        <Snackbar 
                            open={this.state.snackBarOpen} 
                            autoHideDuration={this.state.autoHideDuration} 
                            message={this.state.snackMessage} 
                            bodyStyle={this.state.hasApiError ? {backgroundColor : '#b30000'} : {backgroundColor : '#009933'}}/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetForm : () => dispatch(resetPostForm()),
        addEditPost : (data) => dispatch(addEditPost(data)),
        addCategory : (category) => dispatch(addCategory(category)),
        removeEditPost : () => dispatch(removeEditPost())
    }
}

const mapStateToProps = ({categories, posts, form}) => {
    const arrayCategories = Object.keys(categories)
                        .reduce((reducer, key) => {
                           reducer.push(categories[key]);
                           return reducer; 
                        }, [])
    
    return {
        categories : arrayCategories
    }
}

PostFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostFormContainer);

export default PostFormContainer;
