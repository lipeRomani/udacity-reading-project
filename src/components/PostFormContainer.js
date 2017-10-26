import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {getAllCategories, addPost} from '../services/ApiService';
import {connect} from 'react-redux';
import PostForm from './PostForm'
import Snackbar from 'material-ui/Snackbar';
import {resetPostForm} from '../actions';

class PostFormContainer extends Component {

    state = {
        categories : [],
        snackMessage : "",
        snackBarOpen : false,
        autoHideDuration : 3000,
        hasApiError : false,
    }

    componentDidMount() {
        getAllCategories()
            .then(result => result.categories)
            .then(categories => {
                this.setState({categories})
            });
    }

    handleSubmit = (values) => {
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

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12} md={8} mdOffset={2}>
                        <PostForm onSubmit={this.handleSubmit} categories={this.state.categories} />
                        <Snackbar open={this.state.snackBarOpen} autoHideDuration={this.state.autoHideDuration} message={this.state.snackMessage} bodyStyle={this.state.hasApiError ? {backgroundColor : '#b30000'} : {backgroundColor : '#009933'}}/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetForm : () => dispatch(resetPostForm())
    }
}

const mapStateToProps = ({categories}) => {
    return {
        categories
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostFormContainer)