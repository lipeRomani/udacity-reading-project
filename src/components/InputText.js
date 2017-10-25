import React from 'react';
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField';

const styles = {
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

const InputText = ({hintText, labelText, value, name, id, onChange, multiline = false, rows = 1, error}) => {
    return (
        <TextField
            floatingLabelText={labelText}
            hintText={hintText}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            underlineStyle={styles.underlineStyle}
            underlineFocusStyle={styles.underlineFocusStyle}
            fullWidth={true}
            value={value}
            name={name}
            id={id}
            onChange={onChange}
            multiLine={multiline}
            rows={rows}
            /> 
    );
}

InputText.propTypes = {
    hintText     : PropTypes.string.isRequired,
    labelText    : PropTypes.string.isRequired,
    value        : PropTypes.string.isRequired,
    name         : PropTypes.string.isRequired,
    id           : PropTypes.string.isRequired,
    onChange     : PropTypes.func.isRequired,
    multiline    : PropTypes.bool,
    rows         : PropTypes.number 
}

export default InputText;