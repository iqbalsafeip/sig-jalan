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

const fields = ['no','username','detail pegawai','role','is_active', 'show_details'];

const DataUser = props => {
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
          dispatch(_deleteData({id: id, pathAPI: 'user', actionType: 'DELETE_INSTANSI'})).then(()=>{
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
      dispatch(getAll({pathAPI : 'user', actionType: 'SET_USERS'})).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },[])

    return (
        <>
        <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader >
              User
              <div className='card-header-actions'>
                <Link className="btn btn-primary" to="user/tambah"  >
                    Tambah Data
                </Link>
              </div>
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={state.auth.users}
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
                                <Link className="btn btn-warning " to={`user/${item.id}`} >
                                    Update
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
                    'detail pegawai' : 
                    (item) => (
                        item.tbl_pegawai ? (
                            <td>
                            <Link className="btn btn-primary btn-sm" to={`data-pegawai/${item.tbl_pegawai.id}`}  >Lihat Detail</Link>
                            </td>
                        ) : (
                            <td>
                                Tidak Memiliki Data Pegawai
                            </td>
                        )
                    ),
                    'role' : 
                    (item) => (
                        <td>
                            {item.User_role.role_name}
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


export default DataUser;