import styled, { css } from 'styled-components';

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: auto;
  padding: 0 25px;
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
    border-radius: 15px;
  }

  @media (max-width: 415px) {
    .MuiTableCell-root {
      padding: 16px 4px;
    }

    h2 {
      font-size: 20px;
    }
  }
`;

export const StyledForm = styled.form`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const StyledButton = styled.button`
  ${({ theme }) => css`
    border: none;
    margin-left: 20px;
    height: 50px;
    min-width: 50px;
    background: ${theme.colors.yellow};
    color: ${theme.colors.white};
    font-size: 14px;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.15);
    }
  `}
`;

export const StatsBoxSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 25px 0 100px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }

  @media (max-width: 460px) {
    grid-template-columns: 1fr;
  }
`;
