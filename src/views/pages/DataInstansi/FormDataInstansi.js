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


const FormDataInstansi = props => {
    const dispatch = useDispatch();
    const state = useSelector(state => state)
    const history = useHistory();
    const { id } = useParams();
    const [data, setData] = useState({
        kode: '',
        nama: '',
        singkatan: '',
        alamat:'',
        keterangan: '',
        is_active: null,
    })

    const submit = () => {
      if(!props.isUpdate){
        dispatch(createData({pathAPI : 'instansi', data: data, actionType: 'CREATE_INSTANSI'})).then(()=> {
          Swal.fire({
            title: 'Berhasil!',
            text: 'berhasil menambahkan data instansi',
            icon: 'success',
            confirmButtonText: 'Tutup'
          }).then(()=> {
            history.push('/instansi')
          })
        })
      } else {
        dispatch(updateData({pathAPI: 'instansi', data: data, actionType: 'UPDATE_INSTANSI', id: id})).then(()=> {
          Swal.fire({
            title: 'Berhasil!',
            text: 'berhasil mengupdate data pegawai',
            icon: 'success',
            confirmButtonText: 'Tutup'
          }).then(()=> {
            history.push('/instansi')
          })
        })
      }

    }

    useEffect(()=> {
      if(props.isUpdate){
        dispatch(getDataById({id: id, pathAPI: 'instansi'})).then(result => {
          setData(result.data.data)
        })
      }
    },[])

    return (
        <CCol xs="12" sm="12">
          <CCard>
            <CCardHeader>
              {props.isUpdate ? 'Update' : 'Tambah'} Pegawai
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="Kode">Kode</CLabel>
                    <CInput id="Kode" placeholder="Masukan Kode" value={data.kode} required onChange={e => setData({...data,kode: e.target.value})} />
                  </CFormGroup>
                </CCol>
              </CRow>
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
                    <CLabel htmlFor="singkatan">Singkatan</CLabel>
                    <CInput id="singkatan" value={data.singkatan} placeholder="Masukan singkatan Lengkap" required onChange={e => setData({...data, singkatan: e.target.value})} />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="Alamat">Alamat</CLabel>
                    <CTextarea
                        rows={5}
                        required
                        value={data.alamat}
                        onChange={e => setData({...data,alamat: e.target.value})}
                    ></CTextarea>
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


export default FormDataInstansi;