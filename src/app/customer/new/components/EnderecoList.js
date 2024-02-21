import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function EnderecoList({ rows }) {

  return (
    <TableContainer component={Paper} sx={{ padding: '10px' }} >
      <Table size="small" stickyHeader aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Cep</strong></TableCell>
            <TableCell align="right"><strong>Rua</strong></TableCell>
            <TableCell align="right"><strong>Número</strong></TableCell>
            <TableCell align="right"><strong>Bairro</strong></TableCell>
            <TableCell align="right"><strong>Cidade</strong></TableCell>
            <TableCell align="right"><strong>Estado</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              hover 
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"> {row.cep} </TableCell>
              <TableCell align="right">{row.logradouro}</TableCell>
              <TableCell align="right">{row.numero}</TableCell>
              <TableCell align="right">{row.bairro}</TableCell>
              <TableCell align="right">{row.municipio}</TableCell>
              <TableCell align="right">{row.uf}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}