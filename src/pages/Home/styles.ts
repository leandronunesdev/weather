import styled, { css } from 'styled-components';

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: auto;
  font-family: 'Roboto', sans-serif;

  h1 {
    margin: 100px auto 25px;
  }

  h2 {
    margin: 25px 0;
  }

  .MuiPaper-root {
    box-shadow: none;
    margin: 25px auto;
  }
`;

export const StyledForm = styled.form`
  margin: 0 auto 25px;
  display: flex;
`;

export const StyledButton = styled.button`
  ${({ theme }) => css`
    border: none;
    margin-left: 20px;
    height: 50px;
    width: 50px;
    background: ${theme.colors.yellow};
    color: white;
    font-size: 14px;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.15);
    }
  `}
`;
