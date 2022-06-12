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
import { addPertanyaan } from "src/redux/actions";

const TambahDataCustomer = (props) => {
  const dispatch = useDispatch();
  const dataPegawai = useSelector((state) => state.dataPegawai);
  const history = useHistory();
  const { id } = useParams();
  const [data, setData] = useState({
    pertanyaan: "",
    kepentingan: 0,
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
    } else {
      dispatch(updateDataPegawai({ id: id, data: data })).then(() => {
        Swal.fire({
          title: "Berhasil!",
          text: "berhasil mengupdate data pegawai",
          icon: "success",
          confirmButtonText: "Tutup",
        }).then(() => {
          history.push("/pertanyaan");
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
        <CCardHeader>
          {props.isUpdate ? "Update" : "Tambah"} Pertanyaan
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="NIP">Pertanyaan</CLabel>
                <CInput
                  id="NIP"
                  placeholder="Masukan NIP"
                  value={data.pertanyaan}
                  required
                  onChange={(e) =>
                    setData({ ...data, pertanyaan: e.target.value })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="namalengkap">Kepentingan</CLabel>
                <CInput
                  id="namalengkap"
                  type="number"
                  value={data.kepentingan}
                  placeholder="Masukan Nama Lengkap"
                  required
                  onChange={(e) =>
                    setData({ ...data, kepentingan: e.target.value })
                  }
                />
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
