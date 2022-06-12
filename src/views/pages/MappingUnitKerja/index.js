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
import { Link } from 'react-router-dom'

const fields = ['no','unit_kerja','keterangan','jumlah_jabatan' ,'show_details']

const MappingUnitKerja = () => {
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

    const onCreate = (data, cb) => {
        dispatch(createData({pathAPI: 'mapping-unit-kerja', actionType: 'CREATE_MUK', data: data})).then(res => {
            cb();
            setModalTambah(false)
            setModalAlert([...modalAlert, {modalShown: false}])
        }).catch(err => {
            cb();
            setModalTambah(false)
        })
    }

    const onUpdate = (data, cb) => {
        dispatch(updateData({pathAPI: 'mapping-unit-kerja', actionType: 'UPDATE_MUK', id: currData , data: data})).then(res => {
            cb();
            setModalUpdate(false)
        }).catch(err => {
            cb();
            setModalUpdate(false)
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

    React.useEffect(()=> {
        dispatch(getAll({ pathAPI : 'unit_kerja', actionType: 'SET_MUK' })).then((res)=>{
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
              Mapping Unit Kerja
              <div className='card-header-actions'>
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
                                <Link className="btn btn-sm btn-primary" to={"/mapping-unit-kerja/" + item.id} >
                                    Atur Jabatan
                                </Link>
                                </CCardBody>
                            </CCollapse>
                            <MappingUnitKerja.ModalAlert show={modalAlert[index] ? modalAlert[index].shownModal : false} onClick={()=> onDelete(item.id, index)} toggle={()=> toggleModalAlert(index)} disabled={state.global.is_loading} />
                            </>
                        )
                    },
                    'no' :
                    (item,index) => (
                        <td>
                            {index+1}
                        </td>
                    ),
                    'unit_kerja' : 
                    (item) => (
                        <td>
                            {item.nama}
                        </td>
                    ),
                    'jumlah_jabatan' : 
                    (item) => (
                        <td>
                            {item.jabatan?.length}
                        </td>
                    )
                        
                }
              }
            />
            </CCardBody>
          </CCard>
        </CCol>

      </CRow>
      <MappingUnitKerja.Modal modalShown={modalTambah} toggle={()=> setModalTambah(!modalTambah)} onSubmit={onCreate} disabled={state.global.is_loading} />
      <MappingUnitKerja.Modal modalShown={modalUpdate} toggle={()=> setModalUpdate(!modalUpdate)} onSubmit={onUpdate} disabled={state.global.is_loading} isUpdate data={state.jabatan.mapping_uk.filter(d => d.id == currData)[0]} />
      
    </>
  )
}

const Modal = props => {
    const dispatch = useDispatch()
    const [jabatan, setJabatan] = React.useState([])
    const [data, setData] = React.useState({
        jabatan : '',
        parent_id: null,
        fungsi: 0,
        keterangan : '',
        is_active: 0
    });

    const cb = () => {
        setData({
            jabatan : '',
            parent_id: null,
            fungsi: 0,
            keterangan : '',
            is_active: 0
        })
    }

    React.useEffect(()=> {
        if(props.isUpdate && props.modalShown) {
            setData({...props.data});
        }

        dispatch(getAll({ pathAPI : 'jabatan?parent=1'})).then((res)=>{
            console.log(res.data.data);
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
                <CLabel htmlFor="nf-nama">Jabatan</CLabel>
                <CInput
                    type="text"
                    value={data.jabatan}
                    onChange={e => setData({...data, jabatan : e.target.value})}
                    id="nf-nama"
                    name="nf-nama"
                    placeholder="Masukan Nama Jabatan..."
                    required
                />
            </CFormGroup>
            <CFormGroup>
                <CLabel>Parent</CLabel>
                <CSelect custom id="parent_id" 
                    value={data.parent_id}
                    onChange={e => setData({...data, parent_id : e.target.value})} 
                    disabled={props.disabled}
                    >
                    <option value={null}>Pilih Parent</option>
                    {
                        jabatan.map((d, index)=> (
                            <option value={d.id} key={index}>{d.jabatan}</option>
                        ))
                    }
                </CSelect>
            </CFormGroup>
            <CFormGroup>
                <CLabel>Fungsi</CLabel>
                <CSelect custom id="fungsi" 
                    value={data.fungsi}
                    onChange={e => setData({...data, fungsi : e.target.value})}
                    >
                    <option value={0}  >Fungsional</option>
                    <option value={1}  >Struktural</option>
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
            <CFormGroup>
                <CLabel>Is Active ?</CLabel>
                <CSelect custom id="is_active" 
                    value={data.is_active}
                    onChange={e => setData({...data, is_active : e.target.value})} >
                    <option value={0}  >Tidak Aktif</option>
                    <option value={1}  >Aktif</option>
                </CSelect>
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

MappingUnitKerja.ModalAlert = props => {
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

MappingUnitKerja.Modal = Modal

export default MappingUnitKerja
