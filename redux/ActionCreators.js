import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

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
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(comments => dispatch(CommentsAdd(comments)))
        .catch(error => dispatch(Commentsfailed(error.message)))
}

export const Commentsfailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const CommentsAdd = (payload) => ({
    type: ActionTypes.COMMENTS_ADD,
    payoad: payload
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
        .then(comments => dispatch(DishesAdd(comments)))
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
    payoad: payload
});


export const fetchPromotion = () => (dispatch) => {
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
        .then(comments => dispatch(PromotionsAdd(comments)))
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
    payoad: payload
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
        .then(comments => dispatch(PromotionsAdd(comments)))
        .catch(error => dispatch(PromotionsFailed(error.message)))
}

export const LeadersLoading = () => ({
    type: ActionTypes.PROMOS_LOADING,
    payload: []
});

export const LeadersFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const LeadersAdd = (payload) => ({
    type: ActionTypes.PROMOS_ADD,
    payoad: payload
});

