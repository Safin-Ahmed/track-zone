import React from "react";
import useForm from "../../hooks/useForm";
import InputGroup from "../Shared/forms/InputGroup";
import classes from "./EventForm.module.css";

const init = {
  eventTitle: "",
  eventStartTime: "",
  eventEndTime: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.eventTitle) {
    errors.eventTitle = "Event Title is Required for your Event";
  }

  if (!values.eventStartTime) {
    errors.eventStartTime = "Start Time is Required For Your Event";
  }

  if (!values.eventEndTime) {
    errors.eventEndTime = "End Time is Required For Your Event";
  }

  if (
    new Date(values.eventEndTime).getTime() < new Date(values.eventStartTime)
  ) {
    errors.eventEndTime =
      "End Time Must Be a Future Time Comparing to Start Time";
  }
  return errors;
};

const EventForm = ({ addEventHandler, id, setShowEventForm }) => {
  const {
    formState: state,
    handleBlur,
    handleChange,
    handleFocus,
    handleSubmit,
    clear,
  } = useForm({ init, validate });

  const submitCB = ({ hasError, values }) => {
    if (hasError) {
      return;
    }
    addEventHandler(values, id);
    clear();
    setShowEventForm("eventForm", false);
  };

  return (
    <form
      className={classes.popupForm}
      onSubmit={(e) => handleSubmit(e, submitCB)}
    >
      <div className="form-group">
        <InputGroup
          value={state.eventTitle.value}
          label="Event Title"
          name="eventTitle"
          placeholder="Meeting with John"
          error={state.eventTitle.error}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <InputGroup
          value={state.eventStartTime.value}
          label="Event Start Time"
          name="eventStartTime"
          placeholder="12/5/2022 09:53"
          error={state.eventStartTime.error}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="datetime-local"
        />
        <InputGroup
          value={state.eventEndTime.value}
          label="Event End Time"
          name="eventEndTime"
          placeholder="12/5/2022 09:53"
          error={state.eventEndTime.error}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="datetime-local"
        />

        <div className={classes.actions}>
          <button onClick={() => setShowEventForm("eventForm", false)}>
            Close
          </button>
          <button type="reset" onClick={clear}>
            Reset
          </button>
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
