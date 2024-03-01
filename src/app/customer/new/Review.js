import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";


export default function Review({ dataCliente, listEndereco, listContatos }) {
  console.log(dataCliente);

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Confirmação cadastro de Clientes
      </Typography>
      <br />

      <Grid container spacing={3}>
        <Grid item xs={12} >
          <Typography variant="body1">
            <TextField id="standard-basic" label="Razão Social:" variant="standard" fullWidth  defaultValue={dataCliente.nome}/>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">
            <TextField id="standard-basic" label="Nome Fantasia:" variant="standard" fullWidth  defaultValue={dataCliente.fantasia}/>
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="body1">
            <TextField id="standard-basic" label="CNPJ" variant="standard" fullWidth defaultValue={dataCliente.cnpj}/>
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="body1">
        <Autocomplete
            id="clear-on-escape"
            defaultValue={dataCliente.simplesNacionalAtivo}
            clearOnEscape
            options={["Ativo","Inativo"]}
            renderInput={(params) => (
            <TextField {...params} label="Simples nacional ativo" variant="standard" />
        )}
      />
          

          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
          <TextField id="standard-basic" label="Área de Atuação:" variant="standard"  fullWidth defaultValue={dataCliente.atividadePrincipal}/>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <Autocomplete
              id="clear-on-escape"
              defaultValue={dataCliente.analistaDaContaUsuarioId}
              clearOnEscape
              options={[
                "Peter Parker",
                "Clark Kent",
                "Bruce Wayne",
                "Diana Prince",
                "Barry Allen",
                "Tony Stark ",
                "DavSteve Rogers",
              ]}
            renderInput={(params) => (
            <TextField {...params} label="Simples nacional ativo" variant="standard" />
              )}
          />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
          <Autocomplete
            id="clear-on-escape"
            defaultValue={dataCliente.gestorDaContaUsuarioId}
            clearOnEscape
            options={[
              "Peter Parker",
              "Clark Kent",
              "Bruce Wayne",
              "Diana Prince",
              "Barry Allen",
              "Tony Stark ",
              "DavSteve Rogers",
            ]}
            renderInput={(params) => (
            <TextField {...params} label="Simples nacional ativo" variant="standard" />
              )}
            />
        
          </Typography>
        </Grid>
        <Grid item xs={6}>
        <Autocomplete
            id="clear-on-escape"
            defaultValue={dataCliente.statusEmpresa}
            clearOnEscape
            options={["Sim", "Não"]}
            renderInput={(params) => (
            <TextField {...params} label="Simples nacional ativo?" fullWidth variant="standard" />
        )}
      />
      </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            <TextField id="standard-basic" label="Fator Competitivo:"  fullWidth variant="standard"  defaultValue= {dataCliente.fatorCompetitivo}/>
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
            <Typography variant="h6" gutterBottom>
        Contatos
      </Typography>
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
