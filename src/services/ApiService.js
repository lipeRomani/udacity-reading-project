import {makeId} from '../helpers/IdHelper';

export const OPTION_UP_VOTE = 'upVote';
export const OPTION_DOWN_VOTE = 'downVote';

const CATEGORIES_URL = 'http://localhost:3001/categories';
const POSTS_URL = 'http://localhost:3001/posts';
const AUTH_KEY = "123456abcde";
const apiHeaders = {
    Authorization : AUTH_KEY,
    "Content-Type" : 'application/json'
}

export const getAllCategories = () => {
    return fetch(CATEGORIES_URL, {
        method : 'GET',
        headers : apiHeaders,
    })
    .then(result => result.json());
}

export const addPost = (post) => {
    post.timestamp = Date.now();
    post.id = makeId();

    return fetch(POSTS_URL, {
        method : 'POST',
        headers : {
            ...apiHeaders
        },
        body : JSON.stringify(post)
    })
    .then(result => result.json());
}

export const getAllPosts = () => {
    return fetch(POSTS_URL, {
        method : 'GET',
        headers : {
            ...apiHeaders
        }
    })
    .then(result => result.json());
}

export const getOnePostById = (id) => {
    const url = `${POSTS_URL}/${id}`;
    return fetch(url, {
        method: 'GET',
        headers : {
            ...apiHeaders
        }
    })
    .then(result => result.json());
}

export const voteById = (postId, option) => {
    const voteUrl = `${POSTS_URL}/${postId}`;
    const vote = {
        option
    };
    return fetch(voteUrl, {
        method : 'POST',
        headers : {
            ...apiHeaders
        },
        body : JSON.stringify(vote)
    })
    .then(result => result.json());
}

export const getCommentsByPostId = (postId) => {
    const url = `${POSTS_URL}/${postId}/comments`;
    return fetch(url, {
        method : 'GET',
        headers : {
            ...apiHeaders
        }
    })
    .then(result => result.json())
}

export const updatePost = ({id, title, body}) => {
    const url = `${POSTS_URL}/${id}`;
    const data = {title, body};
    return fetch(url, {
        method : "PUT",
        headers : {
            ...apiHeaders
        },
        body : JSON.stringify(data)
    })
    .then(result => result.json())
}

export const deletePost = (postId) => {
    const url = `${POSTS_URL}/${postId}`;
    return fetch(url, {
        method : 'DELETE',
        headers : {
            ...apiHeaders
        }
    })
    .then(result => result.json());
}