const initialState = {
    instansi: [],
    jabatan:[],
    unit_kerja:[],
    is_loading: false
  }
  
  const organisasiReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_INSTANSI':
        return {...state, instansi: action.value  }
      case 'CREATE_INSTANSI':
        return {...state, instansi: [
            ...state.instansi,
            action.value
        ]}
      case 'DELETE_INSTANSI':
        return {...state, instansi: state.instansi.filter(data => data.id != action.value)}
      case 'UPDATE_INSTANSI':
        return {
            ...state,
            instansi: state.instansi.map(_data => _data.id === action.value.id ? action.value.data : _data)
        }
      case 'SET_JABATAN':
        return {...state, jabatan: action.value  }
      case 'CREATE_JABATAN':
        return {...state, jabatan: [
            ...state.jabatan,
            action.value
        ]}
      case 'DELETE_JABATAN':
        return {...state, jabatan: state.jabatan.filter(data => data.id != action.value)}
      case 'UPDATE_JABATAN':
        return {
            ...state,
            jabatan: state.jabatan.map(_data => _data.id === action.value.id ? action.value.data : _data)
        }
      case 'SET_UNIT_KERJA':
        return {...state, unit_kerja: action.value  }
      case 'CREATE_UNIT_KERJA':
        return {...state, unit_kerja: [
            ...state.unit_kerja,
            action.value
        ]}
      case 'DELETE_UNIT_KERJA':
        return {...state, unit_kerja: state.unit_kerja.filter(data => data.id != action.value)}
      case 'UPDATE_UNIT_KERJA':
        return {
            ...state,
            unit_kerja: state.unit_kerja.map(_data => _data.id === action.value.id ? action.value.data : _data)
        }
      default:
        return state
    }
  }
  
  export default organisasiReducer;