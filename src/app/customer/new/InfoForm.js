import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import clienteInstance from "@/helper/axios-instance";

export default function InfoForm({ onDataCliente, cliente }) {

  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChangeCNPJ = (event) => {
    const cnpj = event.target.value;
    setClientData({...clientData, cnpj});
  };
  
  useEffect(() => {
    setClientData(cliente)
  }, [])

  useEffect(() => {
    if (clientData !== null) {
      onDataCliente(clientData)
    }
  },[clientData])

  const handleBlurCNPJ = async (event) => {
    const cnpj = event.target.value;
    setClientData({...clientData, cnpj});
    setLoading(true);
    try {
      const response = await clienteInstance.get(`externo/busca/${cnpj}`);   
      setClientData(prevState => ({...prevState, ...response.data}));
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Informações do cliente
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            type="text"
            required
            id="fantasia"
            name="fantasia"
            label="Nome fantasia"
            fullWidth
            autoComplete="nome pelo qual conhecemos ex. McDonnald's"
            variant="standard"
            value={clientData ? clientData.fantasia : ""}
            onChange={(e) => setClientData({...clientData, fantasia: e.target.value})}
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
            autoComplete="Nome de registro ex Arcos Dourados"
            variant="standard"
            value={clientData ? clientData.nome : ""}
            onChange={(e) => setClientData({...clientData, nome: e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="cnpj"
            name="cnpj"
            label="CNPJ"
            fullWidth
            autoComplete="cnpj"
            variant="standard"
            onChange={handleChangeCNPJ}
            onBlur={handleBlurCNPJ}
            value={clientData ? clientData.cnpj : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="simplesNacional"
            name="simpesNacional"
            label="Simples nacional ativo"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            value={clientData ? clientData.simplesNacional : ""}
            onChange={(e) => setClientData({...clientData, simplesNacional: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Área de atuação"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={clientData ? clientData.atividadePrincipal : ""}
            onChange={(e) => setClientData({...clientData, atividadePrincipal: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="situacao"
            name="situacao"
            label="Status da empresa"
            fullWidth
            variant="standard"
            value={clientData ? clientData.situacao : ""}
            onChange={(e) => setClientData({...clientData, situacao: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="zip"
            name="zip"
            label="gestor da conta"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="country"
            name="country"
            label="Analista da conta"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="country"
            name="country"
            label="Fator competitivo"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
