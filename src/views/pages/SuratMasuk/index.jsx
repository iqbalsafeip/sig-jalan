import React from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CCollapse,
    CBadge
  } from '@coreui/react'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getAll, deleteData as _deleteData } from 'src/redux/globalActions';

const fields = ['no','no_agenda','no_surat','tgl_surat','tgl_terima' ,'perihal','atas_nama','show_details'];

const SuratMasuk = props => {
    const dispatch = useDispatch()

    const [details, setDetails] = React.useState([])

    const state = useSelector(state => state);

    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
          newDetails.splice(position, 1)
        } else {
          newDetails = [...details, index]
        }
        setDetails(newDetails)
    }

    const deleteData = id => {
      Swal.fire({
        'title' : 'Apakah Anda Yakin ?',
        'text' : 'Jika dihapus maka data tidak dapat dikembalikan',
        icon: 'warning',
        confirmButtonText: 'Yakin!',
        cancelButtonText: 'Tutup',
        showCancelButton: true
      }).then((res)=> {
        if(res.isConfirmed){
          dispatch(_deleteData({id: id, pathAPI: 'surat', actionType: 'DELETE_SURAT_MASUK'})).then(()=>{
            Swal.fire({
              title: 'Berhasil',
              text: 'berhasil menghapus data',
              icon: 'success',
              confirmButtonText: 'Tutup'
            })
          })
        }
      })

    }

    React.useEffect(()=> {
      dispatch(getAll({pathAPI : 'surat?tipe=0', actionType: 'SET_SURAT_MASUK'})).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err.response);
      })
    },[])

    return (
        <>
        <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader >
              Surat Masuk
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={state.surat.surat_masuk}
              fields={fields}
              itemsPerPage={5}
              pagination
                tableFilter
                itemsPerPageSelect
                hover
                sorter
                pagination
              scopedSlots = {{
                'show_details':
                  (item, index)=>{
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={()=>{toggleDetails(index)}}
                        >
                          {details.includes(index) ? 'Hide' : 'Show'}
                        </CButton>
                      </td>
                      )
                  },
                  'details':
                    (item, index)=>{
                        return (
                            <>
                            <CCollapse show={details.includes(index)}>
                                <CCardBody>
                                <p className="text-muted">Tanggal Buat: {item.createdAt}</p>
                                <p className="text-muted">Tanggal Update: {item.updatedAt}</p>
                                <Link className="btn btn-warning btn-sm" to={`surat/${item.id}`} >
                                    Lihat Surat
                                </Link>
                                <CButton size="sm" color="danger" className="ml-1" onClick={()=> deleteData(item.id)}  >
                                    Delete
                                </CButton>
                                </CCardBody>
                            </CCollapse>
                            </>
                        )
                    },
                    'no' :
                    (item,index) => (
                        <td>
                            {index+1}
                        </td>
                    ),
                    'is_active' : 
                    (item) => (
                        <td>
                        <CBadge color={item.is_active == 1 ? 'success' : 'secondary'}>
                            {item.is_active == 1 ? 'Aktif' : 'Tidak Aktif'}
                        </CBadge>
                        </td>
                    ),
                        
                }
              }
            />
            </CCardBody>
          </CCard>
        </CCol>

      </CRow>
      
    </>
    )
}


export default SuratMasuk;