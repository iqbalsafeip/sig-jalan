import { applyMiddleware, combineReducers,createStore } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './authReducer'
import dataMasterReducer from './dataMasterReducer';
import dataPegawaiReducer from './dataPegawaiReducer';
import suratReducer from './dataSuratReducer';
import globalReducer from './globalReducer';
import jabatanReducer from './jabatanReducer';
import organisasiReducer from './organisasiReducer';

const rootReducer = combineReducers({
    auth : authReducer,
    global: globalReducer,
    dataMaster: dataMasterReducer,
    dataPegawai: dataPegawaiReducer,
    organisasi: organisasiReducer,
    jabatan : jabatanReducer,
    surat: suratReducer
})

export default createStore(rootReducer, applyMiddleware(thunk));
