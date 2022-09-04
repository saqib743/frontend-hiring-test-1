import Moment from "moment";
export const formatDuration = (date) => {
  let minutes = Moment(date).format("m");
  let seconds = Moment(date).format("s");
  return minutes + " minutes " + seconds + " seconds";
};

export const formatDate = (date) => {
  return Moment(date).format("DD-MM-YY");
};
