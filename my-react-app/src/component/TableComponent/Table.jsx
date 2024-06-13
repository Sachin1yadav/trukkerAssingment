import React from "react";
import "./Table.css";
import { Dropdown, DropdownButton } from "react-bootstrap";

const UserTable = ({ tableData, updateTableData }) => {
  const handleDelete = (item) => {
    const updatedData = tableData.filter((data) => data.id !== item.id);
    updateTableData(updatedData);
  };
  return (
    <div className="tablecomponent">
      <table className="example-table">
        <thead>
          <tr>
            <th>STATUS</th>
            <th>USER ID</th>
            <th>EMAIL ADDRESS</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>USER ROLE</th>
            <th>EXPIRY BY</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((item, index) => (
            <tr key={index}>
              <td>{item?.status || ""}</td>
              <td>{item?.id || ""}</td>
              <td>{item?.email || ""}</td>
              <td>{item?.firstName || ""}</td>
              <td>{item?.lastName || ""}</td>
              <td>{item?.selectRole || ""}</td>
              <td>{item?.cordlimit || ""}</td>
              <td>
                <DropdownButton
                  title="Action"
                  variant="secondary"
                  id={`dropdown-button-${index}`}
                >
                  <Dropdown.Item onClick={() => handleDelete(item)}>
                    REMOVE
                  </Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
     
      </table>
      {tableData.length===0 && <div className="nodata">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBlIGhOg2L8L-Wi1Z0eAap2vnIUZCRDbn69Q&s" alt="" />
            <p>No User ...</p>
            </div>}
    </div>
  );
};

export default UserTable;
