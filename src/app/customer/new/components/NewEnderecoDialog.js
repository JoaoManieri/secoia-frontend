import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EnderecoDialog({ addNewEndereco }) {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      console.log(formData)
      console.log(formJson)
      const { cep, logradouro, numero, bairro, municipio, uf } = formJson;
      addNewEndereco(cep, logradouro, numero, bairro, municipio, uf);
      handleClose();
    };
  
    return (
      <React.Fragment>
        <Button variant="outlined" sx={{ mt: 1, mb: 1 }} onClick={handleClickOpen}>
          Novo endereço
        </Button>
        <Dialog open={open} onClose={handleClose} PaperProps={{ component: 'form', onSubmit: handleSubmit }}>
          <DialogTitle>Novo Contato</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField required id="cep" name="cep" label="cep" fullWidth variant="standard" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField required id="logradouro" name="logradouro" label="Rua" fullWidth variant="standard" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField required id="numero" name="numero" label="Numero" fullWidth variant="standard" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField required id="bairro" name="bairro" label="Bairro" fullWidth variant="standard" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField required id="municipio" name="municipio" label="Cidade" fullWidth variant="standard" />
              </Grid>
              <Grid item xs={12}>
                <TextField required id="uf" name="uf" label="Estado" fullWidth variant="standard" />
              </Grid>
              <Grid item xs={12}>
                <TextField required id="pais" name="Pais" label="Pais" fullWidth variant="standard" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
  