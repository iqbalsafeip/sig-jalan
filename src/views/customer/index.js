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
            text="Pengajuan Permasalahan"
            color="warning"
            count={20}
            icon="cil-people"
          />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <DashboardCard
            text="Pelaporan diselesaikan"
            color="danger"
            count={15}
            icon="cil-envelope-letter"
          />
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
