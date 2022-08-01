import React, { useEffect, useState } from "react";

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
} from "@coreui/react";
import {
  createDataPegawai,
  getPegawaiById,
  updateDataPegawai,
} from "src/redux/dataPegawaiActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { createUser } from "src/redux/actions";

const TambahDataCustomer = (props) => {
  const dispatch = useDispatch();
  const dataPegawai = useSelector((state) => state.dataPegawai);
  const history = useHistory();
  const { id } = useParams();
  const [data, setData] = useState({
    nama: "",
    jenis_kelamin: "",
    email: "",
    alamat: "",
  });

  const submit = () => {
    console.log(Object.keys(data).map((key) => data[key] === ""));
    if (
      Object.keys(data)
        .map((key) => data[key] === "")
        .includes(true)
    ) {
      return Swal.fire({
        title: "Missing Field",
        text: "Masukan input dengan benar",
        icon: "warning",
        confirmButtonText: "Tutup",
      });
    }
    if (!props.isUpdate) {
      dispatch(createUser({ ...data, peran: "Warga" }))
        .then(() => {
          Swal.fire({
            title: "Berhasil!",
            text: "berhasil menambahkan data warga",
            icon: "success",
            confirmButtonText: "Tutup",
          }).then(() => {
            history.push("/warga");
          });
        })
        .catch((err) => {
          const error = err.response.data;
          let msg = error.error.name;
          console.log(err.response);
          if (error.error.status === 400) {
            if (msg === "ApplicationError")
              msg = "Username dan Password tidak sesuai";
            return Swal.fire({
              title: msg,
              text: error.error.message,
              icon: "warning",
              confirmButtonText: "Tutup",
            });
          }
        });
    } else {
      dispatch(updateDataPegawai({ id: id, data: data })).then(() => {
        Swal.fire({
          title: "Berhasil!",
          text: "berhasil mengupdate data warga",
          icon: "success",
          confirmButtonText: "Tutup",
        }).then(() => {
          history.push("/customers");
        });
      });
    }
  };

  useEffect(() => {
    if (props.isUpdate) {
      dispatch(getPegawaiById(id)).then((result) => {
        setData(result.data.data);
      });
    }
  }, []);

  return (
    <CCol xs="12" sm="12">
      <CCard>
        <CCardHeader>{props.isUpdate ? "Update" : "Tambah"} Warga</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="NIP">Username</CLabel>
                <CInput
                  id="NIP"
                  placeholder="Masukan NIP"
                  value={data.username}
                  required
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="namalengkap">password</CLabel>
                <CInput
                  id="namalengkap"
                  type="password"
                  value={data.password}
                  placeholder="Masukan Nama Lengkap"
                  required
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="namalengkap">Nama</CLabel>
                <CInput
                  id="namalengkap"
                  value={data.nama}
                  placeholder="Masukan Nama Lengkap"
                  required
                  onChange={(e) => setData({ ...data, nama: e.target.value })}
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="jenis_kelamin">Jenis Kelamin</CLabel>
                <CSelect
                  custom
                  name="jenis_kelamin"
                  id="jenis_kelamin"
                  value={data.jenis_kelamin}
                  onChange={(e) =>
                    setData({ ...data, jenis_kelamin: e.target.value })
                  }
                >
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
                <CLabel htmlFor="Email">Email</CLabel>
                <CInput
                  id="Email"
                  type="email"
                  placeholder="Masukan Email"
                  value={data.email}
                  required
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
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
                  onChange={(e) => setData({ ...data, alamat: e.target.value })}
                ></CTextarea>
              </CFormGroup>
            </CCol>
          </CRow>

          <CButton
            color="primary"
            onClick={submit}
            disabled={dataPegawai.is_loading}
          >
            {props.isUpdate ? "Update" : "Tambah"}
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default TambahDataCustomer;
