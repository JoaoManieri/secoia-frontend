import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ContactList from "./components/ContactList";
import EnderecoList from "./components/EnderecoList"
import ContatctDialog from "./components/NewContactDialog";
import EnderecoDialog from "./components/NewEnderecoDialog"

export default function ContactForm({ listEndereco, setListEndereco, listContatos, setListContatos }) {

  const [rowEndereco, setRowEndereco] = React.useState([])

  function createDataContact(nome, cargo, email) {
    return { nome, cargo, email };
  }

  function createDataEndereco( cep, logradouro, numero, bairro, municipio, uf){
    return { cep, logradouro, numero, bairro, municipio, uf }
  }

  const addNewContact = (nome, telefone, email) => {
    const newRows = [...listContatos, createDataContact(nome, telefone, email)];
    setListContatos(newRows);
  };

  const addNewEndereco = ( cep, logradouro, numero, bairro, municipio, uf ) => {
    const newEndereco = [...listEndereco, createDataEndereco(cep, logradouro, numero, bairro, municipio, uf)];
    console.log("New endereco")
    console.log(newEndereco)
    
    setRowEndereco(newEndereco);
    setListEndereco(newEndereco);
    console.log("Lista de enderecos")
    console.log(listEndereco)
  };

  React.useEffect(() => {
    listEndereco.forEach(element => {
      addNewEndereco(
        element.cep,
        element.logradouro,
        element.numero,
        element.bairro,
        element.municipio,
        element.uf
      )
    });
  },[]);

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
          <EnderecoList rows={rowEndereco} />
          <EnderecoDialog addNewEndereco={addNewEndereco} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
