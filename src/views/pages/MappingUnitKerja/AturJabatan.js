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
  CSpinner,
  CSelect,
  CTextarea,
  CBadge
} from '@coreui/react'

import { useDispatch, useSelector } from 'react-redux'
import { createData, getAll, deleteData, updateData } from 'src/redux/globalActions'
import { Link, useParams } from 'react-router-dom'

const fields = ['no','jabatan','keterangan' ,'show_details']

const AturJabatan = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const [details, setDetails] = React.useState([])
    const [modalTambah, setModalTambah] = React.useState(false);
    const [modalUpdate, setModalUpdate] = React.useState(false);
    const [modalAlert, setModalAlert ] = React.useState([]);
    const [currData, setCurrData ] = React.useState(0);

    const {id} = useParams();

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

    const onCreate = (data, cb) => {
        dispatch(createData({pathAPI: 'mapping-unit-kerja', actionType: 'CREATE_MUK', data: {...data, id_unit_kerja: id}})).then(res => {
            cb();
            getData()
            setModalTambah(false)
            setModalAlert([...modalAlert, {modalShown: false}])
        }).catch(err => {
            cb();
            setModalTambah(false)
        })
    }

    const onDelete = (id, index) => {
      console.log(id);
        dispatch(deleteData({pathAPI: 'mapping-unit-kerja', actionType: 'DELETE_MUK', id: id})).then(res => {
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

    const getData = () => {
        dispatch(getAll({ pathAPI : 'mapping-unit-kerja/' + id, actionType: 'SET_MUK' })).then((res)=>{
            setModalAlert(res.data.data.map(data => ({ shownModal : false })))
        }).catch(err => {
            console.log(err);
        })
    }

    React.useEffect(()=> {
        getData()
    },[])
  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader >
              Atur Jabatan
              <div className='card-header-actions'>
                <CButton color="primary" onClick={()=> setModalTambah(!modalTambah)} >
                    Tambah Data
                </CButton>
              </div>
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={state.jabatan.mapping_uk}
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
                                <CButton size="sm" color="danger" className="ml-1" onClick={()=> toggleModalAlert(index)}  >
                                    Delete
                                </CButton>
                                </CCardBody>
                            </CCollapse>
                            <AturJabatan.ModalAlert show={modalAlert[index] ? modalAlert[index].shownModal : false} onClick={()=> onDelete(item.id, index)} toggle={()=> toggleModalAlert(index)} disabled={state.global.is_loading} />
                            </>
                        )
                    },
                    'no' :
                    (item,index) => (
                        <td>
                            {index+1}
                        </td>
                    ),
                    'jabatan' :
                    (item,index) => (
                        <td>
                            {item.tbl_jabatan?.jabatan}
                        </td>
                    ),
                    
                        
                }
              }
            />
            </CCardBody>
          </CCard>
        </CCol>

      </CRow>
      <AturJabatan.Modal modalShown={modalTambah} toggle={()=> setModalTambah(!modalTambah)} onSubmit={onCreate} disabled={state.global.is_loading} />
      {/* <AturJabatan.Modal modalShown={modalUpdate} toggle={()=> setModalUpdate(!modalUpdate)} onSubmit={onUpdate} disabled={state.global.is_loading} isUpdate data={state.jabatan.mapping_uk.filter(d => d.id == currData)[0]} /> */}
      
    </>
  )
}

const Modal = props => {
    const dispatch = useDispatch()
    const [jabatan, setJabatan] = React.useState([])
    const [data, setData] = React.useState({
        id_jabatan : null,
        keterangan : ''
    });

    const cb = () => {
        setData({
            id_jabatan : null,
            keterangan : ''
        })
    }

    React.useEffect(()=> {
        if(props.isUpdate && props.modalShown) {
            setData({...props.data});
        }

        dispatch(getAll({ pathAPI : 'jabatan'})).then((res)=>{
            setJabatan(res.data.data);
        }).catch(err => {
            console.log(err);
        })

    },[props.modalShown])

    return (
        <CModal
        show={props.modalShown}
        onClose={props.toggle}
      >
        <CModalHeader closeButton>{props.isUpdate ? 'Update' : 'Tambah'} Jabatan</CModalHeader>
        <CModalBody>
            <CFormGroup>
                <CLabel>Jabatan</CLabel>
                <CSelect custom id="parent_id" 
                    value={data.id_jabatan}
                    onChange={e => setData({...data, id_jabatan : e.target.value})} 
                    disabled={props.disabled}
                    >
                    <option value={null}>Pilih Jabatan</option>
                    {
                        jabatan.map((d, index)=> (
                            <option value={d.id} key={index}>{d.jabatan}</option>
                        ))
                    }
                </CSelect>
            </CFormGroup>
            <CFormGroup>
                <CLabel htmlFor="nf-nama">Keterangan</CLabel>
                <CTextarea
                    rows={5}
                    required
                    value={data.keterangan}
                    onChange={e => setData({...data, keterangan : e.target.value})}
                ></CTextarea>
            </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={()=> props.onSubmit(data, cb)} disabled={props.disabled} > {props.disabled ? <CSpinner size='sm' /> : null} {props.isUpdate ? 'Update' : 'Tambah'}</CButton>{' '}
          <CButton
            color="secondary"
            onClick={props.toggle}
          >Cancel</CButton>
        </CModalFooter>
      </CModal>
    )
}

AturJabatan.ModalAlert = props => {
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

AturJabatan.Modal = Modal

export default AturJabatan
