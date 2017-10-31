import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {
    RESET_POST_FORM,
    ADD_POST,
    ADD_CATEGORY,
    ADD_FILTER_BY_CATEGORY,
    CLEAR_FILTER_BY_CATEGORY,
    CHANGE_SORT_BY
} from '../actions';
import {SORT_BY_VOTE_SCORE} from '../helpers/SortHelper'


const initFilterState = {
    category : null,
    sortBy  : SORT_BY_VOTE_SCORE 
}


const categories = (state = {}, action) => {
    switch (action.type) {
        case ADD_CATEGORY : 
            const {path, name} = action;
            return {
                ...state,
                [path] : {
                    path,
                    name
                }
            }
        default : 
            return state;
    } 
}

const posts = (state = {}, action) => {
    switch(action.type) {
        case ADD_POST:
            const {id, timestamp, title, body, author, category, voteScore, deleted, commentCount} = action;
            return {
                ...state,
                [id] : {
                    id,
                    timestamp,
                    title,
                    body,
                    author,
                    category,
                    voteScore,
                    deleted,
                    commentCount
                }
            }
        default:
            return state;
    }
}

const filter = (state = initFilterState, action) => {
    switch(action.type) {
        case ADD_FILTER_BY_CATEGORY:
            const {category} = action;
            return {
                ...state,
                category
            }
        case CLEAR_FILTER_BY_CATEGORY:
            return {
                ...state,
                category : null
            }
        case CHANGE_SORT_BY:
            const {sortBy} = action;
            return {
                ...state,
                sortBy
            }
        default : 
            return state
    }
}

const addPostFormReset = (state, action) => {
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

export default combineReducers({
    posts,
    categories,
    filter,
    form : formReducer.plugin({
        addPost : addPostFormReset
    })
})