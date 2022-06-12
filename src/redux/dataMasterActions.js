import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

const getItem = (key) => {
    return localStorage.getItem(key)
}


export const getAll = (data) => (dispatch) => {
    dispatch({type: 'SET_LOADING_DM', value: true})
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: BASE_URL + data.pathAPI,
            headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `bearier ${localStorage.getItem('token')}`
            }
        })
            .then(function(response) {
                dispatch({type: data.actionType, value: response.data.data})
                dispatch({type: 'SET_LOADING_DM', value: false})
                resolve(response);
            })
            .catch(function(response) {
                dispatch({type: 'SET_LOADING_DM', value: false})
                reject(response);
            });
    });
};

export const createData = (data) => (dispatch) => {
    dispatch({type: 'SET_LOADING_DM', value: true})
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: BASE_URL + data.pathAPI,
            headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearier ${localStorage.getItem('token')}`
            },
            data: data.data
        })
            .then(function(response) {
                dispatch({type: data.actionType, value: response.data.data})
                dispatch({type: 'SET_LOADING_DM', value: false})
                resolve(response);
            })
            .catch(function(response) {
                dispatch({type: 'SET_LOADING_DM', value: false})
                reject(response);
            });
    });
};


export const deleteData = (data) => (dispatch) => {
    dispatch({type: 'SET_LOADING_DM', value: true})
    return new Promise((resolve, reject) => {
        axios({
            method: 'DELETE',
            url: BASE_URL + data.pathAPI + `/${data.data.id}`,
            headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearier ${localStorage.getItem('token')}`
            },
        })
            .then(function(response) {
                dispatch({type: data.actionType, value: data.data.id})
                dispatch({type: 'SET_LOADING_DM', value: false})
                resolve(response);
            })
            .catch(function(response) {
                dispatch({type: 'SET_LOADING_DM', value: false})
                reject(response);
            });
    });
};


export const updateData = (data) => (dispatch) => {
    dispatch({type: 'SET_LOADING_DM', value: true})
    return new Promise((resolve, reject) => {
        axios({
            method: 'PATCH',
            url: BASE_URL + data.pathAPI + `/${data.id}`,
            headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearier ${localStorage.getItem('token')}`
            },
            data: data.data
        })
            .then(function(response) {
                dispatch({type: data.actionType, value: {id : data.id, data: data.data}})
                dispatch({type: 'SET_LOADING_DM', value: false})
                resolve(response);
            })
            .catch(function(response) {
                dispatch({type: 'SET_LOADING_DM', value: false})
                reject(response);
            });
    });
};