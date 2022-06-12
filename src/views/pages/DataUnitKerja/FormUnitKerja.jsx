import React, { useEffect, useState } from 'react';

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CSelect,
  CRow,
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createData, updateData, getDataById } from 'src/redux/globalActions';


const FormUnitKerja = props => {
    const dispatch = useDispatch();
    const state = useSelector(state => state)
    const history = useHistory();
    const { id } = useParams();
    const [data, setData] = useState({
        nama: '',
        keterangan: '',
        is_active: null,
    })

    const submit = () => {
      if(!props.isUpdate){
        dispatch(createData({pathAPI : 'unit_kerja', data: data, actionType: 'CREATE_UNIT_KERJA'})).then(()=> {
          Swal.fire({
            title: 'Berhasil!',
            text: 'berhasil menambahkan data unit kerja',
            icon: 'success',
            confirmButtonText: 'Tutup'
          }).then(()=> {
            history.push('/unit-kerja')
          })
        })
      } else {
        dispatch(updateData({pathAPI: 'unit_kerja', data: data, actionType: 'UPDATE_UNIT_KERJA', id: id})).then(()=> {
          Swal.fire({
            title: 'Berhasil!',
            text: 'berhasil mengupdate data unit kerja',
            icon: 'success',
            confirmButtonText: 'Tutup'
          }).then(()=> {
            history.push('/unit-kerja')
          })
        })
      }

    }

    useEffect(()=> {
      if(props.isUpdate){
        dispatch(getDataById({id: id, pathAPI: 'unit_kerja'})).then(result => {
          setData(result.data.data)
        })
      }
    },[])

    return (
        <CCol xs="12" sm="12">
          <CCard>
            <CCardHeader>
              {props.isUpdate ? 'Update' : 'Tambah'} Unit Kerja
            </CCardHeader>
            <CCardBody>
              
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="namalengkap">Nama</CLabel>
                    <CInput id="namalengkap" value={data.nama} placeholder="Masukan Nama Lengkap" required onChange={e => setData({...data, nama: e.target.value})} />
                  </CFormGroup>
                </CCol>
              </CRow>
              
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="Alamat">Keterangan</CLabel>
                    <CTextarea
                        rows={5}
                        required
                        value={data.keterangan}
                        onChange={e => setData({...data,keterangan: e.target.value})}
                    ></CTextarea>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="is_active">Is Active</CLabel>
                    <CSelect custom name="is_active" id="is_active" value={data.is_active} onChange={e => setData({...data,is_active: e.target.value})}>
                      <option value="">---</option>
                      <option value="1">Aktif</option>
                      <option value="0">Tidak Aktif</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CButton color="primary" onClick={submit} disabled={state.global.is_loading} >
                {props.isUpdate ? 'Update' : 'Tambah'}
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
    )
}


export default FormUnitKerja;