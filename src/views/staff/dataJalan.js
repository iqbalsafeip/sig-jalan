import React, { useState } from "react";
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
import { getJalan } from "src/redux/actions";

const fields = [
  "no",
  "kode_ruas",
  "nama_jalan",
  "kecamatan_dilalui",
  "show_details",
];

const DataJalan = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [details, setDetails] = React.useState([]);
  const role = useSelector((state) => state.auth.roles);
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
    dispatch(getJalan())
      .then((res) => {
        let temp = res.data.data.map((e) => ({ id: e.id, ...e.attributes }));
        console.log(temp);
        setData((data) => temp);
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
              Data Jalan
              <div className="card-header-actions">
                {role !== "Warga" && (
                  <React.Fragment>
                    <Link
                      className="btn btn-success mr-2"
                      to="data-pegawai/tambah"
                    >
                      Import Data
                    </Link>
                    <Link className="btn btn-primary" to="data-pegawai/tambah">
                      Tambah Data
                    </Link>
                  </React.Fragment>
                )}
              </div>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={data}
                fields={fields}
                itemsPerPage={5}
                pagination
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
                              to={`jalan/${item.id}`}
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
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default DataJalan;
