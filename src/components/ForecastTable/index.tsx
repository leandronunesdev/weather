import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const ForecastTable = ({ rows }: any) => {
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
                  {row.dt}
                </TableCell>
                <TableCell align='right'>{row.temp.morn}</TableCell>
                <TableCell align='right'>{row.temp.day}</TableCell>
                <TableCell align='right'>{row.temp.night}</TableCell>
                <TableCell align='right'>{row.humidity}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
