import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

export const getAll = (data) => (dispatch) => {
    dispatch({type: 'set', is_loading:true})
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
                if(data.actionType){
                    dispatch({type: data.actionType, value: response.data.data})
                }
                dispatch({type: 'set', is_loading: false})
                resolve(response);
            })
            .catch(function(response) {
                dispatch({type: 'set', is_loading: false})
                reject(response);
            });
    });
};

export const getDataById = (data) => (dispatch) => {
    dispatch({type: 'set', is_loading:true})
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: BASE_URL + data.pathAPI + '/' + data.id,
            headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `bearier ${localStorage.getItem('token')}`
            }
        })
            .then(function(response) {
                dispatch({type: 'set', is_loading: false})
                resolve(response);
            })
            .catch(function(response) {
                dispatch({type: 'set', is_loading: false})
                reject(response);
            });
    });
};

export const createData = (data) => (dispatch) => {
    dispatch({type: 'set', is_loading:true})
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
                if(data.actionType){
                    dispatch({type: data.actionType, value: response.data.data})
                }
                dispatch({type: 'set', is_loading: false})
                resolve(response);
            })
            .catch(function(response) {
                dispatch({type: 'set', is_loading: false})
                reject(response);
            });
    });
};


export const deleteData = (data) => (dispatch) => {
    dispatch({type: 'set', is_loading:true})
    return new Promise((resolve, reject) => {
        axios({
            method: 'DELETE',
            url: BASE_URL + data.pathAPI + `/${data.id}`,
            headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearier ${localStorage.getItem('token')}`
            },
        })
            .then(function(response) {
                dispatch({type: data.actionType, value: data.id})
                dispatch({type: 'set', is_loading: false})
                resolve(response);
            })
            .catch(function(response) {
                dispatch({type: 'set', is_loading: false})
                reject(response);
            });
    });
};


export const updateData = (data) => (dispatch) => {
    dispatch({type: 'set', is_loading:true})
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
                dispatch({type: 'set', is_loading: false})
                resolve(response);
            })
            .catch(function(response) {
                dispatch({type: 'set', is_loading: false})
                console.log(response.data);
                reject(response);
            });
    });
};