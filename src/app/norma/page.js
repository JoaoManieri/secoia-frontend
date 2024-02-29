'use client'

import React from 'react';
import { Paper, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, TablePagination } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { getNormas } from './services/normasService'; 


const columns = [
  { id: 'entidade', label: 'Entidade', minWidth: 170 },
  { id: 'codigo', label: 'Código', minWidth: 100 },
  { id: 'idioma', label: 'Idioma', minWidth: 170, align: 'right' },
  { id: 'ano', label: 'Ano', minWidth: 170, align: 'right' },
  { id: 'icone',label: '',minWidth: 170,align: 'right'},
];


const NormasTable = ({ normas }) => (
  <TableContainer sx={{ maxHeight: 440 }}>
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {normas.map((row) => (
          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
            {columns.map((column) => {
              const value = row[column.id];
              return (
                <TableCell key={column.id} align={column.align}>
                  {value}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const RootLayout = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [normas, setNormas] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchNormas = async () => {
      setLoading(true);
      try {
        const normasData = await getNormas();
        setNormas(normasData);
      } catch (error) {
        console.error('Erro ao buscar normas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNormas();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>
      <h1>Normas</h1>
      <br />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {loading ? (
          <p>Carregando normas...</p>
        ) : (
          <NormasTable normas={normas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} />
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={normas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  );
};

export default RootLayout;
