import React, { lazy } from "react";
import { CCol, CRow } from "@coreui/react";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const DashboardCard = lazy(() => import("../widgets/DashboardCard.js"));

const Dashboard = () => {
  return (
    <>
      <CRow className="mb-4">
        <CCol xs="12" sm="6" lg="3">
          <DashboardCard
            text="Jumlah Komentar Masuk"
            color="danger"
            count={12}
            icon="cil-envelope-letter"
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <DashboardCard
            text="Jumlah Data Jalan"
            color="primary"
            count={1}
            icon="cil-notes"
          />
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
