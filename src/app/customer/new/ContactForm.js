import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ContactList from "./components/ContactList";
import EnderecoList from "./components/EnderecoList";
import ContatctDialog from "./components/NewContactDialog";
import EnderecoDialog from "./components/NewEnderecoDialog";

export default function ContactForm({
  listEndereco,
  setListEndereco,
  listContatos,
  setListContatos,
}) {
  function createDataContact(nome, cargo, email, telefone, celular) {
    return { nome, cargo, email, telefone, celular };
  }

  function createDataEndereco(cep, logradouro, numero, bairro, municipio, uf) {
    return { cep, logradouro, numero, bairro, municipio, uf };
  }

  const addNewContact = (nome, cargo, email, telefone, celular) => {
    const newRows = [createDataContact(nome, cargo, email, telefone, celular)];
    setListContatos((prevListEndereco) => [...prevListEndereco, ...newRows]);
  };

  const addNewEndereco = (cep, logradouro, numero, bairro, municipio, uf) => {
    const newRows = [
      createDataEndereco(cep, logradouro, numero, bairro, municipio, uf),
    ];
    setListEndereco((prevListEndereco) => [...prevListEndereco, ...newRows]);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Informações de contato
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <ContactList rows={listContatos} />
          <ContatctDialog addNewContact={addNewContact} />
        </Grid>
      </Grid>

      <hr></hr>

      <Typography variant="h6" gutterBottom>
        Informações de Endereço
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <EnderecoList rows={listEndereco} />
          <EnderecoDialog addNewEndereco={addNewEndereco} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
