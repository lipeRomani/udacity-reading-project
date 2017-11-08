import React from 'react';
import {InputText} from './Inputs';
import {Field, reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';

const validate = (values) => {
    const errors = {};
    const requiredFields = ['title', 'body'];
        requiredFields.forEach(reqField => {
            if (!values[reqField])
                errors[reqField] = 'Field required!'; 
        });
    return errors;
}

let CommentForm = ({handleSubmit, invalid, submitting}) => {
    return (
        <form onSubmit={handleSubmit(() => {})} >
            <Field name="title" id="title" label='Title' component={InputText} />
            <Field name="body" id="body" label='Body' multiLine={true} rows={5} component={InputText} />
            <RaisedButton type='submit' primary={true} label="Add" disabled={invalid || submitting} />
        </form>
    )
}

CommentForm = reduxForm({
    validate
})(CommentForm);

export default CommentForm;