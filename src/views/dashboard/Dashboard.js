import React, { lazy } from 'react'
import {
  CCol,
  CRow
} from '@coreui/react'


const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const DashboardCard = lazy(()=> import('../widgets/DashboardCard.js'));

const Dashboard = () => {
  return (
    <>
      <CRow className="mb-4">
        <CCol xs="12" sm="6" lg="3">
          <DashboardCard text="Jumlah Pegawai" color="warning" count={20} icon="cil-people" />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <DashboardCard text="Disposisi Masuk" color="danger" count={20} icon="cil-envelope-letter" />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <DashboardCard text="Nota Dinas Masuk" color="primary" count={20} icon="cil-envelope-closed" />
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <DashboardCard text="Agenda Kegiatan" color="success" count={20} icon="cil-notes" />
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
