import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const ForecastTable = ({ rows }: any) => {
  const unixConverter = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return WEEK_DAYS[date.getDay()].name;
  };

  const WEEK_DAYS = [
    {
      id: 0,
      name: 'SUN',
    },
    {
      id: 1,
      name: 'MON',
    },
    {
      id: 2,
      name: 'TUE',
    },
    {
      id: 3,
      name: 'WED',
    },
    {
      id: 4,
      name: 'THU',
    },
    {
      id: 5,
      name: 'FRI',
    },
    {
      id: 6,
      name: 'SAT',
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Weekday</TableCell>
            <TableCell align='right'>Morning</TableCell>
            <TableCell align='right'>Day</TableCell>
            <TableCell align='right'>Night</TableCell>
            <TableCell align='right'>Humidity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row: any) => (
              <TableRow
                key={row.dt}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {unixConverter(row.dt)}
                </TableCell>
                <TableCell align='right'>
                  {Math.round(row.temp.morn)}°
                </TableCell>
                <TableCell align='right'>{Math.round(row.temp.day)}°</TableCell>
                <TableCell align='right'>
                  {Math.round(row.temp.night)}°
                </TableCell>
                <TableCell align='right'>{Math.round(row.humidity)}%</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
