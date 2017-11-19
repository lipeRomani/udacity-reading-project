import React from 'react';
import {InputText} from './Inputs';
import {Field, reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import isEmpty from 'is-empty';

const validate = (values) => {
    const errors = {};
    const requiredFields = ['author', 'body'];
        requiredFields.forEach(reqField => {
            if (!values[reqField])
                errors[reqField] = 'Field required!'; 
        });
    return errors;
}

let CommentForm = ({handleSubmit, invalid, submitting, onSubmit, initialValues}) => {
    const isEdit = !isEmpty(initialValues);
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            { isEdit && <Field name='id' id='id' component='input' type='hidden' /> }
            <Field name="author" id="author" label='Author' component={InputText} disabled={isEdit} />
            <Field name="body" id="body" label='Body' multiLine={true} rows={5} component={InputText} />
            <RaisedButton type='submit' primary={true} label={isEdit ? "Save changes" : "Add"} disabled={invalid || submitting} />
        </form>
    )
}

CommentForm = reduxForm({
    validate,
    enableReinitialize: true
})(CommentForm);

CommentForm = connect(
    ({comments}) => ({initialValues : comments.edit}),
    () => ({})
)(CommentForm)

export default CommentForm;