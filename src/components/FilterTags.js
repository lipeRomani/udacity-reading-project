import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip';

const FilterTags = (props) => {
    const {categories} = props;
    return (
        <Paper zDepth={1} style={{padding : '8px'}}>
            <Subheader>Filter by tags</Subheader>
            <div style={{display : 'flex', flexWrap : 'wrap'}}>
            {categories.map((cat => (
                <Chip key={cat.path} style={{margin : '2px'}}>
                    {cat.name}
                </Chip>  
            )))}
            </div>
        </Paper>
    );
}

FilterTags.propTypes = {
    categories : PropTypes.arrayOf(PropTypes.shape({
        name : PropTypes.string.isRequired,
        path : PropTypes.string.isRequired
    })).isRequired
}

export default FilterTags;