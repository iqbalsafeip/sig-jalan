import CIcon from "@coreui/icons-react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CHeader,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CSpinner,
  CTextarea,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  createKomen,
  createTitik,
  createUser,
  deleteJalan,
  getJalanById,
  getKomentar,
  updateData,
  upload,
} from "src/redux/actions";
import { createData, getAll } from "src/redux/globalActions";
import { getPegawaiById, getUserByPegawai } from "src/redux/dataPegawaiActions";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import RoutingMachine from "../widgets/RoutingMachine";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const Details = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [isLoadingKomen, setLoadKomen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [komentar, setKomentar] = useState([]);
  const [modalTitik, setModalTitik] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoadingTitik, setLoadingTitik] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [titikz, setTitikz] = useState([]);
  const handleUpload = () => {
    console.log(file);
    const fd = new FormData();
    fd.append("files", file[0]);
    fd.append("ref", "api::jalan.jalan");
    fd.append("refId", id);
    fd.append("field", "gambar_jalan");
    dispatch(upload(fd))
      .then((res) => {
        initData();
        setFile(null);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isLoaded, setLoaded] = useState(false);
  const [titik, setTitik] = useState({
    longitude: 0,
    latitude: 0,
  });
  const getUser = () => {};

  const getJabatan = (jabatan) => {};
  function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    setTitik({
      longitude,
      latitude,
    });
    console.log(latitude, longitude);
    setLoaded(true);
  }

  const handleTitik = (latitude, longitude, cb) => {
    setLoadingTitik(true);
    dispatch(
      createTitik({
        data: { jalan: id, titik_awal: latitude, titik_akhir: longitude },
      })
    )
      .then((res) => {
        console.log(res);
        setLoadingTitik(false);
        setModalTitik(false);
        initData();
        cb();
        Swal.fire({
          title: "Berhasil",
          text: "berhasil menginput titik",
          icon: "success",
          confirmButtonText: "Tutup",
        });
      })
      .catch((err) => {
        setLoadingTitik(false);
        console.log(err);
      });
  };

  const handleComment = (komen, cb) => {
    setLoadKomen(true);
    dispatch(createKomen({ data: { konten: komen, user: user.id, jalan: id } }))
      .then((res) => {
        console.log(res);
        setLoadKomen(false);
        setModal(false);
        cb();
        initKomentar();
        Swal.fire({
          title: "Berhasil",
          text: "berhasil mengirim komentar",
          icon: "success",
          confirmButtonText: "Tutup",
        });
      })
      .catch((err) => {
        setLoadKomen(false);
        console.log(err);
      });
  };

  const initKomentar = () => {
    dispatch(getKomentar(id))
      .then((res) => {
        setKomentar(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    initKomentar();
    initData();
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  const initData = () => {
    setLoading(true);
    dispatch(getJalanById(id))
      .then((res) => {
        setTitikz(res.data.data.attributes?.titiks?.data);
        setLoading(false);
        setData((state) => ({
          ...res.data.data.attributes,
          id: res.data.data.id,
        }));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Apakah Anda Yakin ?",
      text: "Jika dihapus maka data tidak dapat dikembalikan",
      icon: "warning",
      confirmButtonText: "Yakin!",
      cancelButtonText: "Tutup",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(deleteJalan(id)).then(() => {
          Swal.fire({
            title: "Berhasil",
            text: "berhasil menghapus data",
            icon: "success",
            confirmButtonText: "Tutup",
          }).then(() => {
            history.push("/jalan");
          });
        });
      }
    });
  };

  return (
    <CRow>
      <ModalTitik
        modalShown={modalTitik}
        toggle={() => setModalTitik(!modalTitik)}
        handleSubmit={handleTitik}
        disabled={isLoadingTitik}
      />
      <Modal
        modalShown={modal}
        toggle={() => setModal(!modal)}
        handleComment={handleComment}
        disabled={isLoadingKomen}
      />
      <CCol xs="12" md="6" lg="4">
        <CCard>
          <CCardHeader>Details Jalan</CCardHeader>
          <CCardBody>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Nama Jalan</td>
                  <td>{data.nama_jalan}</td>
                </tr>

                <tr>
                  <td>Panjang</td>
                  <td>{data.panjang}</td>
                </tr>
                <tr>
                  <td>Lebar</td>
                  <td>{data.lebar}</td>
                </tr>
                <tr>
                  <td colSpan={2}>Tipe Permukaan</td>
                </tr>
                <tr>
                  <td>ASPAL(AC, HRS, ATB)</td>
                  <td>{data.aspal} KM</td>
                </tr>
                <tr>
                  <td>PERKAKAS BETON</td>
                  <td>{data.perkakas_beton} KM</td>
                </tr>
                <tr>
                  <td>LAPIS PENETRASI/LATASIR/MACADA</td>
                  <td>{data.lapis_penetrasi}</td>
                </tr>
                <tr>
                  <td>TELFORD /KERIKIL /URPIL</td>
                  <td>{data.telford}</td>
                </tr>
                <tr>
                  <td>TANAH /BELUM TEMBUS</td>
                  <td>{data.tanah}</td>
                </tr>
                <tr>
                  <td colSpan={2}>Kondisi Jalan</td>
                </tr>
                <tr>
                  <td>Baik</td>
                  <td>{data.baik}</td>
                </tr>
                <tr>
                  <td>Sedang</td>
                  <td>{data.sedang}</td>
                </tr>
                <tr>
                  <td>Rusak Ringan</td>
                  <td>{data.rusak}</td>
                </tr>
                <tr>
                  <td>Rusak Berat</td>
                  <td>{data.rusak_berat}</td>
                </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6" lg="8">
        <CCard>
          <CCardHeader>
            {["Admin", "Pegawai"].includes(user.peran) ? (
              <div className="card-header-actions">
                <Link
                  className="btn btn-primary btn-sm"
                  to={`jalan/update/${id}`}
                >
                  Update
                </Link>
                <CButton
                  size="sm"
                  color="danger"
                  className="ml-1"
                  onClick={handleDelete}
                >
                  Delete
                </CButton>
              </div>
            ) : null}
          </CCardHeader>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>Map Jalan</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>Komentar Warga</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>Gambar Jalan</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  {["Admin", "Pegawai"].includes(user.peran) ? (
                    <button
                      className="btn btn-success btn-sm m-2"
                      onClick={() => setModalTitik(!modalTitik)}
                    >
                      Tambah Titik
                    </button>
                  ) : null}
                  {!isLoading && (
                    <MapContainer
                      center={[titik.latitude, titik.longitude]}
                      zoom={13}
                      scrollWheelZoom={false}
                      style={{ maxHeight: 600 }}
                      dragging={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />

                      <RoutingMachine waypoints={titikz} />
                    </MapContainer>
                  )}
                </CTabPane>
                <CTabPane>
                  <div
                    style={{
                      height: "60vh",
                      minWidth: "100%",
                      overflow: "scroll",
                    }}
                    className="p-2"
                  >
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => setModal(!modal)}
                      style={{ position: "absolute", bottom: 2, right: 2 }}
                    >
                      Tambah Komentar
                    </button>
                    {komentar.map((e, i) => (
                      <div class="card mb-2">
                        <div class="card-body">
                          <p>{e.attributes.konten}</p>

                          <div class="d-flex justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                              <p class="small mb-0 ms-2">
                                {e.attributes.user.data.attributes.nama}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CTabPane>
                <CTabPane>
                  {["Admin", "Pegawai"].includes(user.peran) ? (
                    <div className="card card-body p-2 mt-2">
                      <label htmlFor="">Tambah Data Gambar</label>
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files)}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={handleUpload}
                      >
                        upload
                      </button>
                    </div>
                  ) : null}

                  {data?.gambar_jalan?.data?.map((e, i) => (
                    <img
                      src={"http://localhost:1337" + e.attributes.url}
                      class="d-block w-100"
                      alt="..."
                    />
                  ))}
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const Modal = (props) => {
  const [komentar, setKomentar] = React.useState("");
  const cb = () => {
    setKomentar("");
  };

  return (
    <CModal show={props.modalShown} onClose={props.toggle}>
      <CModalHeader closeButton>Tambah Komentar</CModalHeader>
      <CModalBody>
        <p>*Gunakan komentar dengan bijak</p>
        <CFormGroup>
          <CLabel htmlFor="nf-nama">Komentar</CLabel>
          <CTextarea
            rows={5}
            required
            onChange={(e) => setKomentar(e.target.value)}
            value={komentar}
          ></CTextarea>
        </CFormGroup>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          disabled={props.disabled}
          onClick={() => props.handleComment(komentar, cb)}
        >
          {" "}
          {props.disabled ? <CSpinner size="sm" /> : null} Kirim
        </CButton>{" "}
        <CButton color="secondary" onClick={props.toggle}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

const ModalTitik = (props) => {
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");

  const cb = () => {
    setLongitude("");
    setLatitude("");
  };

  return (
    <CModal show={props.modalShown} onClose={props.toggle}>
      <CModalHeader closeButton>Tambah Titik</CModalHeader>
      <CModalBody>
        <CFormGroup>
          <CLabel htmlFor="nf-nama">Latitude</CLabel>
          <CInput
            rows={5}
            required
            onChange={(e) => setLatitude(e.target.value)}
            value={latitude}
          ></CInput>
        </CFormGroup>
        <CFormGroup>
          <CLabel htmlFor="nf-nama">Longitude</CLabel>
          <CInput
            rows={5}
            required
            onChange={(e) => setLongitude(e.target.value)}
            value={longitude}
          ></CInput>
        </CFormGroup>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          disabled={props.disabled}
          onClick={() => props.handleSubmit(latitude, longitude, cb)}
        >
          {" "}
          {props.disabled ? <CSpinner size="sm" /> : null} Tambah
        </CButton>{" "}
        <CButton color="secondary" onClick={props.toggle}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

Details.Avatar = (props) => (
  <div
    style={{
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundImage: `url("http://localhost:8080/public/photo_file/${props.photo_file}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  ></div>
);

Details.Item = (props) => (
  <CRow>
    <CIcon name={props.iconName} size={"lg"} />
    <p className="ml-2">{props.data}</p>
  </CRow>
);

export default Details;
