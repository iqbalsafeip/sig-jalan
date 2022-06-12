import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CCollapse,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { useDispatch, useSelector } from "react-redux";
import { deleteDataPegawai, getAllPegawai } from "src/redux/dataPegawaiActions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const fields = [
  "no",
  "photo",
  "nip",
  "nama",
  "jenis_kelamin",
  "tempat_lahir",
  "tgl_lahir",
  "no_telp",
  "email",
  "alamat",
  "show_details",
];

const DataPegawai = (props) => {
  const dispatch = useDispatch();

  const [details, setDetails] = React.useState([]);

  const dataPegawai = useSelector((state) => state.dataPegawai);

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const deleteData = (id) => {
    Swal.fire({
      title: "Apakah Anda Yakin ?",
      text: "Jika dihapus maka data tidak dapat dikembalikan",
      icon: "warning",
      confirmButtonText: "Yakin!",
      cancelButtonText: "Tutup",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(deleteDataPegawai(id)).then(() => {
          Swal.fire({
            title: "Berhasil",
            text: "berhasil menghapus data",
            icon: "success",
            confirmButtonText: "Tutup",
          });
        });
      }
    });
  };

  React.useEffect(() => {
    dispatch(getAllPegawai())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              Kategori Surat
              <div className="card-header-actions">
                <Link className="btn btn-primary" to="data-pegawai/tambah">
                  Tambah Data
                </Link>
              </div>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={dataPegawai.pegawai}
                fields={fields}
                itemsPerPage={5}
                pagination
                tableFilter
                itemsPerPageSelect
                hover
                sorter
                scopedSlots={{
                  actions: (item) => (
                    <td>
                      <CButton width={6}>
                        <CIcon name="cil-trash" />
                      </CButton>
                    </td>
                  ),
                  show_details: (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            toggleDetails(index);
                          }}
                        >
                          {details.includes(index) ? "Hide" : "Show"}
                        </CButton>
                      </td>
                    );
                  },
                  details: (item, index) => {
                    return (
                      <>
                        <CCollapse show={details.includes(index)}>
                          <CCardBody>
                            <p className="text-muted">
                              Tanggal Buat: {item.createdAt}
                            </p>
                            <p className="text-muted">
                              Tanggal Update: {item.updatedAt}
                            </p>
                            <Link
                              className="btn btn-success "
                              to={`data-pegawai/${item.id}`}
                            >
                              Details
                            </Link>
                            <Link
                              className="btn btn-warning ml-1"
                              to={`data-pegawai/update/${item.id}`}
                            >
                              Update
                            </Link>
                            <CButton
                              size="md"
                              color="danger"
                              className="ml-1"
                              onClick={() => deleteData(item.id)}
                            >
                              Delete
                            </CButton>
                          </CCardBody>
                        </CCollapse>
                      </>
                    );
                  },
                  no: (item, index) => <td>{index + 1}</td>,
                  jenis_kelamin: (item) => (
                    <td>
                      {item.jenis_kelamin === "P" ? "Perempuan" : "Laki-Laki"}
                    </td>
                  ),
                  photo: (item) => (
                    <td>
                      <CImg
                        src={
                          "http://localhost:8080/public/photo_file/" +
                          item.photo_file
                        }
                        className="c-avatar-img"
                        alt="admin@bootstrapmaster.com"
                        style={{
                          width: 30,
                          height: 30,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      />
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default DataPegawai;
