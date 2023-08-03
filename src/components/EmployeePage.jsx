import React from "react";
import Button from "@mui/material/Button";
import "../../src/styles.css";
import {
  Paper,
  DialogActions,
  DialogContent,
  DialogContentText,
  Dialog,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import EmployeeForm from "./EmployeeForm";
import { getItem, setItem } from "../util/Storage";
import EmployeeTable from "./EmployeeTable";
const initialEmpData = {
  empId: null,
  name: "",
  salary: null,
  mobile: null,
  designation: "",
};
function EmployeePage() {
  const [empData, setempData] = useState(initialEmpData);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const tableData = getItem();
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "mobile") {
      validateMobileNumber(value);
      setempData({ ...empData, [name]: value });
    } else {
      setempData({ ...empData, [name]: value });
    }
  };

  //To submit form data
  const handleSubmit = (e) => {
    if (errorMessage) return e.preventDefault();
    let employees = getItem();
    employees.push(empData);
    setItem("formData", employees);
    setempData(initialEmpData);
    handleClose();
  };

  // Function to validate the mobile number
  const validateMobileNumber = (number) => {
    if (number.length !== 10) {
      setErrorMessage("Mobile number must be at least 10 digits");
    } else {
      setErrorMessage("");
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Table
  const columns = [
    { id: "empId", label: "Employee ID", minWidth: 150 },
    { id: "name", label: "Name", minWidth: 100 },
    {
      id: "salary",
      label: "Salary",
      minWidth: 170,
      align: "right",
    },
    {
      id: "mobile",
      label: "Mobile No",
      minWidth: 170,
      align: "right",
    },
    {
      id: "designation",
      label: "Designation",
      minWidth: 170,
      align: "right",
    },
  ];

  function createData(empId, name, salary, mobile, designation) {
    return { empId, name, salary, mobile, designation };
  }

  const rows = [];
  tableData &&
    tableData
      ?.reverse()
      ?.forEach((el) =>
        rows?.push(
          createData(el.empId, el.name, el.salary, el.mobile, el.designation)
        )
      );
  return (
    <main>
      <div className="button-container">
        <Button size="large" onClick={handleClickOpen} variant="contained">
          Add Employee
        </Button>
      </div>
      <EmployeeTable rows={rows} columns={columns} />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="dialog-container" id="responsive-dialog-title">
          <p className="form-title">Add New Employee</p>
        </div>
        <DialogContent style={{ marginTop: "1em" }}>
          <DialogContentText>
            <EmployeeForm
              handleChange={handleChange}
              empData={empData}
              handleSubmit={handleSubmit}
              errorMessage={errorMessage}
            />
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}

export default EmployeePage;
