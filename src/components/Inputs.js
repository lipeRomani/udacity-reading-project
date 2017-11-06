import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

const inputTextStyles = {
    floatingLabelFocusStyle : {
        color : 'purple'
    },
    underlineStyle : {
        borderColor : '#d3d3d3'
    },
    underlineFocusStyle : {
        borderColor : 'purple'
    }
}

export const InputText = ({input, label, hintText, meta: { touched, error }, ...custom }) => ( 
    <TextField
        floatingLabelText={label}
        hintText={hintText}
        floatingLabelFocusStyle={inputTextStyles.floatingLabelFocusStyle}
        underlineStyle={inputTextStyles.underlineStyle}
        underlineFocusStyle={inputTextStyles.underlineFocusStyle}
        fullWidth={true}
        errorText={touched && error}
        {...input}
        {...custom} /> 
)


export const InputSelect = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
    onChange={(event, index, value) => input.onChange(value)}
    children={children} 
    fullWidth={true} />
)