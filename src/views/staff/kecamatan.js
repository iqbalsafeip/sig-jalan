import React, { useState } from "react";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CCollapse,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CFormGroup,
  CLabel,
  CInput,
  CTextarea,
  CSelect,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { useDispatch, useSelector } from "react-redux";
import {
  createData,
  getAll,
  deleteData,
  updateData,
} from "src/redux/dataMasterActions";
import { addKecamatan, getKecamatan } from "src/redux/actions";

const fields = ["no", "nama_kecamatan", "show_details"];

const Kecamatan = () => {
  const dispatch = useDispatch();
  const dataMaster = useSelector((state) => state.dataMaster);
  const [details, setDetails] = React.useState([]);
  const [modalTambah, setModalTambah] = React.useState(false);
  const [modalUpdate, setModalUpdate] = React.useState(false);
  const [modalAlert, setModalAlert] = React.useState([]);
  const [currData, setCurrData] = React.useState(0);
  const [data, setData] = useState([]);
  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const onCreate = (kecamatan, cb) => {
    dispatch(
      addKecamatan({
        data: {
          nama_kecamatan: kecamatan,
        },
      })
    )
      .then((res) => {
        cb();
        getKecamatans();
        setModalTambah(false);
        setModalAlert([...modalAlert, { modalShown: false }]);
      })
      .catch((err) => {
        cb();
        setModalTambah(false);
      });
  };

  const onUpdate = (kategori, keterangan, is_active, cb) => {
    dispatch(
      updateData({
        pathAPI: "kategori_surat",
        actionType: "UPDATE_KATEGORI_SURAT",
        id: currData,
        data: {
          kategori: kategori,
          keterangan: keterangan,
          is_active: is_active,
        },
      })
    )
      .then((res) => {
        cb();
        setModalUpdate(false);
      })
      .catch((err) => {
        cb();
        setModalUpdate(false);
      });
  };

  const onDelete = (id, index) => {
    dispatch(
      deleteData({
        pathAPI: "kategori_surat",
        actionType: "DELETE_KATEGORI_SURAT",
        data: {
          id: id,
        },
      })
    )
      .then((res) => {
        toggleDetails(index);
        const temp = modalAlert.map((d, idx) =>
          idx === index ? { shownModal: !modalAlert[index].shownModal } : d
        );
        setModalAlert(temp);
      })
      .catch((err) => {
        console.log(err);
        toggleDetails(index);
        const temp = modalAlert.map((d, idx) =>
          idx === index ? { shownModal: !modalAlert[index].shownModal } : d
        );
        setModalAlert(temp);
      });
  };

  const toggleModalAlert = (index) => {
    const temp = modalAlert.map((d, idx) =>
      idx === index ? { shownModal: !modalAlert[index].shownModal } : d
    );
    setModalAlert(temp);
  };

  const updateToggle = (index) => {
    setCurrData(index);
    setModalUpdate(!modalUpdate);
  };

  React.useEffect(() => {
    getKecamatans();
  }, []);
  const getKecamatans = (_) => {
    dispatch(getKecamatan())
      .then((res) => {
        let temp = res.data.data.map((e) => e.attributes);
        console.log(temp);
        setData((data) => temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              Kecamatan
              <div className="card-header-actions">
                <CButton
                  color="primary"
                  onClick={() => setModalTambah(!modalTambah)}
                >
                  Tambah Data
                </CButton>
              </div>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={data}
                fields={fields}
                itemsPerPage={5}
                pagination
                tableFilter
                itemsPerPageSelect
                hover
                sorter
                scopedSlots={{
                  actions: (item) => (
                    <td>
                      <CButton width={6}>
                        <CIcon name="cil-trash" />
                      </CButton>
                    </td>
                  ),
                  show_details: (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            toggleDetails(index);
                          }}
                        >
                          {details.includes(index) ? "Hide" : "Show"}
                        </CButton>
                      </td>
                    );
                  },
                  details: (item, index) => {
                    return (
                      <>
                        <CCollapse show={details.includes(index)}>
                          <CCardBody>
                            <p className="text-muted">
                              Tanggal Buat: {item.createdAt}
                            </p>
                            <p className="text-muted">
                              Tanggal Update: {item.updatedAt}
                            </p>
                            <CButton
                              size="sm"
                              color="info"
                              onClick={() => updateToggle(item.id)}
                            >
                              Update
                            </CButton>
                            <CButton
                              size="sm"
                              color="danger"
                              className="ml-1"
                              onClick={() => toggleModalAlert(index)}
                            >
                              Delete
                            </CButton>
                          </CCardBody>
                        </CCollapse>
                        <Kecamatan.ModalAlert
                          show={
                            modalAlert[index]
                              ? modalAlert[index].shownModal
                              : false
                          }
                          onClick={() => onDelete(item.id, index)}
                          toggle={() => toggleModalAlert(index)}
                          disabled={dataMaster.is_loading}
                        />
                      </>
                    );
                  },

                  no: (item, index) => <td>{index + 1}</td>,
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <Kecamatan.Modal
        modalShown={modalTambah}
        toggle={() => setModalTambah(!modalTambah)}
        onSubmit={onCreate}
        disabled={dataMaster.is_loading}
      />
      <Kecamatan.Modal
        modalShown={modalUpdate}
        toggle={() => setModalUpdate(!modalUpdate)}
        onSubmit={onUpdate}
        disabled={dataMaster.is_loading}
        isUpdate
        data={dataMaster.kategori_surat.filter((d) => d.id == currData)[0]}
      />
    </>
  );
};

const Modal = (props) => {
  const [kecamatan, setKecamatan] = React.useState("");

  const cb = () => {
    setKecamatan("");
  };

  React.useEffect(() => {
    if (props.isUpdate && props.modalShown) {
      const { kecamatan } = props.data;
      setKecamatan(kecamatan);
    }
  }, [props.modalShown]);

  return (
    <CModal show={props.modalShown} onClose={props.toggle}>
      <CModalHeader closeButton>
        {props.isUpdate ? "Update" : "Tambah"} Data
      </CModalHeader>
      <CModalBody>
        <CFormGroup>
          <CLabel htmlFor="nf-nama">Nama kecamatan</CLabel>
          <CInput
            type="text"
            value={kecamatan}
            onChange={(e) => setKecamatan(e.target.value)}
            id="nf-nama"
            name="nf-nama"
            placeholder="Masukan Nama kecamatan..."
            required
          />
        </CFormGroup>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          onClick={() => props.onSubmit(kecamatan, cb)}
          disabled={props.disabled}
        >
          {" "}
          {props.disabled ? <CSpinner size="sm" /> : null}{" "}
          {props.isUpdate ? "Update" : "Tambah"}
        </CButton>{" "}
        <CButton color="secondary" onClick={props.toggle}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

Kecamatan.ModalAlert = (props) => {
  return (
    <CModal show={props.show} onClose={props.toggle}>
      <CModalHeader closeButton>Yakin Hapus Data?</CModalHeader>
      <CModalBody>Jika Dihaspus maka data tidak dapat dikembalikan</CModalBody>
      <CModalFooter>
        <CButton
          color="danger"
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {" "}
          {props.disabled ? <CSpinner size="sm" /> : null} Yakin
        </CButton>{" "}
        <CButton color="secondary" onClick={props.toggle}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

Kecamatan.Modal = Modal;

export default Kecamatan;
