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
import { createDataPegawai, getPegawaiById, updateDataPegawai } from 'src/redux/dataPegawaiActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const FormDataPegawai = props => {
    const dispatch = useDispatch();
    const dataPegawai = useSelector(state => state.dataPegawai)
    const history = useHistory();
    const { id } = useParams();
    const [data, setData] = useState({
      nip: '',
      nama: '',
      jenis_kelamin: '',
      tempat_lahir: '',
      tgl_lahir: '',
      no_telp: '',
      email: '',
      alamat: '',
      ttd_file: '',
      photo_file: ''
    })

    const submit = () => {
      if(!props.isUpdate){
        dispatch(createDataPegawai(data)).then(()=> {
          Swal.fire({
            title: 'Berhasil!',
            text: 'berhasil menambahkan data pegawai',
            icon: 'success',
            confirmButtonText: 'Tutup'
          }).then(()=> {
            history.push('/data-pegawai')
          })
        })
      } else {
        dispatch(updateDataPegawai({id: id, data: data})).then(()=> {
          Swal.fire({
            title: 'Berhasil!',
            text: 'berhasil mengupdate data pegawai',
            icon: 'success',
            confirmButtonText: 'Tutup'
          }).then(()=> {
            history.push('/data-pegawai')
          })
        })
      }

    }

    useEffect(()=> {
      if(props.isUpdate){
        dispatch(getPegawaiById(id)).then(result => {
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
                    <CLabel htmlFor="NIP">Nomor Induk Pegawai (NIP)</CLabel>
                    <CInput id="NIP" placeholder="Masukan NIP" value={data.nip} required onChange={e => setData({...data,nip: e.target.value})} />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="namalengkap">Nama Lengkap Pegawai</CLabel>
                    <CInput id="namalengkap" value={data.nama} placeholder="Masukan Nama Lengkap" required onChange={e => setData({...data, nama: e.target.value})} />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="jenis_kelamin">Jenis Kelamin</CLabel>
                    <CSelect custom name="jenis_kelamin" id="jenis_kelamin" value={data.jenis_kelamin} onChange={e => setData({...data,jenis_kelamin: e.target.value})}>
                      <option value="">--Pilih Kelamin--</option>
                      <option value="L">Laki-Laki</option>
                      <option value="P">Perempuan</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="tempat_lahir">Tempat Lahir</CLabel>
                    <CInput id="tempat_lahir" placeholder="Masukan tempat lahir" value={data.tempat_lahir} required onChange={e => setData({...data,tempat_lahir: e.target.value})} />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="Tanggal Lahir">Tanggal Lahir</CLabel>
                    <CInput id="Tanggal Lahir" type="date" placeholder="Masukan Tanggal Lahir" value={data.tgl_lahir} required onChange={e => setData({...data,tgl_lahir: e.target.value})} />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="NoTelp">Nomor Telfon</CLabel>
                    <CInput id="NoTelp" placeholder="Masukan Nomor Telfon" value={data.no_telp} required onChange={e => setData({...data,no_telp: e.target.value})} />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="Email">Email</CLabel>
                    <CInput id="Email" type="email" placeholder="Masukan Email" value={data.email} required onChange={e => setData({...data,email: e.target.value})} />
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
                    <CLabel htmlFor="filettd">File TTD</CLabel>
                    <CInput id="filettd" type="file" required  accept=".jpg,.jpeg,.png" onChange={e => setData({...data,ttd_file: e.target.files[0]})} />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="filettd">File Photo</CLabel>
                    <CInput id="filettd" type="file" required  accept=".jpg,.jpeg,.png"   onChange={e => setData({...data,photo_file: e.target.files[0]})}/>
                  </CFormGroup>
                </CCol>
              </CRow>
              
              <CButton color="primary" onClick={submit} disabled={dataPegawai.is_loading} >
                {props.isUpdate ? 'Update' : 'Tambah'}
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
    )
}


export default FormDataPegawai;