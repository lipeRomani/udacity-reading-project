
export const RESET_POST_FORM =  'RESET_POST_FORM';
export const ADD_POST = 'ADD_POST';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_FILTER_BY_CATEGORY = 'ADD_FILTER_BY_CATEGORY';
export const CLEAR_FILTER_BY_CATEGORY = 'CLEAR_FILTER_BY_CATEGORY';
export const CHANGE_SORT_BY = 'CHANGE_SORT_BY';
export const ADD_DETAILED_POST = 'ADD_DETAILED_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_POST = 'EDIT_POST';
export const ADD_ALERT = 'ADD_ALERT';
export const CLEAR_ALERT = 'CLEAR_ALERT';
export const REMOVE_POST = 'REMOVE_POST';
export const FORM_RESET = 'FORM_RESET';

export const resetPostForm = () => {
    return {
        type : RESET_POST_FORM
    }
}

export const addPost = ({id, timestamp, title, body, author, category, voteScore, deleted, commentCount}) => {
    return {
        type : ADD_POST,
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

export const removePost = (id) => {
    return {
        type : REMOVE_POST,
        id
    }
}

export const addFilterByCategory = (category) => {
    return {
        type : ADD_FILTER_BY_CATEGORY,
        category
    }
}

export const clearFilterByCategory = () => {
    return {
        type : CLEAR_FILTER_BY_CATEGORY
    }
}

export const addCategory = ({path, name}) => {
    return {
        type : ADD_CATEGORY,
        path,
        name
    }
}

export const changeSortBy = (sortBy) => {
    return {
        type : CHANGE_SORT_BY,
        sortBy
    }
}

export const addDetailedPost = (post) => {
    return {
        type : ADD_DETAILED_POST,
        post
    }
}

export const addComment = (comment, postId) => {
    return {
        type : ADD_COMMENT,
        comment,
        postId
    }
}

export const addEditPost = ({id, author, title, category, body}) => {
    return {
        type : EDIT_POST,
        id,
        author,
        title,
        category,
        body
    }
}

export const addAlert = ({message, typeMessage, time}) => {
    return {
        type : ADD_ALERT,
        typeMessage,
        time,
        message
    }
}

export const clearAlert = () => {
    return {
        type : CLEAR_ALERT
    }
}

export const formReset = () => ({
    type : FORM_RESET
});