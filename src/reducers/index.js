import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {RESET_POST_FORM} from '../actions';

const categories = (state = {}, action) => {
    switch (action.type) {
        default : 
            return state;
    } 
}

const posts = (state = {}, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default combineReducers({
    posts,
    categories,
    form : formReducer.plugin({
        addPost : (state, action) => {
            switch(action.type) {
                case RESET_POST_FORM:
                    return {
                        ...state,
                        values : {},
                        fields : {}
                    };
                default : 
                    return state;
            }
        }
    })
})