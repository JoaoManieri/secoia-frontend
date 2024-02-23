import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title.js';

// Generate Order Data
function createData(id, date, name, valorDoOrcamento, tipoDeProcedimento, amount) {
  return { id, date, name, valorDoOrcamento, tipoDeProcedimento, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2023',
    'Elvis Presley',
    'R$ 200,00',
    'Teste em metal',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2023',
    'Paul McCartney',
    'R$ 200,00',
    'Teste em metal',
    866.99,
  ),
  createData(
    2, 
    '16 Mar, 2019', 
    'Tom Scholz', 
    'R$ 200,00',
    'Teste em metal',
     100.81
     ),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'R$ 200,00',
    'Teste em metal',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'R$ 200,00',
    'Teste em metal',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Orcamentos recentes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Valor do orcamento</TableCell>
            <TableCell>Tipo de procedimento</TableCell>
            <TableCell align="right">Valor final</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.valorDoOrcamento}</TableCell>
              <TableCell>{row.tipoDeProcedimento}</TableCell>
              <TableCell align="right">{`R$ ${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Mais orcamentos
      </Link>
    </React.Fragment>
  );
}