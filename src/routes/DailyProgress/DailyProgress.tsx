import { matchPath, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ACTIVITIES } from "../../App";

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
