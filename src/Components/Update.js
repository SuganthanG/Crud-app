import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
//import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
//import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
//import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import axios from "axios";
import { Form, Link } from "react-router-dom";

export default function Update() {
  const [firstName, setFirstName] = useState(" ");
  const [lastName, setLastName] = useState(" ");
  const [checked, setChecked] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    setId(localStorage.getItem("ID"));
    setFirstName(localStorage.getItem("First Name"));
    setLastName(localStorage.getItem("Last Name"));
    setChecked(localStorage.getItem("Checkbox Value"));
  }, []);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const updateAPIdata = (e) => {
    e.preventDefault();
    console.log(checked);
    axios.put(`https://jsonplaceholder.typicode.com/${id}`, {
      firstName,
      lastName,
      checked,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <FormControl>
          <div>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-simple">FirstName</InputLabel>
              <Input
                id="component-simple"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
          </div>
          <div>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-simple">LastName</InputLabel>
              <Input
                id="component-simple"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
          </div>

          <div>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <span>I agree to the Terms and Conditions</span>
          </div>
          <Link to="/read">
            <div>
              <Button variant="contained" onClick={updateAPIdata} type="submit">
                Update
              </Button>
            </div>
          </Link>
        </FormControl>
      </div>
    </Box>
  );
}
