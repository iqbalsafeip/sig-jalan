import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation, { customerNav, staffNav } from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.global.sidebarShow);
  const role = useSelector((state) => state.auth.roles);
  const [nav, setNav] = useState([]);
  useEffect(() => {
    switch (role) {
      case "Warga":
        return setNav(customerNav);
      case "Pegawai":
        return setNav(customerNav);
      case "Admin":
        return setNav(staffNav);
      case "Chief":
        return setNav(customerNav);
    }
  }, [role]);
  return (
    <CSidebar
      show={show}
      colorScheme={"light"}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        /> */}
        <h3 className="d-xs-hidden">SIG-Jalan</h3>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={nav}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
