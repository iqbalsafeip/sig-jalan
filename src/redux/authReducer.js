const initialState = {
  is_login: false,
  users: [],
  roles: "",
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return { ...state, is_login: action.payload };
    case "SET_USERS":
      return { ...state, users: action.value };
    case "SET_ROLE":
      return { ...state, roles: action.payload };
    case "CREATE_ROLE":
      return { ...state, roles: [...state.roles, action.value] };
    case "DELETE_ROLE":
      return {
        ...state,
        roles: state.roles.filter((data) => data.id != action.value),
      };
    case "UPDATE_ROLE":
      return {
        ...state,
        roles: state.roles.map((_data) =>
          _data.id === action.value.id
            ? { ..._data, ...action.value.data }
            : _data
        ),
      };
    case "SET_USER": {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
