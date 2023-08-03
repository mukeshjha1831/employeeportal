import React from "react";
import {Grid, TextField, Button} from "@mui/material";
import "../../src/styles.css";
function EmployeeForm({ handleChange, empData, handleSubmit, errorMessage }) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              type="number"
              required
              name="empId"
              value={empData.empId}
              onChange={handleChange}
              fullWidth
              id="outlined-basic"
              label="Emp ID"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="name"
              required
              value={empData.name}
              onChange={handleChange}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              name="salary"
              value={empData.salary}
              onChange={handleChange}
              fullWidth
              id="outlined-basic"
              label="Salary"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              required
              inputProps={{ min: 10 }}
              name="mobile"
              value={empData.mobile}
              onChange={handleChange}
              fullWidth
              id="outlined-basic"
              label="Mobile Number"
              variant="outlined"
            />
            {errorMessage && (
              <div style={{ fontSize: "10px", color: "red" }}>
                {errorMessage}
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="designation"
              value={empData.designation}
              onChange={handleChange}
              id="outlined-basic"
              label="Designation"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <div className="submit-container">
          <Button size="large" type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}

export default EmployeeForm;
