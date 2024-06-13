import React from "react";
import FormComponent from "../../component/FormComponent/Form";

const AddUserDrawer = ({ isOpen, handleClose, updateTableData }) => {
  const drawerStyle = {
    width: "350px",
    transform: isOpen ? "translateX(0)" : "translateX(100%)",
    transition: "transform 0.3s ease-in-out",
    position: "fixed",
    top: "0",
    right: "0",
    height: "100%",
    backgroundColor: "#fff",
    boxShadow: "-2px 0px 5px 0px rgba(0,0,0,0.5)",
    zIndex: "1000",
  };

  return (
    <div style={drawerStyle}>
      <div className="d-flex  gap-3 align-items-center p-3">
        <button className="btn-close" onClick={handleClose}></button>
        <h5 className="mb-1">Add New User</h5>
      </div>
      <div className="px-3" style={{ overflowY: "auto", maxHeight: "80vh" }}>
        <FormComponent
          handleClose={handleClose}
          updateTableData={updateTableData}
        />
      </div>
    </div>
  );
};

export default AddUserDrawer;
