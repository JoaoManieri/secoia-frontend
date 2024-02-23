import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import clienteInstance from "@/helper/axios-instance";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";


export default function EnvioFormulario({ dataCliente, listEndereco, listContatos }) {
    const router = useRouter();

    const converterListaDeEnderecosParaJson = () => {
        return listEndereco.map(endereco => ({
          cep: endereco.cep,
          rua: endereco.logradouro,
          numero: endereco.numero,
          bairro: endereco.bairro,
          cidade: endereco.municipio,
          estado: endereco.uf,
          complemento: endereco.complemento || ""
        }));
      }
    function escape () {
        router.push('/customer')
        router.query= {"flag":"sucess"}
    }

    const enviaDados = async () => {
        console.log("enviando dados")
        try {
            const response = await clienteInstance.post(`cliente`, {
                "nomeFantasia": dataCliente.fantasia,
                "nomeReal": dataCliente.nome,
                "cnpj": dataCliente.cnpj,
                "simplesNacionalAtivo": true,
                "ramoDeAtividade": dataCliente.atividadePrincipal,
                "listaDeEnderecos": converterListaDeEnderecosParaJson(),
                "listaDeContatos": listContatos,
                "usuarioCriadorId": 0,
                "fatorCompetitivo": dataCliente.fatorCompetitivo,
                "gestorDaContaUsuarioId": 0,
                "analistaDaContaUsuarioId": 0
            });
            escape()
            
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        }
    }

    React.useEffect(() => {
        enviaDados()
    }, [])


    console.log(dataCliente);
    console.log(listEndereco);
    console.log(listContatos);

    return (
      <React.Fragment>
        <Typography variant="h5" gutterBottom>
          Cadastro de Clientes
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress size={150} thickness={5} color="primary" />
            <Typography variant="h6" style={{ marginTop: 20 }}>
            Carregando...
            </Typography>
        </div>
        <Button onClick={escape}>Escape</Button>
      </React.Fragment>
    );
  }