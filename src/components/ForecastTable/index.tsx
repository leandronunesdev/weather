import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
} from '@mui/material';
import { ForecastType } from '../../pages/Home';
import { WEEK_DAYS } from '../../constants/weekDays';

import * as S from './styles';

export type ForecastTableProps = {
  rows: ForecastType[];
};

export const ForecastTable = ({ rows }: ForecastTableProps) => {
  const unixConverter = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return WEEK_DAYS[date.getDay()].name;
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>{}</TableCell>
            <TableCell align='center'>
              <S.MorningIcon />
              <S.StyledParagraph>Morning</S.StyledParagraph>
            </TableCell>
            <TableCell align='center'>
              <S.DayIcon />
              <S.StyledParagraph>Day</S.StyledParagraph>
            </TableCell>
            <TableCell align='center'>
              <S.NightIcon />
              <S.StyledParagraph>Night</S.StyledParagraph>
            </TableCell>
            <TableCell align='center'>
              <S.HumidityIcon />
              <S.StyledParagraph>Humidity</S.StyledParagraph>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row: ForecastType) => (
              <TableRow
                key={row.dt}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  <S.StyledParagraph>{unixConverter(row.dt)}</S.StyledParagraph>
                </TableCell>
                <TableCell align='center'>
                  {Math.round(row.temp.morn)}°
                </TableCell>
                <TableCell align='center'>
                  {Math.round(row.temp.day)}°
                </TableCell>
                <TableCell align='center'>
                  {Math.round(row.temp.night)}°
                </TableCell>
                <TableCell align='center'>
                  {Math.round(row.humidity)}%
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
