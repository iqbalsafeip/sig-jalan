import React, { lazy, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const DashboardCard = lazy(() => import("../widgets/DashboardCard.js"));

const Dashboard = () => {
  const [titik, setTitik] = useState({});
  const [loaded, setLoaded] = useState(false);
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
    <>
      <CRow className="mb-4">
        <CCol xs="12" sm="12" lg="12">
          <CCard>
            <CCardHeader>Pemetaan Jalan</CCardHeader>
            <CCardBody>
              {loaded && (
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
                </MapContainer>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
