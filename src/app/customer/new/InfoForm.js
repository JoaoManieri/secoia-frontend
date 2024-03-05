import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import clienteInstance from "@/helper/axios-instance";
import Autocomplete from "@mui/material/Autocomplete";
import top100Films from "./Users";
import InputMask from "react-input-mask"
import { cnpj as validateCnpj } from 'cpf-cnpj-validator'; 
import EnableState from "@/util/enumVerificacao"

export default function InfoForm({
  setStatusBtn,
  onDataCliente,
  cliente,
  setListEndereco,
  setListContatos,
}) {
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { cnpj, formState: { errors } } = useForm();


 

 //
  const [campos, setCampos] = useState({
      Nomefantazia: false,
      razaoSocial: false,
      areaAtuacao: false,
      cnpj: false,
      firstStatus: true
  });
  

  const handleChangeCNPJ = (event) => {
    const cnpj = event.target.value;
    setClientData({ ...clientData, cnpj });
  };
  
  const validaBtn = (event) => {
    if(campos.Nomefantazia == false && campos.razaoSocial ==false && campos.areaAtuacao==false && campos.cnpj==false && campos.firstStatus == false){
     
      setStatusBtn(EnableState.ENABLED)
    }
    else{
      setStatusBtn(EnableState.DISABLED)
      
    }
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

  function createDataContact(nome, cargo, email, telefone, celular) {
    return { nome, cargo, email, telefone, celular };
  }

  const handleBlurCampoVazio = (event) => {
    setCampos(prevState => ({...prevState,firstStatus: false}))
    validaBtn()
    const valorCampo = event.target.value.trim();
    if (valorCampo === "") {
      validaBtn()
      return true
    } else {
      validaBtn()
      return false
    }
  };

  useEffect(() => {
    setStatusBtn(EnableState.DISABLED)
  }, []);



  const handleBlurCNPJ = async (event) => {
   // setCampos(prevState => ({...prevState,firstStatus: false}))
    const meuCnpj = event.target.value.replace(/\D/g, '');
    const cnpjValido = validateCnpj.isValid(meuCnpj);
    setCampos((prevState) => ({ ...prevState, cnpj: !cnpjValido }));
    validaBtn();

    const save_cnpj = event.target.value

    setClientData({ ...clientData, save_cnpj });
    setLoading(true);
    try {
      const response = await clienteInstance.get(`externo/busca/${meuCnpj}`);

      const enderecoDefault = [
        createDataEndereco(
          response.data.cep ?? 'CEP não informado',
          response.data.logradouro ?? 'Logradouro não informado',
          response.data.numero ?? 'Número não informado',
          response.data.bairro ?? 'Bairro não informado',
          response.data.municipio ?? 'Município não informado',
          response.data.uf ?? 'UF não informada'
        ),
      ];
      
      const contatoDefault = [
        createDataContact(
          response.data.nome ?? 'Nome não informado',
          response.data.cargo ?? 'Cargo não informado',
          response.data.email ?? 'Email não informado',
          response.data.telefone ?? 'Telefone não informado',
          response.data.celular ?? 'Celular não informado'
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
    const firstLetter = option[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  useEffect(() => {
    validaBtn();
   
  }, [campos, clientData]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Informações do cliente
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12}>
      <InputMask
            mask="99.999.999/9999-99"
            maskChar=" "
            onChange={(event) => setClientData({ ...clientData, cnpj: event.target.value })}
            onBlur={handleBlurCNPJ}
            value={clientData ? clientData.cnpj : "12.095.067/0001-36"}
          >
            {() => (
              <TextField
              
                required
                id="cnpj"
                name="cnpj"
                label="CNPJ"
                fullWidth
                autoComplete="cnpj"
                variant="outlined"
                error={campos.cnpj}
                helperText={errors.cnpj}
              />
            )}
          </InputMask>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={campos.Nomefantazia}
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
                
                onBlur={(e) =>  setCampos(prevState => ({...prevState,Nomefantazia: handleBlurCampoVazio(e)}))}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                error={campos.razaoSocial}
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
                onBlur={(e) =>  setCampos(prevState => ({...prevState,razaoSocial: handleBlurCampoVazio(e)}))}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
          error={campos.areaAtuacao}
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
            onBlur={(e) =>  setCampos(prevState => ({...prevState,areaAtuacao: handleBlurCampoVazio(e)}))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={["Sim", "Não"]}
            fullWidth
            onChange={(e, value) => {
              setClientData({ ...clientData, simplesNacionalAtivo: value });
            }}
            value={
              clientData && clientData.simplesNacionalAtivo
                ? clientData.simplesNacionalAtivo
                : null
            }
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
            value={
              clientData && clientData.statusEmpresa
                ? clientData.statusEmpresa
                : null
            }
            onChange={(e, value) => {
              setClientData({ ...clientData, statusEmpresa: value });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Status da empresa" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[
              "Peter Parker",
              "Clark Kent",
              "Bruce Wayne",
              "Diana Prince",
              "Barry Allen",
              "Tony Stark ",
              "DavSteve Rogers",
            ]}
            fullWidth
            value={
              clientData && clientData.analistaDaContaUsuarioId
                ? clientData.analistaDaContaUsuarioId
                : null
            }
            onChange={(e, value) => {
              setClientData({ ...clientData, analistaDaContaUsuarioId: value });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Analista da conta" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[
              "Peter Parker",
              "Clark Kent",
              "Bruce Wayne",
              "Diana Prince",
              "Barry Allen",
              "Tony Stark ",
              "Steve Rogers",
            ]}
            fullWidth
            value={
              clientData && clientData.gestorDaContaUsuarioId
                ? clientData.gestorDaContaUsuarioId
                : null
            }
            onChange={(e, value) => {
              setClientData({ ...clientData, gestorDaContaUsuarioId: value });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Gestor da conta" />
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
