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
  return allProgress[activity]?.[getDayFromDate(date)]?.completed || 0;
};

export const setActivityProgress = (
  activity: string,
  reps: number,
  date = new Date()
) => {
  const allProgress = getAllProgress();
  const day = getDayFromDate(date);
  allProgress[activity] = allProgress[activity] || {};
  allProgress[activity][day] = allProgress[activity][day] || {};
  allProgress[activity][day].completed = reps;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
};

export const getActivityTarget = (activity: string, date = new Date()) => {
  const allProgress = getAllProgress();
  return allProgress[activity]?.[getDayFromDate(date)]?.target || 0;
};

export const setActivityTarget = (
  activity: string,
  target: number,
  date = new Date()
) => {
  const allProgress = getAllProgress();
  const day = getDayFromDate(date);
  allProgress[activity] = allProgress[activity] || {};
  allProgress[activity][day] = allProgress[activity][day] || {};
  allProgress[activity][day].target = target;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
};
