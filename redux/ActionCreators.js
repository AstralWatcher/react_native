import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import { render } from 'react-dom';

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        }, error => {
            console.error('Failed to fetch comments:' + JSON.stringify(error.message));
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(comments => dispatch(CommentsAdd(comments)))
        .catch(error => dispatch(Commentsfailed(error.message)))
}

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    var payload = {
        dishId: dishId,
        rating: rating,
        comment: comment,
        author: author,
        date : new Date().toISOString()
    }
    setTimeout(()=> {
        dispatch(CommentsPost(payload))
    },2000)
}

export const Commentsfailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const CommentsAdd = (payload) => ({
    type: ActionTypes.COMMENTS_ADD,
    payload: payload
});

export const CommentsPost = (payload) => ({
    type: ActionTypes.COMMENT_POST,
    payload: payload
});


export const fetchDishes = () => (dispatch) => {
    dispatch(DishesLoading());
    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        }, error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(DishesAdd(dishes)))
        .catch(error => dispatch(DishesFailed(error.message)))
}

export const DishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING,
    payload: []
});

export const DishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const DishesAdd = (payload) => ({
    type: ActionTypes.DISHES_ADD,
    payload: payload
});


export const fetchPromotions = () => (dispatch) => {
    dispatch(PromotionsLoading());
    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        }, error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(promotions => dispatch(PromotionsAdd(promotions)))
        .catch(error => dispatch(PromotionsFailed(error.message)))
}

export const PromotionsLoading = () => ({
    type: ActionTypes.PROMOS_LOADING,
    payload: []
});

export const PromotionsFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const PromotionsAdd = (payload) => ({
    type: ActionTypes.PROMOS_ADD,
    payload: payload
});


export const fetchLeaders = () => (dispatch) => {
    dispatch(LeadersLoading());
    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        }, error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(leaders => dispatch(LeadersAdd(leaders)))
        .catch(error => dispatch(LeadersFailed(error.message)))
}

export const LeadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING,
    payload: []
});

export const LeadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const LeadersAdd = (payload) => ({
    type: ActionTypes.LEADERS_ADD,
    payload: payload
});

//thunk
export const postFavorite = (dishId) => (dispatch) => {
    
    setTimeout(()=> {
        dispatch(addFavorite(dishId))
    },2000)
}

export const addFavorite = (dishId) => ({
    type: ActionTypes.FAVORITES_ADD,
    payload: dishId
})

export const deleteFavorite = (dishId) => ({
    type: ActionTypes.FAVORITES_DELETE,
    payload: dishId
})