"use client";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { CustomerSearch } from "./customersearch";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import clienteInstance from "@/helper/axios-instance";


const columns = [
  { id: "nomeFantasia", label: "Nome", minWidth: 170 },
  {
    id: "cnpj",
    label: "CNPJ",
    minWidth: 170,
    align: "right",
  }
  // {
  //   id: "size",
  //   label: "Size\u00a0(km\u00b2)",
  //   minWidth: 170,
  //   align: "right",
  //   format: (value) => value.toLocaleString("en-US"),
  // },
  // {
  //   id: "density",
  //   label: "Density",
  //   minWidth: 170,
  //   align: "right",
  //   format: (value) => value.toFixed(2),
  // },
];


export default function RootLayout({ children }) {
  const router = useRouter();
  const [clientes, setClientes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const getClientes = async () => {
    console.log("Entrou")
    setLoading(true);
    try {
      const response = await clienteInstance.get(`cliente`);
      console.log(response.data)
      setClientes(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getClientes();
  }, []);
  
  if (router.query) {
    if(router.query.flag === "sucess"){
      //toast.success('Cliente cadastrado!')
    }
  }

  const [open, setOpen] = React.useState(true);

  function setFragment(route) {
    router.push(route);
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <React.Fragment>
      <h1>Lista de clientes</h1>
      {/* <CustomerSearch /> */}
      <br />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
            {clientes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.cnpj} // Assuming "cnpj" is unique
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={clientes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Button
        variant="contained"
        sx={{ mt: 2,backgroundColor:"#004AAD" }}
        onClick={() => setFragment("/customer/new")}
      >
        + novo cliente
      </Button>
      {/* <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        /><ToastContainer /> */}
    </React.Fragment>
  );
}
