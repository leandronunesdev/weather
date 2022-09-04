import styled, { css } from 'styled-components';

export const StatsBoxWrapper = styled.div`
  ${({ theme }) => css`
    margin: auto;
    border-radius: 15px;
    background: ${theme.colors.white};
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `}
`;

export const StatsTitle = styled.div`
  ${({ theme }) => css`
    p {
      margin: 20px 0 20px 20px;
      color: ${theme.colors.darkGrey};
      font-size: 14px;
    }
  `}
`;

export const StatsData = styled.div`
  display: flex;
  margin: 20px;
  justify-content: space-between;
  font-size: 60px;

  .MuiSvgIcon-root {
    font-size: 60px;
  }
`;
