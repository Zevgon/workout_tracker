import moment from "moment";
import { matchPath, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ACTIVITIES } from "../../App";

const ActivityProgressContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const ActivitySelectorContainer = styled.div`
  align-items: center;
  column-gap: 40px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const ActivityChip = styled.button<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? "#1899d6" : "white")};
  border-radius: 100px;
  border: ${({ selected }) =>
    selected ? "2px solid white" : "2px solid #ccc"};
  color: black;
  cursor: pointer;
  font-size: 24px;
  font-weight: 600;
  padding: 8px 16px;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  row-gap: 32px;
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
    <Container>
      <h1>{moment().format("MMM. D, yyyy")}</h1>
      <ActivitySelector />
      <ActivityProgressContainer>
        <Outlet />
      </ActivityProgressContainer>
    </Container>
  );
};
