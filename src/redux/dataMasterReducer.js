const initialState = {
    kategori_surat: [],
    sifat_surat: [],
    klasifikasi_surat: [],
    status_surat: [],
    tindakan_disposisi: [],
    klasifikasi_disposisi: [],
    is_loading: false
  }
  
  const dataMasterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LOADING_DM':
        return {...state, is_loading: action.value  }
      case 'SET_KATEGORI_SURAT':
        return {...state, kategori_surat: action.value  }
      case 'CREATE_KATEGORI_SURAT':
        return {...state, kategori_surat: [
            ...state.kategori_surat,
            action.value
        ]}
      case 'DELETE_KATEGORI_SURAT':
        return {...state, kategori_surat: state.kategori_surat.filter(data => data.id != action.value)}
      case 'UPDATE_KATEGORI_SURAT':
        return {
            ...state,
            kategori_surat: state.kategori_surat.map(_data => _data.id === action.value.id ? {..._data, ...action.value.data} : _data)
        }
      case 'SET_SIFAT_SURAT':
        return {...state, sifat_surat: action.value  }
      case 'CREATE_SIFAT_SURAT':
        return {...state, sifat_surat: [
            ...state.sifat_surat,
            action.value
        ]}
      case 'DELETE_SIFAT_SURAT':
        return {...state, sifat_surat: state.sifat_surat.filter(data => data.id != action.value)}
      case 'UPDATE_SIFAT_SURAT':
        return {
            ...state,
            sifat_surat: state.sifat_surat.map(_data => _data.id === action.value.id ? {..._data, ...action.value.data} : _data)
        }
      case 'SET_KLASIFIKASI_SURAT':
        return {...state, klasifikasi_surat: action.value  }
      case 'CREATE_KLASIFIKASI_SURAT':
        return {...state, klasifikasi_surat: [
            ...state.klasifikasi_surat,
            action.value
        ]}
      case 'DELETE_KLASIFIKASI_SURAT':
        return {...state, klasifikasi_surat: state.klasifikasi_surat.filter(data => data.id != action.value)}
      case 'UPDATE_KLASIFIKASI_SURAT':
        return {
            ...state,
            klasifikasi_surat: state.klasifikasi_surat.map(_data => _data.id === action.value.id ?{..._data, ...action.value.data} : _data)
        }
      case 'SET_STATUS_SURAT':
        return {...state, status_surat: action.value  }
      case 'CREATE_STATUS_SURAT':
        return {...state, status_surat: [
            ...state.status_surat,
            action.value
        ]}
      case 'DELETE_STATUS_SURAT':
        return {...state, status_surat: state.status_surat.filter(data => data.id != action.value)}
      case 'UPDATE_STATUS_SURAT':
        return {
            ...state,
            status_surat: state.status_surat.map(_data => _data.id === action.value.id ? {..._data, ...action.value.data} : _data)
        }
      case 'SET_TINDAKAN_DISPOSISI':
        return {...state, tindakan_disposisi: action.value  }
      case 'CREATE_TINDAKAN_DISPOSISI':
        return {...state, tindakan_disposisi: [
            ...state.tindakan_disposisi,
            action.value
        ]}
      case 'DELETE_TINDAKAN_DISPOSISI':
        return {...state, tindakan_disposisi: state.tindakan_disposisi.filter(data => data.id != action.value)}
      case 'UPDATE_TINDAKAN_DISPOSISI':
        return {
            ...state,
            tindakan_disposisi: state.tindakan_disposisi.map(_data => _data.id === action.value.id ? {..._data, ...action.value.data} : _data)
        }
      case 'SET_KLASIFIKASI_DISPOSISI':
        return {...state, klasifikasi_disposisi: action.value  }
      case 'CREATE_KLASIFIKASI_DISPOSISI':
        return {...state, klasifikasi_disposisi: [
            ...state.klasifikasi_disposisi,
            action.value
        ]}
      case 'DELETE_KLASIFIKASI_DISPOSISI':
        return {...state, klasifikasi_disposisi: state.klasifikasi_disposisi.filter(data => data.id != action.value)}
      case 'UPDATE_KLASIFIKASI_DISPOSISI':
        return {
            ...state,
            klasifikasi_disposisi: state.klasifikasi_disposisi.map(_data => _data.id === action.value.id ? {..._data, ...action.value.data} : _data)
        }   
      default:
        return state
    }
  }
  
  export default dataMasterReducer;