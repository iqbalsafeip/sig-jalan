import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

const generateFormData = object => {
    const formData = new FormData()
    Object.keys(object).map(data => {
        formData.append(data, object[data]);
        console.log(data, object[data]);
    })
    return formData;
}


export const getAllPegawai = (data) => (dispatch) => {
    dispatch({type: 'SET_LOADING_DP', value: true})
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: BASE_URL + 'pegawai',
            headers: {
                    Authorization: `bearier ${localStorage.getItem('token')}`
            }
        })
            .then(function(response) {
                dispatch({type: 'SET_PEGAWAI', value: response.data.data})
                dispatch({type: 'SET_LOADING_DP', value: false})
                resolve(response);
            })
            .catch(function(response) {
                dispatch({type: 'SET_LOADING_DP', value: false})
                reject(response);
            });
    });
};

export const getUserByPegawai = data => dispatch => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: BASE_URL + 'user?pegawai=' + data,
            headers: {
                    Authorization: `bearier ${localStorage.getItem('token')}`
            }
        })
            .then(function(response) {
                resolve(response);
            })
            .catch(function(response) {
                reject(response);
            });
    });
}

export const getPegawaiById = (data) => (dispatch) => {
    dispatch({type: 'SET_LOADING_DP', value: true})
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: BASE_URL + 'pegawai' + '/' + data,
            headers: {
                    Authorization: `bearier ${localStorage.getItem('token')}`
            }
        })
            .then(function(response) {
                dispatch({type: 'SET_LOADING_DP', value: false})
                resolve(response);
            })
            .catch(function(response) {
                dispatch({type: 'SET_LOADING_DP', value: false})
                reject(response);
            });
    });
};

export const createDataPegawai = (data) => (dispatch) => {
    dispatch({type: 'SET_LOADING_DP', value: true})

    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: BASE_URL + 'pegawai',
            headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `bearier ${localStorage.getItem('token')}`
            },
            data: generateFormData(data)
        })
            .then(function(response) {
                dispatch({type: 'CREATE_DATA_PEGAWAI', value: response.data.data})
                dispatch({type: 'SET_LOADING_DP', value: false})
                resolve(response);
            })
            .catch(function(response) {
                dispatch({type: 'SET_LOADING_DP', value: false})
                reject(response);
            });
    });
};


export const deleteDataPegawai = (data) => (dispatch) => {
    dispatch({type: 'SET_LOADING_DP', value: true})
    return new Promise((resolve, reject) => {
        axios({
            method: 'DELETE',
            url: BASE_URL + 'pegawai' + `/${data}`,
            headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearier ${localStorage.getItem('token')}`
            },
        })
            .then(function(response) {
                dispatch({type: 'DELETE_DATA_PEGAWAI', value: data})
                dispatch({type: 'SET_LOADING_DP', value: false})
                resolve(response);
            })
            .catch(function(response) {
                dispatch({type: 'SET_LOADING_DP', value: false})
                reject(response);
            });
    });
};


export const updateDataPegawai = (data) => (dispatch) => {
    dispatch({type: 'SET_LOADING_DP', value: true})
    return new Promise((resolve, reject) => {
        axios({
            method: 'PATCH',
            url: BASE_URL + 'pegawai' + `/${data.id}`,
            headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `bearier ${localStorage.getItem('token')}`
            },
            data: generateFormData(data.data)
        })
            .then(function(response) {
                dispatch({type: 'UPDATE_DATA_PEGAWAI', value: {id : data.id, data: data.data}})
                dispatch({type: 'SET_LOADING_DP', value: false})
                resolve(response);
            })
            .catch(function(response) {
                dispatch({type: 'SET_LOADING_DP', value: false})
                reject(response);
            });
    });
};