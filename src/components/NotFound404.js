import React from 'react';
import PropTypes from 'prop-types';


const style = {
    title : {
        color : "#474747",
        fontSize : '3.9em',
        textAlign : 'center',
        marginTop : '3em',
    },
    message : {
        color : "#474747",
        fontSize : '0.9em',
        textAlign : 'center',
        marginTop : '0.5em'
    }
}

const NotFound404 = ({message}) => (
    <div>
        <h1 style={style.title}>404</h1>
        <p style={style.message}>{message}</p>
    </div>
)

NotFound404.propTypes = {
    message : PropTypes.string.isRequired
};

export default NotFound404;