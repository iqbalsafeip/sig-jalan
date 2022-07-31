import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { useDispatch } from "react-redux";
import { login } from "src/redux/actions";

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setloading] = useState(false);

  useEffect(() => {
    document.title = "Login";
  }, []);

  const submit = (e) => {
    setloading(true);
    e.preventDefault();
    dispatch(login({ identifier: username, password: password })).catch(() => {
      alert("Username/ Password yang dimasukan salah");
      setloading(false);
    });
    setloading(false);
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center bg-primary">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <form onSubmit={submit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        value={username}
                        autoComplete="username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <button
                          className="btn btn-primary px-4"
                          disabled={isloading}
                        >
                          Login
                        </button>
                      </CCol>
                    </CRow>
                  </form>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-secondary text-back py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center text-dark">
                  <div>
                    <h2>Sistem Informasi Pengelolaan Jalan</h2>
                    <h1>PUPR Garut</h1>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
