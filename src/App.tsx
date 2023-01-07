import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
`;

const NavbarSC = styled.div`
  width: 100%;
  height: 68px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(110, 110, 110, 0.3), 0 6px 6px rgba(0, 0, 0, 0.1);
`;

const Navbar = () => {
  return <NavbarSC />;
};

const App = () => {
  return (
    <>
      <Navbar />
      <Container>
        <h1>Woohooo</h1>
      </Container>
    </>
  );
};

export default App;
