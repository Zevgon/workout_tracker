import moment from "moment";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import Confetti from "react-confetti";
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

const CONFETTI_DURATION_MS = 6000;

const InputField = styled.input`
  display: flex;
  font-size: 32px;
  padding: 3px 8px;
  width: 100%;
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  width: 100%;
`;

const Container = styled.div`
  column-gap: 40px;
  display: flex;
  width: 100%;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    row-gap: 20px;
  }
`;

export const ActivityProgress = () => {
  const activity = useMatch("/progress/:activity")!.params.activity!;
  const [numCompleted, setNumCompleted] = useState(0);
  const [target, setTarget] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const day = moment().format("MMM. D, yyyy");

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
      setNumCompleted((prevNumCompleted) => {
        if (prevNumCompleted < target && newNumCompleted >= target) {
          setShowConfetti(true);
        }
        return newNumCompleted;
      });
    },
    [activity, target]
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
  }, [activity, setNewTarget, day]);

  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => {
        setShowConfetti(false);
      }, CONFETTI_DURATION_MS);
    }
  }, [showConfetti]);

  return (
    <Container>
      {showConfetti && <Confetti />}
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
