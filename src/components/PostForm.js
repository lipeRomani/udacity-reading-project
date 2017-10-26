import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {InputText, InputSelect} from './Inputs'
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

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

const PostForm = props => {
    const {handleSubmit, onSubmit, invalid, submitting, categories} = props;
    return (
        <form name='post' onSubmit={handleSubmit(onSubmit)}>
            <Field name='author' component={InputText} id='author' hintText='Post author' label='Author' />
            <Field name='title' component={InputText} id='title' hintText='Post title' label='Title' />
            <Field name='category' component={InputSelect} id='category' label='Category'>
                {categories.map(cat => (
                    <MenuItem key={cat.path} value={cat.path} primaryText={cat.name} />
                ))}
            </Field>
            <Field name='body' component={InputText} id='body' hintText='Post Body' label='Body' multiLine={true} rows={5} />
            <br /><br />
            <RaisedButton label={invalid ? "Complete the form" : "Save!"} secondary={false} backgroundColor='green' labelColor='#fff' type='submit' disabled={invalid || submitting} />
        </form>
    )
}

export default reduxForm({
    form: 'addPost',
    validate
})(PostForm);