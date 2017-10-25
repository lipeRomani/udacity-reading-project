

const CATEGORIES_URL = 'http://localhost:3001/categories';
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