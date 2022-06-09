import React from "react";
import Container from "../../UI/inputs/Container";
import Label from "../../UI/inputs/Label";
import SelectInput from "../../UI/inputs/SelectInput";

const SelectGroup = ({ label, name, options, onChange, value }) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <SelectInput name={name} id={name} value={value} onChange={onChange}>
        {options.map((option, i) => (
          <option key={`id${i}`} value={option}>
            {option}
          </option>
        ))}
      </SelectInput>
    </Container>
  );
};

export default SelectGroup;
