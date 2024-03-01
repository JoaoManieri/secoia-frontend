"use client";

import React from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
} from "@mui/material";
import Fuse from "fuse.js";
import { getNormas } from "./services/normasService";
import BuscaNorma from "./services/barraPesquisaNorma";

const columns = [
  { id: "entidade", label: "Entidade", minWidth: 170 },
  { id: "codigo", label: "Código", minWidth: 100 },
  { id: "idioma", label: "Idioma", minWidth: 170, align: "right" },
  { id: "ano", label: "Ano", minWidth: 170, align: "right" },
  { id: "icone", label: "", minWidth: 170, align: "right" },
];

const NormasTable = ({ normas, onNormaClick }) => (
  <TableContainer sx={{ maxHeight: 440 }}>
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {normas.map((norma) => (
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={norma.id}
            onClick={() => onNormaClick(norma)}
          >
            {columns.map((column) => {
              const value = norma[column.id];
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

const handleNormaClick = (norma) => {
  console.log("Clicou na norma:", norma);
};

export const RootLayout = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [normas, setNormas] = React.useState([]);
  const [todasNormas, setTodasNormas] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fuseOptions = {
    keys: ["modelo", "connector"],
    threshold: 0.5,
    ignoreLocation: true,
  };

  function selectableFieldsFilter(entidade) {
    const entidadeRecebida = entidade === "todos" ? undefined : entidade;

    return todasNormas.filter((norma) => {
      return (
        entidadeRecebida === undefined || norma.entidade === entidadeRecebida
      );
    });
  }

  const fuse = new Fuse(normas, fuseOptions);

  const handleSearch = (normaEncontrada, entidade) => {
    if (normaEncontrada === "" && entidade === "todos") {
      setNormas(todasNormas);
      return;
    }

    const filtroDeNorma = selectableFieldsFilter(entidade);

    if (normaEncontrada.length > 0) {
      fuse.setCollection(filtroDeNorma);
      const results = fuse.search(normaEncontrada);
      const items = results.map((result) => result.item);
      setNormas(items);
    } else {
      setNormas(filtroDeNorma);
    }
  };

  React.useEffect(() => {
    const fetchNormas = async () => {
      setLoading(true);
      try {
        const normasData = await getNormas();
        setNormas(normasData);
      } catch (error) {
        console.error("Erro ao buscar normas:", error);
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
      <BuscaNorma retronoBusca={handleSearch} />
      <br />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {loading ? (
          <p>Carregando normas...</p>
        ) : (
          <NormasTable
            normas={normas.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
            onNormaClick={handleNormaClick}
          />
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
