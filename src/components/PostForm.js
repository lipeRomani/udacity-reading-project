import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {InputText, InputSelect} from './Inputs';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import isEmpty from 'is-empty';

const validate = values => {
    const errors = {};
    const requiredFields = ['author', 'title', 'body', 'category'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    return errors;
}

let PostForm = ({categories, handleSubmit, invalid, submitting, history, onSubmit, initialValues, id}) => {
    const isEdit = !isEmpty(initialValues);
    let btnLabel = isEdit ? 'Save Changes!' : 'Save!';
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {isEdit && <Field name='id' component='input' id='id' hidden={isEdit} />}
            <Field name='author' component={InputText} id='author' hintText='Post author' label='Author' disabled={isEdit} />
            <Field name='title' component={InputText} id='title' hintText='Post title' label='Title' />
            <Field name='category' component={InputSelect} id='category' label='Category' disabled={isEdit}>
                {categories && categories.map(cat => (
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
    )
}

const mapStateToProps = ({categories, posts}) => {
    return {
        initialValues : posts.edit,
        enableReinitialize: true
    };
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

PostForm = withRouter(PostForm)

PostForm = reduxForm({
    validate
})(PostForm)

PostForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostForm)

export default PostForm;
