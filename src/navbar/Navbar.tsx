import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = styled.nav`
  align-items: center;
  background-color: white;
  box-shadow: 0 5px 20px rgba(110, 110, 110, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
  column-gap: 32px;
  display: flex;
  height: 68px;
  justify-content: flex-start;
  padding: 0 40px;
  width: 100%;
`;

export const NavbarLink = styled(Link)`
  font-size: 20px;
  font-weight: 700;
  color: black;
  text-decoration: none;
  transition: opacity 0.3s;

  :hover {
    opacity: 0.6;
  }
`;

export default Navbar;
