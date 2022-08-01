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
import { createJalan, createUser, getKecamatan } from "src/redux/actions";

const TambahDataJalan = (props) => {
  const dispatch = useDispatch();
  const dataPegawai = useSelector((state) => state.dataPegawai);
  const history = useHistory();
  const [keacamatan, setKecamatan] = useState([]);
  const { id } = useParams();
  const [data, setData] = useState({
    nama_jalan: "",
    panjang: "",
    lebar: "",
    aspal: "",
    perkakas_beton: "",
    lapis_penetrasi: "",
    telford: "",
    tanah: "",
    baik: "",
    sedang: "",
    rusak_ringan: "",
    rusak_berat: "",
    kecamatan_dilalui: "",
    kode_ruas: "",
    longitude: "",
    latitude: "",
    kecamatan: "",
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
      dispatch(createJalan({ data: data }))
        .then(() => {
          Swal.fire({
            title: "Berhasil!",
            text: "berhasil menambahkan data Jalan",
            icon: "success",
            confirmButtonText: "Tutup",
          }).then(() => {
            history.push("/jalan");
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
          text: "berhasil mengupdate data pegawai",
          icon: "success",
          confirmButtonText: "Tutup",
        }).then(() => {
          history.push("/chiefs");
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

    dispatch(getKecamatan())
      .then((res) => {
        console.log(res);
        setKecamatan(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CCol xs="12" sm="12">
      <CCard>
        <CCardHeader>
          {props.isUpdate ? "Update" : "Tambah"} Data Jalan
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="namalengkap">Kode Ruas</CLabel>
                <CInput
                  id="namalengkap"
                  value={data.kode_ruas}
                  placeholder="Masukan Kode Ruas"
                  required
                  onChange={(e) =>
                    setData({ ...data, kode_ruas: e.target.value })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="NIP">Nama Jalan</CLabel>
                <CInput
                  id="NIP"
                  placeholder="Masukan Nama Jalan"
                  value={data.nama_jalan}
                  required
                  onChange={(e) =>
                    setData({ ...data, nama_jalan: e.target.value })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="jenis_kelamin">Kecamatan</CLabel>
                <CSelect
                  custom
                  name="jenis_kelamin"
                  id="jenis_kelamin"
                  value={data.kecamatan}
                  onChange={(e) =>
                    setData({ ...data, kecamatan: e.target.value })
                  }
                >
                  <option value="">--Pilih Kecamatan--</option>
                  {keacamatan.map((e, i) => (
                    <option value={e.id} key={i}>
                      {e.attributes.nama_kecamatan}
                    </option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="namalengkap">Kecamatan Dilalui</CLabel>
                <CInput
                  id="namalengkap"
                  value={data.kecamatan_dilalui}
                  placeholder="Masukan Kecamatan Dilalui"
                  required
                  onChange={(e) =>
                    setData({ ...data, kecamatan_dilalui: e.target.value })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="namalengkap">Panjang</CLabel>
                <CInput
                  id="namalengkap"
                  value={data.panjang}
                  placeholder="Masukan Panjang"
                  required
                  onChange={(e) =>
                    setData({ ...data, panjang: e.target.value })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="namalengkap">Lebar</CLabel>
                <CInput
                  id="namalengkap"
                  value={data.lebar}
                  placeholder="Masukan Lebar"
                  required
                  onChange={(e) => setData({ ...data, lebar: e.target.value })}
                />
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="namalengkap">Panjang Aspal</CLabel>
                <CInput
                  id="namalengkap"
                  value={data.aspal}
                  placeholder="Masukan Panjang Aspal"
                  required
                  onChange={(e) => setData({ ...data, aspal: e.target.value })}
                />
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="NoTelp">Panjang Perkakas Beton</CLabel>
                <CInput
                  id="NoTelp"
                  placeholder="Masukan Panjang Perkakas"
                  value={data.perkakas_beton}
                  required
                  onChange={(e) =>
                    setData({ ...data, perkakas_beton: e.target.value })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="NoTelp">Panjang Lapis Penetrasi</CLabel>
                <CInput
                  id="NoTelp"
                  placeholder="Masukan Panjang Lapis Penetrasi"
                  value={data.lapis_penetrasi}
                  required
                  onChange={(e) =>
                    setData({ ...data, lapis_penetrasi: e.target.value })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="Email">Panjang Telford/Kerikil</CLabel>
                <CInput
                  id="Email"
                  placeholder="Masukan Panjang Telford/Kerikil"
                  value={data.telford}
                  required
                  onChange={(e) =>
                    setData({ ...data, telford: e.target.value })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="Email">Panjang Tanah</CLabel>
                <CInput
                  id="Email"
                  placeholder="Masukan Panjang Tanah"
                  value={data.tanah}
                  required
                  onChange={(e) => setData({ ...data, tanah: e.target.value })}
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="Email">Panjang Kondisi Baik</CLabel>
                <CInput
                  id="Email"
                  placeholder="Masukan Panjang Kondisi Baik"
                  value={data.baik}
                  required
                  onChange={(e) => setData({ ...data, baik: e.target.value })}
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="Email">Panjang Kondisi Sedang</CLabel>
                <CInput
                  id="Email"
                  placeholder="Masukan Panjang Kondisi Sedang"
                  value={data.sedang}
                  required
                  onChange={(e) => setData({ ...data, sedang: e.target.value })}
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="Email">Panjang Kondisi Rusak Ringan</CLabel>
                <CInput
                  id="Email"
                  placeholder="Masukan Panjang Kondisi Rusak Ringan"
                  value={data.rusak_ringan}
                  required
                  onChange={(e) =>
                    setData({ ...data, rusak_ringan: e.target.value })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="Email">Panjang Kondisi Rusak Berat</CLabel>
                <CInput
                  id="Email"
                  placeholder="Masukan Panjang Kondisi Rusak Berat"
                  value={data.rusak_berat}
                  required
                  onChange={(e) =>
                    setData({ ...data, rusak_berat: e.target.value })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="Email">Longitude</CLabel>
                <CInput
                  id="Email"
                  placeholder="Masukan Longitude"
                  value={data.longitude}
                  required
                  onChange={(e) =>
                    setData({ ...data, longitude: e.target.value })
                  }
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="Email">Latitude</CLabel>
                <CInput
                  id="Email"
                  placeholder="Masukan Latitude"
                  value={data.latitude}
                  required
                  onChange={(e) =>
                    setData({ ...data, latitude: e.target.value })
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

export default TambahDataJalan;
