import axios from'axios'; //Going to use to make api calls

const API = axios.create({baseURL:'http://localhost:5000'}) //API Base URL
//http://192.168.1.39:8280/api
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});


//API calls for the posts
//Fetch all item posts from DB
export const fetchPosts = () => API.get('/posts');
//Create item post
export const createPost = (newPost) => API.post('/posts', newPost);
//Increase like count
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
//Update item post
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
//Delete item post
export const deletePost = (id) => API.delete(`/posts/${id}`);

//API calls for the users
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

//API call to place an order
export const createOrder = (newOrder) => API.post('/order', newOrder);

