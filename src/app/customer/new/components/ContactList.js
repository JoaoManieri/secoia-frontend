import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import ContatctDialog from "./DialogEdit";




export default function ContactList({ rows }) {
  const [open, setOpen] = React.useState(false);


  return (
    <TableContainer component={Paper} sx={{ padding: '10px' }} >
     
      <Table size="small" stickyHeader aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Nome</strong></TableCell>
            <TableCell align="right"><strong>Telefone</strong></TableCell>
            <TableCell align="right"><strong>e-mail</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              hover 
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border:  0} }}
              onClick={() => setOpen(true)}
              >
              <ContatctDialog open={open} setOpen={setOpen}row={row}/>
              <TableCell component="th" scope="row">{row.nome}</TableCell>
              <TableCell align="right">{row.telefone}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}