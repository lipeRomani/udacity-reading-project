import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import FaTimesCircleO from 'react-icons/lib/fa/times-circle-o';

const FilterTags = (props) => {
    const {categories, selected, onFilter, onClearFilter} = props;
    return (
        <Paper zDepth={1} style={{padding : '8px'}}>
            <Subheader>Filter by tags</Subheader>
            <div style={{display : 'flex', flexWrap : 'wrap'}}>
            {Object.keys(categories)
                .map((key => {
                const cat = categories[key];
                return (
                    <Chip 
                        key={cat.path} style={{margin : '2px'}}
                        labelColor={selected === cat.name ? '#fff' : ''}
                        backgroundColor={selected === cat.name ? '#800080' : ''}
                        onClick={() => onFilter(cat.name)}>
                        {cat.name}
                    </Chip>
                )
            }))}
            </div>
            <Divider style={{marginTop : '0.4em'}} />
            <FlatButton label="clear" secondary={true} icon={<FaTimesCircleO />} onClick={onClearFilter} />
        </Paper>
    );
}

FilterTags.propTypes = {
    selected : PropTypes.string,
    onFilter : PropTypes.func,
    onClearFilter : PropTypes.func
}

export default FilterTags;