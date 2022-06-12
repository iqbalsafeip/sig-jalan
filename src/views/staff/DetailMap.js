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
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { createUser, updateData } from "src/redux/actions";
import { createData, getAll } from "src/redux/globalActions";
import { getPegawaiById, getUserByPegawai } from "src/redux/dataPegawaiActions";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import RoutingMachine from "../widgets/RoutingMachine";

const Details = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    nip: "",
    nama: "",
    jenis_kelamin: "",
    tempat_lahir: "",
    tgl_lahir: "",
    no_telp: "",
    email: "",
    alamat: "",
    ttd_file: "",
    photo_file: "",
  });
  const [user, setUser] = useState({});
  const [jabatan, setJabatan] = useState({});
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
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  return (
    <CRow>
      <CCol xs="12" md="6" lg="4">
        <CCard>
          <CCardHeader>Details Jalan</CCardHeader>
          <CCardBody>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td>Nama Jalan</td>
                  <td>Limbangan - Selaawi (Bts.Kab.Sumedang)</td>
                </tr>

                <tr>
                  <td>Panjang</td>
                  <td>13.30</td>
                </tr>
                <tr>
                  <td>Lebar</td>
                  <td>5.50</td>
                </tr>
                <tr>
                  <td colSpan={2}>Tipe Permukaan</td>
                </tr>
                <tr>
                  <td>ASPAL(AC, HRS, ATB)</td>
                  <td>11.06 KM</td>
                </tr>
                <tr>
                  <td>PERKAKAS BETON</td>
                  <td>2.15 KM</td>
                </tr>
                <tr>
                  <td>LAPIS PENETRASI/LATASIR/MACADA</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>TELFORD /KERIKIL /URPIL</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>TANAH /BELUM TEMBUS</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td colSpan={2}>Kondisi Jalan</td>
                </tr>
                <tr>
                  <td>Baik</td>
                  <td>9.02</td>
                </tr>
                <tr>
                  <td>Sedang</td>
                  <td>4.18</td>
                </tr>
                <tr>
                  <td>Rusak Ringan</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Rusak Berat</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6" lg="8">
        <CCard>
          <CCardHeader>
            <div className="card-header-actions">
              <Link
                className="btn btn-primary btn-sm"
                to={`data-pegawai/update/${id}`}
              >
                Update
              </Link>
              <CButton size="sm" color="danger" className="ml-1">
                Delete
              </CButton>
            </div>
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
              </CNav>
              <CTabContent>
                <CTabPane>
                  {isLoaded && (
                    <MapContainer
                      center={[titik.latitude, titik.longitude]}
                      zoom={13}
                      scrollWheelZoom={false}
                      style={{ maxHeight: 600 }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[titik.latitude, titik.longitude]}>
                        <Popup>
                          A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                      </Marker>
                      <RoutingMachine
                        waypoints={[
                          {
                            titik_awal: -7.036837079153746,
                            titik_akhir: 107.92045437612948,
                          },
                          {
                            titik_awal: -7.001790287829221,
                            titik_akhir: 108.02850145920105,
                          },
                        ]}
                      />
                    </MapContainer>
                  )}
                </CTabPane>
                <CTabPane></CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
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
