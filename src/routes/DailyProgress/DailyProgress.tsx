import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import {
  matchPath,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { ACTIVITIES } from "../../App";
import {
  getActivityProgress,
  getActivityTarget,
  setActivityProgress,
  setActivityTarget,
} from "../../utils/progress";
import { getDayOfYear, getWeekOfYear } from "../../utils/time";

const PushupsCompleted = styled.input`
  padding: 3px 8px;
  display: flex;
  font-size: 32px;
  margin-top: 32px;
  width: 100%;
`;

const ProgressSection = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  column-gap: 40px;
`;

const ActivityProgressContainer = styled.div`
  margin-top: 20px;
`;

const ActivitySelectorContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 40px;
`;

const ActivityChip = styled.button<{ selected: boolean }>`
  font-size: 24px;
  font-weight: 600;
  background-color: ${({ selected }) => (selected ? "#1899d6" : "white")};
  border: ${({ selected }) =>
    selected ? "2px solid white" : "2px solid #ccc"};
  border-radius: 100px;
  padding: 8px 16px;
  cursor: pointer;
`;

const ActivitySelector = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleActivityClick = (activity: string) => {
    navigate(`/progress/${activity}`);
  };

  return (
    <ActivitySelectorContainer>
      {ACTIVITIES.map((activity) => (
        <ActivityChip
          key={activity}
          selected={Boolean(
            matchPath(`/progress/${activity}`, location.pathname)
          )}
          onClick={() => handleActivityClick(activity)}
        >
          {activity[0].toUpperCase() + activity.slice(1)}
        </ActivityChip>
      ))}
    </ActivitySelectorContainer>
  );
};

export const ProgressPage = () => {
  return (
    <div>
      <ActivitySelector />
      <ActivityProgressContainer>
        <Outlet />
      </ActivityProgressContainer>
    </div>
  );
};

export const ActivityProgress = () => {
  const activity = useMatch("/progress/:activity")!.params.activity!;
  const [numCompleted, setNumCompleted] = useState(0);
  const [target, setTarget] = useState(0);

  const setNewTarget = useCallback(
    (newTarget: number) => {
      setActivityTarget(activity, newTarget);
      setTarget(newTarget);
    },
    [activity]
  );

  const handleNumCompletedChange: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        const newNumCompleted = Number(e.currentTarget.value);
        setActivityProgress(activity, newNumCompleted);
        setNumCompleted(newNumCompleted);
      },
      [activity]
    );

  const handleTargetChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setNewTarget(Number(e.currentTarget.value));
    },
    [setNewTarget]
  );

  useEffect(() => {
    setNumCompleted(getActivityProgress(activity));
    setTarget(getActivityTarget(activity));
  }, [activity]);

  useEffect(() => {
    if (activity === "push-ups" && getActivityTarget(activity) === 0) {
      setNewTarget(getDayOfYear());
    } else if (activity === "pull-ups" && getActivityTarget(activity) === 0) {
      setNewTarget(getWeekOfYear());
    }
  }, [activity, setNewTarget]);

  return (
    <Container>
      <ProgressSection>
        <h1>Completed</h1>
        <PushupsCompleted
          value={numCompleted.toString()}
          type="number"
          onChange={handleNumCompletedChange}
        />
      </ProgressSection>
      <ProgressSection>
        <h1>Target</h1>
        <PushupsCompleted
          value={target.toString()}
          type="number"
          onChange={handleTargetChange}
        />
      </ProgressSection>
    </Container>
  );
};
