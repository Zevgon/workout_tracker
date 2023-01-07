import moment from "moment";

export const getDayOfYear = () => {
  return moment().dayOfYear();
};

export const getWeekOfYear = () => {
  return Math.floor(moment().dayOfYear() / 7);
};
