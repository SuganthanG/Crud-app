import * as React from "react";
import { useState } from "react";
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

export default function Create() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const postData = (event) => {
    event.preventDefault();
    console.log(firstName);
    console.log(lastName);
    console.log(checked);
    axios.post("https://63690bba28cd16bba7137722.mockapi.io/fakedata", {
      firstName,
      lastName,
      checked,
    });
    setChecked(false);
    setFirstName("");
    setLastName("");
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
          <div>
            <Button variant="contained" onClick={postData} type="submit">
              Submit
            </Button>
          </div>
        </FormControl>
      </div>
    </Box>
  );
}
