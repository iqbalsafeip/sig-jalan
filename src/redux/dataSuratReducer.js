const initialState = {
    surat_masuk: [],
    surat_keluar: []
  }
  
  const suratReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SURAT_MASUK':
        return {...state, surat_masuk: action.value  }
      case 'SET_SURAT_KELUAR':
        return {...state, surat_keluar: action.value  }
      case 'DELETE_SURAT_MASUK':
        return {...state, surat_masuk: state.surat_masuk.filter(data => data.id != action.value)}
      default:
        return state
    }
  }
  
  export default suratReducer;