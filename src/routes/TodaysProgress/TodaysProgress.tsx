import styled from "styled-components";

const PushupsCompleted = styled.input`
  height: 48px;
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

const TodaysProgress = () => {
  return (
    <Container>
      <ProgressSection>
        <h1>Completed</h1>
        <PushupsCompleted value="123" />
      </ProgressSection>
      <ProgressSection>
        <h1>Target</h1>
        <PushupsCompleted value="123" />
      </ProgressSection>
    </Container>
  );
};

export default TodaysProgress;
