import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {
    RESET_POST_FORM,
    ADD_POST,
    ADD_CATEGORY,
    ADD_FILTER_BY_CATEGORY,
    CLEAR_FILTER_BY_CATEGORY,
    CHANGE_SORT_BY,
    ADD_DETAILED_POST,
    EDIT_POST,
    ADD_ALERT,
    CLEAR_ALERT,
    REMOVE_POST, 
    ADD_COMMENT,
    COMMENT_FORM_RESET,
    REMOVE_COMMENT,
    ADD_EDIT_COMMENT,
    REMOVE_EDIT_COMMENT
} from '../actions';
import {SORT_BY_VOTE_SCORE} from '../helpers/SortHelper'


const initFilterState = {
    category : null,
    sortBy  : SORT_BY_VOTE_SCORE 
}

const alertInitialState = {
    alert : {},
    options : {
        offset: 14,
        position: 'bottom left',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
    }
}

const initPostsState = {
    list : {},
    detail : {},
    edit : {}
}

const initialCommentState = {
    list : {},
    edit : {}
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

const posts = (state = initPostsState, action) => {
    let {id, timestamp, title, body, author, category, voteScore, deleted, commentCount} = action;
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,
                list : {
                    ...state['list'],
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
            }
        case ADD_DETAILED_POST : 
            let {post} = action;
            return {
                ...state,
                detail : post 
            }
        case EDIT_POST : 
            return {
                ...state,
                edit : {
                    id,
                    author,
                    title,
                    body,
                    category
                }
            }
        case REMOVE_POST : 
            delete state.list[id];
            return state;
        default:
            return state;
    }
}

const alert = (state = alertInitialState, action) => {
    const {typeMessage, message, time} = action;
    switch(action.type) {
        case ADD_ALERT : 
            return {
                ...state,
                alert : {
                    typeMessage,
                    message,
                    time
                }
            };
        case CLEAR_ALERT : 
            return {
                ...state,
                alert : {}
            }
        default : 
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

const comments = (state = initialCommentState, action) => {
    const {comment, postId, id, body, author} = action;
    switch(action.type) {
        case ADD_COMMENT : 
            return  {
                ...state,
                list : {
                    ...state['list'],
                    [postId] : {
                            ...state['list'][postId],
                            [comment.id] : comment
                    }
                }
            }
        case REMOVE_COMMENT: 
            const newState = Object.assign({}, state);
            delete newState['list'][postId][id];
            return newState;
        case ADD_EDIT_COMMENT:
            return {
                ...state,
                edit : {
                    id,
                    author,
                    body
                }
            }
        case REMOVE_EDIT_COMMENT:
            return {
                ...state,
                edit : {}
            }
        default : 
            return state;
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

const commentFormReset = (state, action) => {
    const {type} = action;
    switch(type) {
        case COMMENT_FORM_RESET:
            return {
                ...state,
                values : {},
                fields : {}
            }
        default:
            return state;
    }
}

export default combineReducers({
    posts,
    categories,
    alert,
    filter,
    comments,
    form : formReducer.plugin({
        addPost : addPostFormReset,
        commentForm : commentFormReset
    })
})