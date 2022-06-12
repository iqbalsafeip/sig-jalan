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

export const createSurat = (data, penerima) => (dispatch) => {
    dispatch({type: 'SET_LOADING_DP', value: true})

    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: BASE_URL + 'surat',
            headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `bearier ${localStorage.getItem('token')}`
            },
            data: generateFormData({...data, penerima : JSON.stringify(penerima)})
        })
            .then(function(response) {
                dispatch({type: 'SET_LOADING_DP', value: false})
                resolve(response);
            })
            .catch(function(response) {
                dispatch({type: 'SET_LOADING_DP', value: false})
                console.log(response.stack);
                reject(response);
            });
    });
};