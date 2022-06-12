const initialState = {
    unit_kerja: [],
    jabatan: [],
    mapping_uk: []
  }
  
  const jabatanReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_JABATAN':
        return {...state, jabatan: action.value  }
      case 'CREATE_JABATAN':
        let data = {
            ...action.value,
            parent: state.jabatan.filter((_d)=> _d.id === parseInt(action.value.parent_id) ? _d : null)[0]
        }
        return {...state, jabatan: [
            ...state.jabatan,
            data
        ]}
      case 'DELETE_JABATAN':
        return {...state, jabatan: state.jabatan.filter(data => data.id != action.value)}
      case 'UPDATE_JABATAN':
        return {
            ...state,
            jabatan: state.jabatan.map(_data => _data.id === action.value.id ? {..._data, ...action.value.data} : _data)
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
      case 'SET_MUK':
        return {...state, mapping_uk: action.value  }
      case 'CREATE_MUK':
        return {...state, mapping_uk: [
            ...state.mapping_uk,
            action.value
        ]}
      case 'DELETE_MUK':
        return {...state, mapping_uk: state.mapping_uk.filter(data => data.id != action.value)}
      case 'UPDATE_MUK':
        return {
            ...state,
            mapping_uk: state.mapping_uk.map(_data => _data.id === action.value.id ? action.value.data : _data)
        }
      default:   
        return state
    }
  }
  
  export default jabatanReducer;