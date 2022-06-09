import React from "react";
import Container from "../../UI/inputs/Container";
import ErrorMessage from "../../UI/inputs/ErrorMessage";
import Label from "../../UI/inputs/Label";
import TextInput from "../../UI/inputs/TextInput";

const InputGroup = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  error,
  type,
}) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <TextInput
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        name={name}
        id={name}
        placeholder={placeholder ?? ""}
        value={value}
        type={`${type ? type : "text"}`}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default InputGroup;
