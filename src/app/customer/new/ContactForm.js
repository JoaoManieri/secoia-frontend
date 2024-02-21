import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ContactList from "./components/ContactList";
import EnderecoList from "./components/EnderecoList"
import ContatctDialog from "./components/NewContactDialog";
import EnderecoDialog from "./components/NewEnderecoDialog"

export default function ContactForm({ listEndereco, setListEndereco, listContatos, setListContatos }) {

  function createDataContact(nome, cargo, email) {
    return { nome, cargo, email };
  }

  function createDataEndereco( cep, logradouro, numero, bairro, municipio, uf){
    return { cep, logradouro, numero, bairro, municipio, uf }
  }

  const addNewContact = (nome, telefone, email) => {
    const newRows = [...listEndereco, createDataContact(nome, telefone, email)];
    setListEndereco(newRows);
  };

  const addNewEndereco = ( cep, logradouro, numero, bairro, municipio, uf ) => {
    const newEndereco = [...listContatos, createDataEndereco(cep, logradouro, numero, bairro, municipio, uf)];
    setListContatos(newEndereco);
  };


  // React.useEffect(() => {
  //   if (cliente 
  //     && cliente.nome !== null
  //     && cliente.email !== null 
  //     && cliente.telefone !== null) {
  //     setListEndereco([
  //       ...listEndereco,
  //       createDataContact(cliente.nome, cliente.telefone, cliente.email),
  //     ]);
  //   }
  // }, [listEndereco]);

  // React.useEffect(() => {
  //   if (cliente 
  //     && cliente.cep !== null 
  //     && cliente.logradouro !== null 
  //     && cliente.numero !== null 
  //     && cliente.bairro !== null 
  //     && cliente.municipio !== null 
  //     && cliente.uf !== null) {
  //     setListContatos([
  //       ...listContatos,
  //       createDataEndereco(cliente.cep,  cliente.logradouro, cliente.numero, cliente.bairro, cliente.municipio, cliente.uf),
  //     ]);
  //   }
  // }, [listContatos]);



  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Informações de contato
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <ContactList rows={listEndereco} />
          <ContatctDialog addNewContact={addNewContact} />
        </Grid>
      </Grid>
      
      <hr></hr>

      <Typography variant="h6" gutterBottom>
        Informações de Endereço
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <EnderecoList rows={listContatos} />
          <EnderecoDialog addNewEndereco={addNewEndereco} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
