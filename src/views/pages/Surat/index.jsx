import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getAll, getDataById } from 'src/redux/globalActions';
import PDFViewer from 'pdf-viewer-reactjs'
import { Link } from 'react-router-dom';


const Surat = props => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [penerima, setPenerima] = React.useState([])

    const [data, setData] = React.useState({})

    React.useEffect( ()=> {
        dispatch(getDataById({pathAPI : 'surat', id: id})).then((result)=> {
            setData(result.data.data)
        })
        
         dispatch(getAll({pathAPI : 'surat/penerima?suratId=' + id})).then((res)=>{
            setPenerima(res.data.data);
        })

    }, [])

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        File Surat
                    </CCardHeader>
                    <CCardBody>
                        <a className="btn btn-success" target="_blank" href={`http://localhost:8080/public/file_surat/${data.file_surat}`} >Lihat Surat</a>
                    </CCardBody>
                </CCard>
                <CCard>
                    <CCardHeader>
                        Data Surat
                    </CCardHeader>
                    <CCardBody>
                        <table className="table table-stripped">
                            <tbody>
                                <tr>
                                    <td>Kategori Surat</td>
                                    <td>{data.tbl_kategori_surat?.kategori}</td>
                                </tr>
                                <tr>
                                    <td>Klasifikasi Surat</td>
                                    <td>{data.tbl_klasifikasi_surat?.klasifikasi}</td>
                                </tr>
                                <tr>
                                    <td>Status Surat</td>
                                    <td>{data.tbl_status_surat?.status}</td>
                                </tr>
                                <tr>
                                    <td>Sifat Surat</td>
                                    <td>{data.tbl_sifat_surat?.sifat}</td>
                                </tr>
                            </tbody>
                        </table>
                    </CCardBody>
                </CCard>
                <CCard>
                    <CCardHeader>
                        Penerima
                    </CCardHeader>
                    <CCardBody>
                        <table className="table table-stripped">
                            <thead>
                                <tr>
                                    <th>Unit Kerja</th>
                                    <th>Jabatan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    penerima.map((_d)=>(
                                        <tr>
                                            <td>{_d.tbl_unit_kerja.nama}</td>
                                            <td>{_d.tbl_jabatan.jabatan}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </CCardBody>
                </CCard>
            </CCol>
            
        </CRow>
    )
}

export default Surat