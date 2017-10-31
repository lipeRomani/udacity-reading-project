
export const RESET_POST_FORM =  'RESET_POST_FORM';
export const ADD_POST = 'ADD_POST';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_FILTER_BY_CATEGORY = 'ADD_FILTER_BY_CATEGORY';
export const CLEAR_FILTER_BY_CATEGORY = 'CLEAR_FILTER_BY_CATEGORY';
export const CHANGE_SORT_BY = 'CHANGE_SORT_BY';

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