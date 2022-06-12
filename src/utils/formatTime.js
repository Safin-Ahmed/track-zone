const formatTime = (time) => {
  const hours = new Date(time).getHours();
  const mins = new Date(time).getMinutes();
  const period = hours >= 12 ? "PM" : "AM";

  const formattedStartTime = `${hours.toString().padStart(2, 0)} : ${mins
    .toString()
    .padStart(2, 0)} ${period} `;

  return formattedStartTime;
};

export default formatTime;
