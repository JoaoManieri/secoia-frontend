import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function Review({ dataCliente, listEndereco, listContatos }) {
  console.log(dataCliente);

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Cadastro de Clientes
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Razão Social:</strong> {dataCliente.nome}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Nome Fantasia:</strong> {dataCliente.fantasia}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>CNPJ:</strong> {dataCliente.cnpj}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Simples nacional:</strong> {dataCliente.statusEmpresa}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Área de Atuação:</strong> {dataCliente.atividadePrincipal}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Analisat de Conta:</strong>{" "}
            {dataCliente.analistaDaContaUsuarioId}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Gestor de Conta:</strong>{" "}
            {dataCliente.gestorDaContaUsuarioId}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Fator Competitivo:</strong> {dataCliente.fatorCompetitivo}
          </Typography>
        </Grid>
      </Grid>

      <br />
      <br />

      <Typography variant="h6" gutterBottom>
        Contatos
      </Typography>
      <Divider />
      <List disablePadding>
        {listContatos.map((contato) => (
          <ListItem key={contato.telefone} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={contato.nome} />
            <ListItemText primary={contato.cargo} />
            <ListItemText primary={contato.email} />
            <Typography variant="body2">{contato.telefone}</Typography>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" gutterBottom>
        Endereços
      </Typography>
      <Divider />
      <List disablePadding>
        {listEndereco.map((enderecos) => (
          <ListItem key={enderecos.cep} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={enderecos.cep} />
            <ListItemText primary={enderecos.logradouro} />
            <ListItemText primary={enderecos.bairro} />
            <ListItemText primary={enderecos.municipio} />
            <Typography variant="body2">{enderecos.uf}</Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
