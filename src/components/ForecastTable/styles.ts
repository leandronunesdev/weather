import styled, { css } from 'styled-components';
import {
  WiDayHaze,
  WiDaySunny,
  WiHumidity,
  WiMoonWaningCrescent2,
} from 'react-icons/wi';

export const StyledParagraph = styled.p`
  font-weight: bold;
`;

export const MorningIcon = styled(WiDayHaze).attrs({
  size: '35px',
})`
  ${({ theme }) => css`
    color: ${theme.colors.yellow};
  `}
`;

export const DayIcon = styled(WiDaySunny).attrs({
  size: '35px',
})`
  ${({ theme }) => css`
    color: ${theme.colors.yellow};
  `}
`;

export const NightIcon = styled(WiMoonWaningCrescent2).attrs({
  size: '35px',
})`
  ${({ theme }) => css`
    color: ${theme.colors.blue};
  `}
`;

export const HumidityIcon = styled(WiHumidity).attrs({
  size: '35px',
})`
  ${({ theme }) => css`
    color: ${theme.colors.lightBlue};
  `}
`;
