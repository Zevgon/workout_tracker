import getValueForPath from "lodash.get";
import setValueForPath from "lodash.set";
import moment from "moment";

const PROGRESS_KEY = "zevgon:workout_tracker:progress";

const getDayFromDate = (date: Date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const getAllProgress = () => {
  const progress = localStorage.getItem(PROGRESS_KEY) || "{}";
  return JSON.parse(progress);
};

export const getActivityProgress = (activity: string, date = new Date()) => {
  const allProgress = getAllProgress();
  return getValueForPath(
    allProgress,
    [getDayFromDate(date), activity, "completed"],
    0 /* default */
  );
};

export const setActivityProgress = (
  activity: string,
  reps: number,
  date = new Date()
) => {
  const allProgress = getAllProgress();
  const day = getDayFromDate(date);
  setValueForPath(allProgress, [day, activity, "completed"], reps);
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
};

export const getActivityTarget = (activity: string, date = new Date()) => {
  const allProgress = getAllProgress();
  return getValueForPath(
    allProgress,
    [getDayFromDate(date), activity, "target"],
    0 /* default */
  );
};

export const setActivityTarget = (
  activity: string,
  target: number,
  date = new Date()
) => {
  const allProgress = getAllProgress();
  setValueForPath(
    allProgress,
    [getDayFromDate(date), activity, "target"],
    target
  );
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
};
