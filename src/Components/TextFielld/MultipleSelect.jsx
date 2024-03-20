import React from "react";
import { OutlinedInput, InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const MultipleSelectCheckmarks = ({ items, onChange, label, value, renderValue, selectedNames }) => {
  return (
    <FormControl size="small" style={{ width: "100%" }}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput label="Multiple Select" />}
        renderValue={renderValue}
      >
        {items.map((option) => (
          <MenuItem key={option.id} value={option.id} sx={{ justifyContent: "space-between" }}>
            {option.name}
            {selectedNames.includes(option.id) && <CheckIcon color="info" />}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectCheckmarks;
