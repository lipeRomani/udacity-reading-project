import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

const InputSelect = ({categories, labelText, value, onChange, id, name}) => {
    return (
        <SelectField
          floatingLabelText={labelText}
          onChange={onChange}
          id={id}
          name={name}
          value={value}
          fullWidth={true}
        >
            {categories.map(cat => (
                <MenuItem key={cat.path} value={cat.path} primaryText={cat.name} />
            ))}   
        </SelectField>
    )
} 

InputSelect.propTypes = {
    categories : PropTypes.arrayOf(PropTypes.shape({
        name : PropTypes.string.isRequired,
        path : PropTypes.string.isRequired
    })),
    labelText : PropTypes.string.isRequired,
    value : PropTypes.string,
    onChange : PropTypes.func.isRequired,
    id : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired
}

export default InputSelect;