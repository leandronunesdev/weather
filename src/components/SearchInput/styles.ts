import styled from 'styled-components';

export const StyledInput = styled.input`
  height: 50px;
  width: 600px;
  padding-left: 24px;
  font-size: 16px;
  outline: none;
  border-radius: 15px;
  border: none;

  &:hover {
    box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 415px) {
    width: 100%;
  }
`;
