import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import {
  getActivityProgress,
  getActivityTarget,
  setActivityProgress,
  setActivityTarget,
} from "../../utils/progress";
import { getDayOfYear, getWeekOfYear } from "../../utils/time";
import IncrementButtons from "./IncrementButtons";

const InputField = styled.input`
  padding: 3px 8px;
  display: flex;
  font-size: 32px;
  width: 100%;
`;

const ProgressSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  column-gap: 40px;
`;

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

  const setNewNumCompleted = useCallback(
    (newNumCompleted: number) => {
      setActivityProgress(activity, newNumCompleted);
      setNumCompleted(newNumCompleted);
    },
    [activity]
  );

  const handleNumCompletedChange: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        setNewNumCompleted(Number(e.currentTarget.value));
      },
      [setNewNumCompleted]
    );

  const handleTargetChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setNewTarget(Number(e.currentTarget.value));
    },
    [setNewTarget]
  );

  const handleIncrement = useCallback(
    (incBy: number) => {
      setNewNumCompleted(numCompleted + incBy);
    },
    [setNewNumCompleted, numCompleted]
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
        <InputField
          value={numCompleted.toString()}
          type="number"
          onChange={handleNumCompletedChange}
        />
        <IncrementButtons onInc={handleIncrement} />
      </ProgressSection>
      <ProgressSection>
        <h1>Target</h1>
        <InputField
          value={target.toString()}
          type="number"
          onChange={handleTargetChange}
        />
      </ProgressSection>
    </Container>
  );
};
