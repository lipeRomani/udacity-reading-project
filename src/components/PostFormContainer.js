import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {
    getAllCategories,
    addPost,
    getOnePostById,
    updatePost
} from '../services/ApiService';
import Snackbar from 'material-ui/Snackbar';
import {resetPostForm, addEditPost} from '../actions';
import {Field, reduxForm} from 'redux-form';
import {InputText, InputSelect} from './Inputs'
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const validate = values => {
    const errors = {};
    const requiredFields = ['author', 'title', 'body', 'categorie'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    return errors;
}

class PostFormContainer extends Component {

    state = {
        categories : [],
        snackMessage : "",
        snackBarOpen : false,
        autoHideDuration : 3000,
        hasApiError : false
    }

    componentDidMount() {
        this._loadValuesIfEditForm();
        getAllCategories()
            .then(result => result.categories)
            .then(categories => {
                this.setState({categories})
            });
    }

    onSubmit = (values) => {
        const {isEdit} = this.props;
        if (!isEdit) {
            this._createPost(values);
        } else {
            this._updatePost(values);
        }
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
        const {isEdit} = this.props;
        if (isEdit) {
            const {id} = this.props.match.params;
            getOnePostById(id)
                .then(post => this.props.addEditPost(post));
        } else {
            this.props.resetForm();
        }
    }

    render() {
        const {handleSubmit, invalid, submitting, isEdit, history} = this.props;
        const {id} = this.props.match.params;
        let btnLabel = isEdit ? 'Save Changes!' : 'Save!';
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} md={8} mdOffset={2}>
                        <form name='post' onSubmit={handleSubmit(this.onSubmit)}>
                            {isEdit && 
                                <Field name='id' component='input' id='id' hidden={true} />
                            }
                            <Field name='author' component={InputText} id='author' hintText='Post author' label='Author' disabled={isEdit} />
                            <Field name='title' component={InputText} id='title' hintText='Post title' label='Title' />
                            <Field name='category' component={InputSelect} id='category' label='Category' disabled={isEdit}>
                                {this.state.categories && this.state.categories.map(cat => (
                                    <MenuItem key={cat.path} value={cat.path} primaryText={cat.name} />
                                ))}
                            </Field>
                            <Field name='body' component={InputText} id='body' hintText='Post Body' label='Body' multiLine={true} rows={5} />
                            <br /><br />
                            <RaisedButton label={invalid ? "Complete the form" : btnLabel} secondary={false} backgroundColor='green' labelColor='#fff' type='submit' disabled={invalid || submitting} />
                            {isEdit && 
                                <RaisedButton label='Back to detail' secondary={true} style={{float : 'right'}} onClick={() => history.push(`/post/${id}`)}/>
                            }
                            
                        </form>

                        <Snackbar open={this.state.snackBarOpen} autoHideDuration={this.state.autoHideDuration} message={this.state.snackMessage} bodyStyle={this.state.hasApiError ? {backgroundColor : '#b30000'} : {backgroundColor : '#009933'}}/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetForm : () => dispatch(resetPostForm()),
        addEditPost : (data) => dispatch(addEditPost(data))
    }
}

const mapStateToProps = ({categories, posts, form}) => {
    return {
        initialValues : posts.edit,
        categories
    }
}

PostFormContainer = withRouter(PostFormContainer);

PostFormContainer = reduxForm({
    validate
})(PostFormContainer);

PostFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostFormContainer);

export default PostFormContainer;
