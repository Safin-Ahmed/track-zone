import React from "react";
import useForm from "../../hooks/useForm";
import InputGroup from "../Shared/forms/InputGroup";
import SelectGroup from "../Shared/forms/SelectGroup";
import classes from "./Form.module.css";

const init = {
  title: "",
  time: "",
  date: "",
  timeZone: "Africa/Abidjan",
};

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = "Title is Required for your Clock";
  }

  if (!values.time) {
    errors.time = "Time is Required for your Clock";
  }

  if (!values.timeZone) {
    errors.timeZone = "Time Zone is Required For Your Clock";
  }

  return errors;
};

const arrOfTimeZones = Intl.supportedValuesOf("timeZone");

const Form = ({ addNewClock, setPopupFormShown, type = "add" }) => {
  const submitCB = ({ values }) => {
    console.log(values);
    addNewClock(values);
    clear();
    setPopupFormShown(false);
  };

  const editCB = (id) => {};
  const {
    formState: state,
    handleBlur,
    handleChange,
    handleFocus,
    handleSubmit,
    clear,
  } = useForm({ init, validate });
  return (
    <form
      className={classes.popupForm}
      onSubmit={(e) => handleSubmit(e, (type = "add" ? submitCB : editCB))}
    >
      <div className="form-group">
        <InputGroup
          value={state.title.value}
          label="Title"
          name="title"
          placeholder="ABC Clock"
          error={state.title.error}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <InputGroup
          value={state.date.value}
          label="Date"
          name="date"
          placeholder="12/5/2022"
          error={state.date.error}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="date"
        />
        <InputGroup
          value={state.time.value}
          label="Time"
          name="time"
          placeholder="12:59"
          error={state.time.error}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="time"
        />
        <SelectGroup
          label="Time Zone"
          name="timeZone"
          options={arrOfTimeZones}
          onChange={handleChange}
          value={state.timeZone.value}
        />
        <div className="actions">
          <button type="reset" onClick={clear}>
            Reset
          </button>

          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default Form;
