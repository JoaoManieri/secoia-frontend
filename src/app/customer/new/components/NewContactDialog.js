import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function ContactDialog({ addNewContact }) {
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
      const { nome, cargo, email } = formJson;
      addNewContact(nome, cargo, email);
      handleClose();
    };
  
    return (
      <React.Fragment>
        <Button variant="outlined" sx={{ mt: 1, mb: 1 }} onClick={handleClickOpen}>
          Novo contato
        </Button>
        <Dialog open={open} onClose={handleClose} PaperProps={{ component: 'form', onSubmit: handleSubmit }}>
          <DialogTitle>Novo Contato</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField required id="nome" name="nome" label="Nome" fullWidth variant="standard" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField required id="cargo" name="cargo" label="Cargo" fullWidth variant="standard" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField required id="telefone" name="telefone" label="Telefone" fullWidth variant="standard" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField required id="celular" name="celular" label="Celular" fullWidth variant="standard" />
              </Grid>
              <Grid item xs={12}>
                <TextField required id="email" name="email" label="Email" fullWidth variant="standard" />
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
  