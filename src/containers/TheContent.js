import React, { Suspense, useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

// routes config
import routes, {
  customerRoutes,
  staffRoutes,
  chiefRoutes,
  technicianRoutes,
} from "../routes";
import { useSelector } from "react-redux";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  const [displayRoutes, setRoutes] = useState([]);
  const auth = useSelector((state) => state.auth.user);
  console.log(auth);
  useEffect(() => {
    switch (auth?.peran) {
      case "Warga":
        return setRoutes(customerRoutes);
      case "Pegawai":
        return setRoutes(technicianRoutes);
      case "Admin":
        return setRoutes(staffRoutes);
      case "Chief":
        return setRoutes(chiefRoutes);
    }
  }, [auth]);

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {displayRoutes.length > 0 &&
              displayRoutes.map((route, idx) => {
                return (
                  route.component && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => (
                        <CFade>
                          <route.component {...props} />
                        </CFade>
                      )}
                    />
                  )
                );
              })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
