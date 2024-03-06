import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography, Box, Paper } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Autocomplete from "@mui/material/Autocomplete";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import UploadInstance from "@/helper/axios-upload"

// Registra os plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


function NovaNormaDialog() {
  //const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [open, setOpen] = useState(false);

  // React.useEffect(() => {
  //   console.log(file);
  // }, [file]);

  // const filePondConfig = {
  //   allowMultiple: false,
  //   acceptedFileTypes: ['.pdf'],
  //   labelIdle: "Arraste e solte seu PDF aqui ou <span class='filepond--label-action'>escolha um arquivo</span>",
  //   server: {
  //     url: 'http://localhost:8080/files/upload/norma',
  //     process: {
  //       method: 'POST',
  //       headers: {
  //         Authorization: 'Bearer SEU_TOKEN',
  //       },
  //       onload: (response) => console.log('Arquivo enviado com sucesso:', response),
  //       onerror: (response) => console.error('Erro ao enviar arquivo:', response)
  //     }
  //   },
  //   onprocessfiles: (error, fileItems) => {
  //     if (error) {
  //       console.error('Erro ao processar arquivos:', error);
  //       return;
  //     }

  //     console.log('Arquivos processados:', fileItems);
  //     setFile(fileItems[0].file);
  //   },

  //   onremovefile: () => {
  //     setFile(null);
  //   },
  // };
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log(files==null)
    const formData = new FormData();
    formData.append("file", files[0]);

    UploadInstance.post("", formData)
      .then((response) => {
        console.log("Arquivo enviado com sucesso:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao enviar arquivo:", error);
      });
  };

  return (
    <div>
      <Button variant="contained" endIcon={<AddCircleOutlineIcon />} onClick={handleOpen}>
        Nova Norma
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><Typography variant="h4">Nova norma</Typography></DialogTitle>
        <DialogContent>
          <Grid sx={{borderTop:10}} container spacing={3}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                disablePortal
                name="entidade"
                id="combo-box-demo"
                options={["ISO", "ABNT", "3"]}
                renderInput={(params) => <TextField {...params} label="Entidade" />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="codigo"
                name="codigo"
                label="Codigo"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="ano"
                name="ano"
                label="Ano"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={["INGLES", "PORTUGUES", "ESPANHOL"]}
                renderInput={(params) => <TextField {...params} label="Idiomas" />}
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Titulo"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Box sx={{ p: 4 }}>
            <Typography variant="h5">Enviar Norma PDF</Typography>
            <Box sx={{ mt: 2 }}>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              maxFiles={1}
              server={{
                url: 'http://localhost:8080',
                process: {
                  url: '/upload/norma',
                  method: 'POST',
                  withCredentials: false,
                  headers: {},
                  timeout: 7000,
                  onload: (response) => {
                    const res = JSON.parse(response);
                    console.log('URI do arquivo:', res);
                  },
                  onerror: (response) => {
                    console.error('Erro no upload:', response);
                  }
                }
              }}
              onprocessfileabort={(file) => {
                console.log(`Upload cancelado: ${file.filename}`);
                // Aqui você pode adicionar o código para lidar com o cancelamento do upload
              }}
              name="file"
              labelIdle='Arraste & Solte seus arquivos ou <span class="filepond--label-action">Navegue</span>'
            />
            </Box>
            {/* {files && (
              <Paper sx={{ mt: 2, p: 2 }}>
                <Typography variant="body1">Norma selecionado:</Typography>
                <Typography variant="body2">{files.name}</Typography>
                <br />
                <Button variant="outlined" href={file.url}>
                  Visualizar PDF
                </Button>
              </Paper>
            )} */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant='contained' onClick={handleSave}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NovaNormaDialog;
