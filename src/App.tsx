import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Navbar, { NavbarLink } from "./navbar/Navbar";
import Calendar from "./routes/Calendar/Calendar";
import TodaysProgress from "./routes/TodaysProgress/TodaysProgress";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
`;

const App = () => {
  return (
    <Router>
      <Navbar>
        <NavbarLink to="/">Today's Progress</NavbarLink>
        <NavbarLink to="/calendar">Calendar</NavbarLink>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" index={true} element={<TodaysProgress />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
