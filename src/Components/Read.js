import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import { Button } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Link } from "react-router-dom";
//import Link from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 10,
  },
}));

export default function Read() {
  const [APIdata, setAPIData] = useState([]);
  useEffect(() => {
    axios
      .get("https://63690bba28cd16bba7137722.mockapi.io/fakedata")
      .then((response) => {
        console.log(response.data);
        setAPIData(response.data);
      });
  }, []);

  const setData = (data) => {
    console.log(data);
    let { id, firstName, lastName, checked } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Checkbox Value", checked);
  };
  const getData = () => {
    axios
      .get("https://63690bba28cd16bba7137722.mockapi.io/fakedata")
      .then(() => {
        setAPIData(getData.data);
      });
  };

  const onDelete = (id) => {
    axios
      .delete(`https://63690bba28cd16bba7137722.mockapi.io/fakedata/${id}`)
      .then(() => {
        getData();
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>FirstName</StyledTableCell>
            <StyledTableCell align="right">LastName</StyledTableCell>
            <StyledTableCell align="right">Checked</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {APIdata.map((data) => (
            <StyledTableRow key={data.id}>
              <StyledTableCell component="th" scope="row">
                {data.firstName}
              </StyledTableCell>
              <StyledTableCell align="right">{data.lastName}</StyledTableCell>
              <StyledTableCell align="right">
                {data.checked ? "checked" : "Not Checked"}
              </StyledTableCell>
              <Link to="/update">
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={() => setData(data)}
                  >
                    Update
                  </Button>
                </StyledTableCell>
              </Link>
              <StyledTableCell align="right">
                <Button
                  variant="contained"
                  type="submit"
                  onClick={() => onDelete(data.id)}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
