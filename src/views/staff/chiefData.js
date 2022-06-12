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
import { deleteUser, getCustomers, getUser } from "src/redux/actions";

const fields = [
  "no",
  "username",
  "email",
  "nama",
  "jenis_kelamin",
  "alamat",
  "show_details",
];

const CustomerData = (props) => {
  const dispatch = useDispatch();

  const [details, setDetails] = React.useState([]);

  const dataPegawai = useSelector((state) => state.dataPegawai);
  const [data, setData] = React.useState([]);
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
        dispatch(deleteUser(id)).then(() => {
          Swal.fire({
            title: "Berhasil",
            text: "berhasil menghapus data",
            icon: "success",
            confirmButtonText: "Tutup",
          });
          dispatch(getUser("Chief"))
            .then((res) => {
              console.log(res);
              setData((data) => res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    });
  };

  React.useEffect(() => {
    dispatch(getUser("Chief"))
      .then((res) => {
        console.log(res);
        setData((data) => res.data);
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
              Data Chief
              <div className="card-header-actions">
                <Link className="btn btn-primary" to="chiefs/add">
                  Tambah Data
                </Link>
              </div>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={data}
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

export default CustomerData;
