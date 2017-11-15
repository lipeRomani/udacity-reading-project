import React from 'react';
import PropTypes from 'prop-types';
import FaHandOUp from 'react-icons/lib/fa/hand-o-up';
import FaHandODown from 'react-icons/lib/fa/hand-o-down';
import FlatButton from 'material-ui/FlatButton';

const VoteMenu = ({onVoteUp, onVoteDown}) => {
    return (
        <div>
            <FlatButton
                label='Up Vote'
                primary={true}
                icon={<FaHandOUp />}
                onClick={onVoteUp}
            />
            <FlatButton
                label='Down Vote'
                secondary={true}
                icon={<FaHandODown />}
                onClick={onVoteDown}
            />
        </div>
    );
}

VoteMenu.propTypes = {
    onVoteUp : PropTypes.func.isRequired,
    onVoteDown : PropTypes.func.isRequired
}

export default VoteMenu;