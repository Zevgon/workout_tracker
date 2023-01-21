import {
  getActivityProgress,
  getActivityTarget,
  setActivityProgress,
  TEST_ONLY,
} from "./progress";

const DEFAULT_DAY = "1990-06-23";

let getSpy: jest.Mock;
let setSpy: jest.Mock;

describe("progress", () => {
  beforeEach(() => {
    getSpy = jest.fn();
    setSpy = jest.fn();
    Storage.prototype.getItem = getSpy;
    Storage.prototype.setItem = setSpy;
    jest.useFakeTimers().setSystemTime(new Date(`${DEFAULT_DAY} 00:00:00`));
  });

  test("sets progress correctly 1 second before next day", () => {
    jest.useFakeTimers().setSystemTime(new Date("2023-01-21 23:59:59"));

    setActivityProgress("push-ups", 3);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      TEST_ONLY.PROGRESS_KEY,
      JSON.stringify({
        "2023-01-21": {
          "push-ups": { completed: 3 },
        },
      })
    );
  });

  test("sets progress correctly at midnight", () => {
    jest.useFakeTimers().setSystemTime(new Date("2023-01-22 00:00:00"));

    setActivityProgress("push-ups", 3);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      TEST_ONLY.PROGRESS_KEY,
      JSON.stringify({
        "2023-01-22": {
          "push-ups": { completed: 3 },
        },
      })
    );
  });

  test("doesn't overwrite other progress data while updating progress", () => {
    const EXISTING_PROGRESS_DATA = {
      ["2023-01-24"]: {
        "pull-ups": { completed: 2, target: 8 },
      },
      [DEFAULT_DAY]: {
        "push-ups": { completed: 3, target: 20 },
      },
    };
    getSpy.mockReturnValue(JSON.stringify(EXISTING_PROGRESS_DATA));

    setActivityProgress("push-ups", 10);

    expect(setSpy).toHaveBeenCalledWith(
      TEST_ONLY.PROGRESS_KEY,
      JSON.stringify({
        ...EXISTING_PROGRESS_DATA,
        [DEFAULT_DAY]: {
          ...EXISTING_PROGRESS_DATA[DEFAULT_DAY],
          "push-ups": {
            ...EXISTING_PROGRESS_DATA[DEFAULT_DAY]["push-ups"],
            completed: 10,
          },
        },
      })
    );
  });

  test("gets today's target correctly if already set", () => {
    jest.useFakeTimers().setSystemTime(new Date("2023-01-25 00:00:00"));

    getSpy.mockReturnValue(
      JSON.stringify({
        "2023-01-25": {
          "push-ups": { target: 8, completed: 0 },
        },
      })
    );

    const target = getActivityTarget("push-ups");

    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(target).toBe(8);
  });

  test("gets progress correctly, defaulting to current day", () => {
    getSpy.mockReturnValue(
      JSON.stringify({
        [DEFAULT_DAY]: {
          "push-ups": { completed: 3, target: 20 },
        },
      })
    );

    const completed = getActivityProgress("push-ups");

    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(completed).toBe(3);
  });

  test("gets progress correctly when specifying a specific day that's not today", () => {
    getSpy.mockReturnValue(
      JSON.stringify({
        ["2023-01-21"]: {
          "push-ups": { completed: 1, target: 21 },
        },
        ["2023-01-24"]: {
          "push-ups": { completed: 20, target: 24 },
        },
      })
    );

    const target = getActivityTarget(
      "push-ups",
      new Date("2023-01-24 00:00:00")
    );
    const completed = getActivityProgress(
      "push-ups",
      new Date("2023-01-24 00:00:00")
    );

    expect(target).toBe(24);
    expect(completed).toBe(20);
  });
});

export {};
