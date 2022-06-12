import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CCollapse,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CFormGroup,
  CLabel,
  CInput,
  CSpinner
} from '@coreui/react'

import { useDispatch, useSelector } from 'react-redux'
import { createData, getAll, deleteData, updateData } from 'src/redux/globalActions'

const fields = ['no','role_name','createdAt', 'show_details']

const DataRole = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const [details, setDetails] = React.useState([])
    const [modalTambah, setModalTambah] = React.useState(false);
    const [modalUpdate, setModalUpdate] = React.useState(false);
    const [modalAlert, setModalAlert ] = React.useState([]);
    const [currData, setCurrData ] = React.useState(0);

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

    const onCreate = (role_name, cb) => {
        dispatch(createData({pathAPI: 'role', actionType: 'CREATE_ROLE', data: {
            role_name: role_name,
        }})).then(res => {
            cb();
            setModalTambah(false)
            setModalAlert([...modalAlert, {modalShown: false}])
        }).catch(err => {
            cb();
            setModalTambah(false)
        })
    }

    const onUpdate = (role_name, cb) => {
        dispatch(updateData({pathAPI: 'role', actionType: 'UPDATE_ROLE', id: currData , data: {
            role_name: role_name,
            
        }})).then(res => {
            cb();
            setModalUpdate(false)
        }).catch(err => {
            cb();
            setModalUpdate(false)
        })
    }

    const onDelete = (id, index) => {
      console.log(id);
        dispatch(deleteData({pathAPI: 'role', actionType: 'DELETE_ROLE', id: id})).then(res => {
            console.log(res);
            toggleDetails(index)
            const temp = modalAlert.map((d, idx)=> idx === index ? {shownModal: !modalAlert[index].shownModal}: d)
            setModalAlert(temp)
        }).catch(err => {
            console.log(err);
            toggleDetails(index)
            const temp = modalAlert.map((d, idx)=> idx === index ? {shownModal: !modalAlert[index].shownModal}: d)
            setModalAlert(temp)
        })
        
    }

    const toggleModalAlert = index => {
        const temp = modalAlert.map((d, idx)=> idx === index ? {shownModal: !modalAlert[index].shownModal}: d)
        setModalAlert(temp)
    }

    const updateToggle = (index) => {
        setCurrData(index) 
        setModalUpdate(!modalUpdate)
    }

    React.useEffect(()=> {
        dispatch(getAll({ pathAPI : 'role', actionType: 'SET_ROLE' })).then((res)=>{
            console.log(res.data.data);
            setModalAlert(res.data.data.map(data => ({ shownModal : false })))
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
              Data Role
              <div className='card-header-actions'>
                <CButton color="primary" onClick={()=> setModalTambah(!modalTambah)} >
                    Tambah Data
                </CButton>
              </div>
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={state.auth.roles}
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
                                <CButton size="sm" color="info" onClick={()=> updateToggle(item.id)  } >
                                    Update
                                </CButton>
                                <CButton size="sm" color="danger" className="ml-1" onClick={()=> toggleModalAlert(index)}  >
                                    Delete
                                </CButton>
                                </CCardBody>
                            </CCollapse>
                            <DataRole.ModalAlert show={modalAlert[index] ? modalAlert[index].shownModal : false} onClick={()=> onDelete(item.id, index)} toggle={()=> toggleModalAlert(index)} disabled={state.global.is_loading} />
                            </>
                        )
                    },
                    'no' :
                    (item,index) => (
                        <td>
                            {index+1}
                        </td>
                    )
                        
                }
              }
            />
            </CCardBody>
          </CCard>
        </CCol>

      </CRow>
      <DataRole.Modal modalShown={modalTambah} toggle={()=> setModalTambah(!modalTambah)} onSubmit={onCreate} disabled={state.global.is_loading} />
      <DataRole.Modal modalShown={modalUpdate} toggle={()=> setModalUpdate(!modalUpdate)} onSubmit={onUpdate} disabled={state.global.is_loading} isUpdate data={state.auth.roles.filter(d => d.id == currData)[0]} />
      
    </>
  )
}

const Modal = props => {

    const [nama, setNama] = React.useState('');

    const cb = () => {
        setNama('')
    }

    React.useEffect(()=> {
        if(props.isUpdate && props.modalShown) {
            const {role_name } = props.data
            setNama(role_name);
        }
    },[props.modalShown])

    return (
        <CModal
        show={props.modalShown}
        onClose={props.toggle}
      >
        <CModalHeader closeButton>{props.isUpdate ? 'Update' : 'Tambah'} Role</CModalHeader>
        <CModalBody>
            <CFormGroup>
                <CLabel htmlFor="nf-nama">Nama Role</CLabel>
                <CInput
                    type="text"
                    value={nama}
                    onChange={e => setNama(e.target.value)}
                    id="nf-nama"
                    name="nf-nama"
                    placeholder="Masukan Nama Role..."
                    required
                />
            </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={()=> props.onSubmit(nama, cb)} disabled={props.disabled} > {props.disabled ? <CSpinner size='sm' /> : null} {props.isUpdate ? 'Update' : 'Tambah'}</CButton>{' '}
          <CButton
            color="secondary"
            onClick={props.toggle}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>
    )
}

DataRole.ModalAlert = props => {
    return (
        <CModal
            show={props.show}
            onClose={props.toggle}
        >
            <CModalHeader closeButton >Yakin Hapus Data?</CModalHeader>
            <CModalBody>Jika Dihaspus maka data tidak dapat dikembalikan</CModalBody>
            <CModalFooter>
                <CButton color="danger" onClick={props.onClick} disabled={props.disabled} > {props.disabled ? <CSpinner size='sm' /> : null} Yakin</CButton>{' '}
                <CButton
                    color="secondary"
                    onClick={props.toggle}
                >Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

DataRole.Modal = Modal

export default DataRole
