"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Autocomplete from "@mui/material/Autocomplete";
import { Divider } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Grid, TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import { Delete, Edit, Add, Save, Margin } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import getNormaById from "./service/normaIdService";

export default function Page({ params }) {
  const [norma, setNorma] = React.useState(null);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [isModified, setIsModified] = React.useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNorma((prevNorma) => ({
      ...prevNorma,
      [name]: value,
    }));
    setIsModified(true);
  };

  React.useEffect(() => {
    const fetchNormas = async () => {
      setLoading(true);
      try {
        const response = await getNormaById(params.id);
        setNorma(response.data);
      } catch (error) {
        console.error("Erro ao buscar normas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNormas();
  }, []);

  //console.log(params.id);

  const handleButton = () => {
    router.push("/norma");
  };

  const Campos = () => (
    <Paper style={{ textAlign: "left", padding: 10 }}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Autocomplete
            disablePortal
            name="entidade"
            disabled={isDisabled}
            onChange={handleInputChange}
            id="combo-box-demo"
            options={["ISO", "ABNT", "3"]}
            defaultValue={norma && norma.entidade ? norma.entidade.nome : null}
            renderInput={(params) => <TextField {...params} label="Entidade" />}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="codigo"
            label="Codigo"
            variant="outlined"
            disabled={isDisabled}
            fullWidth
            onChange={handleInputChange}
            value={norma && norma.codigo ? norma.codigo : null}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            label="Ano"
            variant="outlined"
            disabled={isDisabled}
            fullWidth
            onChange={handleInputChange}
            value={norma && norma.ano ? norma.ano : null}
          />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={handleInputChange}
            disabled={isDisabled}
            options={["INGLES", "PORTUGUES", "ESPANHOL"]}
            defaultValue={norma && norma.idioma ? norma.idioma : null}
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
            disabled={isDisabled}
            onChange={handleInputChange}
            value={norma && norma.titulo ? norma.titulo : null}
          />
        </Grid>
      </Grid>
      <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
        por{" "}
        {norma && norma.usuarioCriador && norma.usuarioCriador.nome
          ? norma.usuarioCriador.nome
          : "--"}{" "}
        alterado em:{" "}
        {norma && norma.dataUltimaModificacao
          ? norma.dataUltimaModificacao
          : "nunca"}
      </Typography>
    </Paper>
  );

  const ButtonsAction = () => (
    <Card sx={{ padding: 2 }}>
      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={0}>
          <IconButton
            sx={{ width: "100%", height: "100%", borderRadius: 0 }}
            aria-label="delete"
          >
            <Delete />
          </IconButton>
        </Grid>
        <Grid item xs={0}>
          <IconButton
            sx={{ width: "100%", height: "100%", borderRadius: 0 }}
            aria-label="edit"
            onClick={(e) => setIsDisabled(false)}
          >
            <Edit />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={0}>
          <IconButton
            sx={{ width: "100%", height: "100%", borderRadius: 0 }}
            aria-label="add"
          >
            <Add />
          </IconButton>
        </Grid>
        <Grid item xs={0}>
          <IconButton
            sx={{ width: "100%", height: "100%", borderRadius: 0 }}
            aria-label="save"
          >
            <Save />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            {norma && norma.codigo && norma.ano ? norma.codigo : "--"}
          </Typography>
          <br />
          {isModified && (
            <Alert severity="info">
              Você possui alterações que ainda não foram salvas.
            </Alert>
          )}

          <br />
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <Campos></Campos>
            </Grid>
            <Grid item xs={1}>
              <ButtonsAction></ButtonsAction>
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

          {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            Teste de box
          </Box> */}

          <Typography variant="h5" gutterBottom>
            Ensaios chamados por especificação / norma
          </Typography>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Typography variant="h5" gutterBottom>
            Ensaios chamados para realizar avaliação
          </Typography>

          <Button onClick={handleButton}>Voltar</Button>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
