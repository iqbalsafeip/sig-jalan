import axios from "axios";

const BASE_URL = "http://localhost:1337/api/";

const storeItem = (token) => {
  localStorage.setItem("token", token);
};

const getItem = (key) => {
  return localStorage.getItem(key);
};

export const isLogin = () => (dispatch) => {
  const token = getItem("token");
  console.log(token);
  if (token) {
    axios
      .get(BASE_URL + "users/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log("data : ", res.data);

        dispatch({ type: "SET_ROLE", payload: res?.data?.peran });
        dispatch({ type: "SET_USER", payload: res.data });
        dispatch({ type: "SET_LOGIN", payload: true });
        dispatch({ type: "SET_TOKEN", payload: token });
      });
  }
};

export const login = (data) => (dispatch) => {
  dispatch({ type: "SET_LOADING", payload: true });
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: BASE_URL + "auth/local",
      data: data,
    })
      .then(function (response) {
        console.log(response);
        dispatch({ type: "SET_ROLE", payload: response?.data?.user.peran });
        dispatch({ type: "SET_LOGIN", payload: true });
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({ type: "SET_USER", payload: response.data.user });
        const { jwt: token } = response.data;
        dispatch({ type: "SET_TOKEN", payload: token });
        storeItem(token);
        resolve();
      })
      .catch(function (response) {
        console.log(response.response);
        reject();
        dispatch({ type: "SET_LOADING", payload: false });
      });
  });
};

export const logout = () => (dispatch) => {
  dispatch({ type: "SET_LOGIN", payload: false });
  dispatch({ type: "SET_TOKEN", payload: "" });
  localStorage.removeItem("token");
};

export const createUser = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: BASE_URL + "auth/local/register",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearier ${getItem("token")}`,
      },
      data: data,
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (response) {
        reject(response);
      });
  });
};

export const upload = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: BASE_URL + "upload",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `bearier ${getItem("token")}`,
      },
      data,
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (response) {
        reject(response);
      });
  });
};

export const createJalan = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BASE_URL + "jalans", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (response) {
        reject(response);
      });
  });
};
export const createKomen = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BASE_URL + "komentars", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (response) {
        reject(response);
      });
  });
};

export const updateData = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "PATCH",
      url: BASE_URL + "user" + `/${data.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearier ${localStorage.getItem("token")}`,
      },
      data: data.data,
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (response) {
        reject(response);
      });
  });
};
export const getUser = (peran) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: BASE_URL + "users?filters[peran][$contains]=" + peran,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (response) {
        reject(response);
      });
  });
};
export const getKomentar = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: BASE_URL + "komentars?filters[jalan][id][$eq]=" + id + "&populate=*",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (response) {
        reject(response);
      });
  });
};
export const getJalan = (peran) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: BASE_URL + "jalans",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (response) {
        reject(response);
      });
  });
};

export const getJalanById = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: BASE_URL + "jalans/" + id + "?populate=*",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (response) {
        reject(response);
      });
  });
};

export const deleteJalan = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "DELETE",
      url: BASE_URL + "jalans/" + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (response) {
        reject(response);
      });
  });
};

export const getKecamatan = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: BASE_URL + "kecamatans",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (response) {
        reject(response);
      });
  });
};
export const addKecamatan = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BASE_URL + "kecamatans", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (response) {
        reject(response);
      });
  });
};
export const deleteUser = (id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "DELETE",
      url: BASE_URL + "users/" + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (response) {
        reject(response);
      });
  });
};

// export const deleteKandidat = (data) => (dispatch) => {
//     return new Promise((resolve, reject) => {
//             axios({
//                     method: 'get',
//                     url: config.baseURL + `kandidat/delete/${data}`,
//                     headers: {
//                             'Content-Type': 'multipart/form-data',
//                             Authorization: `bearier ${localStorage.getItem('jwt_adm')}`
//                     }
//             })
//                     .then(function(response) {
//                             dispatch({ type: 'DELETE_KANDIDAT', value: data });
//                             resolve(response);
//                     })
//                     .catch(function(response) {
//                             reject(response);
//                     });
//     });
// };
