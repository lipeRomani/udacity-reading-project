import React from 'react';
import {InputText} from './Inputs';
import {Field, reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import {formReset} from '../actions';
import {connect} from 'react-redux';

const validate = (values) => {
    const errors = {};
    const requiredFields = ['author', 'body'];
        requiredFields.forEach(reqField => {
            if (!values[reqField])
                errors[reqField] = 'Field required!'; 
        });
    return errors;
}

let CommentForm = ({handleSubmit, invalid, submitting, onSubmit}) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Field name="author" id="author" label='Author' component={InputText} />
            <Field name="body" id="body" label='Body' multiLine={true} rows={5} component={InputText} />
            <RaisedButton type='submit' primary={true} label="Add" disabled={invalid || submitting} />
        </form>
    )
}

const mapStateToProps = ({comments}) => {
    const {edit} = comments;
    return {
        initialValues : edit
    };
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

CommentForm = reduxForm({
    validate
})(CommentForm);

CommentForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentForm)

export default CommentForm;