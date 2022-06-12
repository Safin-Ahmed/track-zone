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

  // if (!values.time) {
  //   errors.time = "Time is Required for your Clock";
  // }

  if (!values.timeZone) {
    errors.timeZone = "Time Zone is Required For Your Clock";
  }

  return errors;
};

const arrOfTimeZones = Intl.supportedValuesOf("timeZone");

const Form = ({
  clockFn,
  setPopupFormShown,
  type = "add",
  id = null,
  editState = null,
}) => {
  const submitCB = ({ hasError, values }) => {
    if (hasError) {
      return;
    }
    console.log(values);
    clockFn(values);
    clear();
    setPopupFormShown(false);
  };

  const editCB = ({ hasError, values }) => {
    if (hasError) {
      return;
    }
    if (id) {
      console.log(values);
      clockFn(id, values);
      clear();
      setPopupFormShown(false);
    }
  };

  if (type === "edit" && editState) {
    let userClock;
    if (id === "uz") {
      userClock = editState.user;
    } else {
      userClock = editState.clocks.find((clock) => clock.id === id);
    }

    init.title = userClock.title;
    init.date = `${new Date(userClock.time).getFullYear()}-${(
      new Date(userClock.time).getMonth() + 1
    )
      .toString()
      .padStart(2, 0)}-${new Date(userClock.time).getDate()}`;
    init.time = `${new Date(userClock.time)
      .getHours()
      .toString()
      .padStart(2, 0)}:${new Date(userClock.time)
      .getMinutes()
      .toString()
      .padStart(2, 0)}`;
    init.timeZone = userClock.timeZone;
  }

  if (type === "add" && !editState) {
    init.title = "";
    init.date = "";
    init.time = "";
    init.timeZone = "Africa/Abidjan";
  }

  const {
    formState: state,
    handleBlur,
    handleChange,
    handleFocus,
    handleSubmit,
    clear,
  } = useForm({ init, validate });

  if (type === "add") {
    return (
      <form
        className={classes.popupForm}
        onSubmit={(e) => handleSubmit(e, submitCB)}
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
  }

  if (type === "edit") {
    return (
      <form
        className={classes.popupForm}
        onSubmit={(e) => handleSubmit(e, editCB)}
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
  }
};

export default Form;
