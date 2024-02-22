import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import clienteInstance from "@/helper/axios-instance";
import Autocomplete from "@mui/material/Autocomplete";
import top100Films from "./Users";

export default function InfoForm({
  onDataCliente,
  cliente,
  setListEndereco,
  setListContatos,
}) {
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChangeCNPJ = (event) => {
    const cnpj = event.target.value;
    setClientData({ ...clientData, cnpj });
  };

  useEffect(() => {
    setClientData(cliente);
  }, []);

  useEffect(() => {
    if (clientData !== null) {
      onDataCliente(clientData);
    }
  }, [clientData]);

  function createDataEndereco(cep, logradouro, numero, bairro, municipio, uf) {
    return { cep, logradouro, numero, bairro, municipio, uf };
  }

  function createDataContact(nome, cargo, email, telefone) {
    return { nome, cargo, email, telefone };
  }

  const handleBlurCNPJ = async (event) => {
    const cnpj = event.target.value;
    setClientData({ ...clientData, cnpj });
    setLoading(true);
    try {
      const response = await clienteInstance.get(`externo/busca/${cnpj}`);

      const enderecoDefault = [
        createDataEndereco(
          response.data.cep,
          response.data.logradouro,
          response.data.numero,
          response.data.bairro,
          response.data.municipio,
          response.data.uf
        ),
      ];

      const contatoDefault = [
        createDataContact(
          response.data.nome,
          response.data.cargo,
          response.data.email,
          response.data.telefone
        ),
      ];
      setListEndereco(enderecoDefault);
      setListContatos(contatoDefault);
      console.log(response.data);
      setClientData((prevState) => ({ ...prevState, ...response.data }));
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Informações do cliente
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="cnpj"
            name="cnpj"
            label="CNPJ"
            fullWidth
            autoComplete="cnpj"
            variant="outlined"
            onChange={handleChangeCNPJ}
            onBlur={handleBlurCNPJ}
            value={clientData ? clientData.cnpj : ""}
          />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                required
                id="fantasia"
                name="fantasia"
                label="Nome fantasia"
                fullWidth
                margin="normal"
                autoComplete="nome pelo qual conhecemos ex. McDonnald's"
                variant="outlined"
                value={clientData ? clientData.fantasia : ""}
                onChange={(e) =>
                  setClientData({ ...clientData, fantasia: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                required
                id="nome"
                name="nome"
                label="Razão social"
                fullWidth
                margin="normal"
                autoComplete="Nome de registro ex Arcos Dourados"
                variant="outlined"
                value={clientData ? clientData.nome : ""}
                onChange={(e) =>
                  setClientData({ ...clientData, nome: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="atividadePrincipal"
            name="atividadePrincipal"
            label="Área de atuação"
            fullWidth
            variant="outlined"
            value={clientData ? clientData.atividadePrincipal : ""}
            onChange={(e) =>
              setClientData({
                ...clientData,
                atividadePrincipal: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={["Sim", "Não"]}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Simples nacional ativo?" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={["Ativo", "Inativo"]}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Satus da empresa" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Autocomplete
            fullWidth
            id="grouped-demo"
            options={options.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} label="Gestor da conta" />
            )}
            renderGroup={(params) => (
              <li key={params.key}>
                <Typography variant="h5" gutterBottom>
                  {params.group}
                </Typography>
                <div>{params.children}</div>
              </li>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Autocomplete
            fullWidth
            id="grouped-demo"
            options={options.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} label="Analista da conta" />
            )}
            renderGroup={(params) => (
              <li key={params.key}>
                <Typography variant="h5" gutterBottom>
                  {params.group}
                </Typography>
                <div>{params.children}</div>
              </li>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="fatorCompetitivo"
            name="fatorCompetitivo"
            label="Fator competitivo"
            fullWidth
            multiline
            maxRows={2}
            variant="outlined"
            value={clientData ? clientData.fatorCompetitivo : ""}
            onChange={(e) =>
              setClientData({ ...clientData, fatorCompetitivo: e.target.value })
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
