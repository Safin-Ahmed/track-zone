import { useState } from "react";
import {
  deepClone,
  isObjEmpty,
  mapStateToKeys,
  mapValuesToState,
} from "../utils/objUtils";

const useForm = ({ init, validate }) => {
  const [formState, setFormState] = useState(mapValuesToState(init));

  const handleChange = (e) => {
    const { name: key, value, type, checked } = e.target;
    const newState = deepClone(formState);
    if (type === "checkbox") {
      newState[key].value = checked;
    } else {
      newState[key].value = value;
    }

    const { errors } = getErrors(newState);

    if (newState[key].touched && errors[key]) {
      newState[key].error = errors[key];
    } else {
      newState[key].error = "";
    }

    setFormState(newState);
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    const newState = deepClone(formState);
    newState[name].focused = true;

    if (!newState[name].touched) {
      newState[name].touched = true;
    }

    setFormState(newState);
  };

  const handleBlur = (e) => {
    const key = e.target.name;
    const { errors } = getErrors();
    const newState = deepClone(formState);

    if (newState[key].touched && errors[key]) {
      newState[key].error = errors[key];
    } else {
      newState[key].error = "";
    }

    newState[key].focused = false;
    setFormState(newState);
  };

  const handleSubmit = (e, cb) => {
    e.preventDefault();
    const { hasError, errors, values } = getErrors();
    cb({
      hasError,
      errors,
      values,
      touched: mapStateToKeys(formState, "touched"),
      focused: mapStateToKeys(formState, "focused"),
    });
  };

  const clear = () => {
    const newState = mapValuesToState(init, true);
    setFormState(newState);
  };

  const getErrors = (cloneState = null) => {
    let hasError = null;
    let errors = null;

    const values = mapStateToKeys(cloneState ? cloneState : formState, "value");

    if (typeof validate === "boolean") {
      hasError = validate;
      errors = mapStateToKeys(formState, "error");
    } else if (typeof validate === "function") {
      const errorsFromCB = validate(values);
      hasError = !isObjEmpty(errorsFromCB);
      errors = errorsFromCB;
    } else {
      throw new Error("Validate Property Must Be Boolean or Function");
    }

    return {
      hasError,
      errors,
      values,
    };
  };

  return {
    formState,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    clear,
  };
};
