import React, { useState, useEffect } from "react";
import UserTable from "../../component/TableComponent/Table";

import AddUserDrawer from "../AddDriver/AddDriverModal";
import { FaPlus } from "react-icons/fa6";

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    console.log("storedData", storedData);
    setTableData(storedData);
  }, []);

  const updateTableData = (data) => {
    setTableData(data);
    localStorage.setItem("formData", JSON.stringify(data));
  };
  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="container" style={{ width: "100%", margin: "10px auto" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>User List</div>

        <button
          className="btn btn-success add-driver-button"
          onClick={handleOpenDrawer}
        >
          <FaPlus
            style={{
              marginRight: "5px",
              verticalAlign: "middle",
              marginBottom: "5px",
            }}
          />
          Add New User
        </button>
      </div>
      <UserTable tableData={tableData} updateTableData={updateTableData} />
      <AddUserDrawer
        isOpen={isDrawerOpen}
        handleClose={handleCloseDrawer}
        updateTableData={updateTableData}
      />
    </div>
  );
};

export default Home;
