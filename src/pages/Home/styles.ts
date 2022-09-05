import styled, { css, DefaultTheme } from 'styled-components';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import LegendToggleRoundedIcon from '@mui/icons-material/LegendToggleRounded';
import ScatterPlotRoundedIcon from '@mui/icons-material/ScatterPlotRounded';

type UnitsButtonType = {
  theme: DefaultTheme;
  isSelected: boolean;
};

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

  @media (max-width: 450px) {
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
  margin-bottom: 25px;

  @media (max-width: 415px) {
    flex-direction: column;
  }
`;

export const ButtonsSection = styled.div`
  display: flex;

  @media (max-width: 415px) {
    margin-top: 25px;
    justify-content: center;
  }
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

export const UnitsButton = styled.div`
  ${({ isSelected }: UnitsButtonType) => css`
    border: none;
    margin-left: 20px;
    height: 50px;
    min-width: 50px;
    width: 50px;
    background: white;
    color: black;
    font-size: 14px;
    border-radius: 50%;
    cursor: pointer;

    ${isSelected &&
    css`
      background: black;
      color: white;
    `}

    p {
      margin: 12px;
      font-size: 22px;
    }

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

export const MinimumIcon = styled(KeyboardArrowDownRoundedIcon)`
  ${({ theme }) => css`
    color: ${theme.colors.blue};
  `}
`;

export const MaximumIcon = styled(KeyboardArrowUpRoundedIcon)`
  ${({ theme }) => css`
    color: ${theme.colors.yellow};
  `}
`;
export const MeanIcon = styled(LegendToggleRoundedIcon)`
  ${({ theme }) => css`
    color: ${theme.colors.lightBlue};
  `}
`;
export const ModeIcon = styled(ScatterPlotRoundedIcon)`
  ${({ theme }) => css`
    color: ${theme.colors.grey};
  `}
`;
