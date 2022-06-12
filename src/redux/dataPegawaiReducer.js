const initialState = {
    pegawai: [],
    is_loading: false
  }
  
  const dataPegawaiReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PEGAWAI':
        return {...state, pegawai: action.value  }
      case 'SET_LOADING_DP':
        return {...state, is_loading: action.value  }
      case 'DELETE_DATA_PEGAWAI':
        return {...state, pegawai: state.pegawai.filter((d) => d.id != action.value)   }
      case 'SET_LOADING_DP':
        return {...state, is_loading: action.value  }
      
      default:
        return state
    }
  }
  
  export default dataPegawaiReducer;