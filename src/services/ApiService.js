import {makeId} from '../helpers/IdHelper';

const CATEGORIES_URL = 'http://localhost:3001/categories';
const POSTS_URL = 'http://localhost:3001/posts';
const AUTH_KEY = "123456abcde";
const apiHeaders = {
    Authorization : AUTH_KEY
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
            ...apiHeaders,
            "Content-Type" : 'application/json',
        },
        body : JSON.stringify(post)
    })
    .then(result => result.json());
}