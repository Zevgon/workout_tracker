import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import styled from "styled-components";
import Navbar, { NavbarLink } from "./navbar/Navbar";
import Calendar from "./routes/Calendar/Calendar";
import { ActivityProgress } from "./routes/DailyProgress/ActivityProgress";
import { ProgressPage } from "./routes/DailyProgress/DailyProgress";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px 40px;
`;

export const ACTIVITIES = ["push-ups", "pull-ups"];

const App = () => {
  return (
    <Router>
      <Navbar>
        <NavbarLink to={`/progress/${ACTIVITIES[0]}`}>
          Today's Progress
        </NavbarLink>
        <NavbarLink to="/calendar">Calendar</NavbarLink>
      </Navbar>
      <Container>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/progress/${ACTIVITIES[0]}`} />}
          />
          <Route path="/progress" element={<ProgressPage />}>
            <Route
              path={`/progress/:activity`}
              element={<ActivityProgress />}
            />
          </Route>
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
