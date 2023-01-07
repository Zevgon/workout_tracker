import styled from "styled-components";

const IncrementButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const IncrementButton = styled.button`
  height: 48px;
  min-width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 24px;
  background-color: #1899d6;
  border: none;
`;

interface Props {
  onInc: (incBy: number) => void;
}

const IncrementButtons = ({ onInc }: Props) => {
  return (
    <IncrementButtonsContainer>
      <IncrementButton onClick={() => onInc(1)}>+1</IncrementButton>
      <IncrementButton onClick={() => onInc(10)}>+10</IncrementButton>
      <IncrementButton onClick={() => onInc(20)}>+20</IncrementButton>
      <IncrementButton onClick={() => onInc(100)}>+100</IncrementButton>
    </IncrementButtonsContainer>
  );
};

export default IncrementButtons;
