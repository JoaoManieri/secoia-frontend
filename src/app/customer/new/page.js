"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InfoForm from "./InfoForm";
import ContactForm from "./ContactForm";
import Review from "./Review";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

const steps = ["Informações do cliente", "Informações de contato", "Revisão"];

function getStepContent(step) {
  const [dataCliente, setDataCliente] = React.useState({});
  const [listEndereco, setListEndereco] = React.useState([]);
  const [listContatos, setListContatos] = React.useState([]);

  //React.useEffect(() => {}, [listEndereco]);

  switch (step) {
    case 0:
      return (
        <InfoForm
          onDataCliente={setDataCliente}
          cliente={dataCliente}
          setListEndereco={setListEndereco}
          setListContatos={setListContatos}
        />
      );
    case 1:
      return (
        <ContactForm
          listEndereco={listEndereco}
          setListEndereco={setListEndereco}
          listContatos={listContatos}
          setListContatos={setListContatos}
        />
      );
    case 2:
      return (
        <Review
          dataCliente={dataCliente}
          listEndereco={listEndereco}
          listContatos={listContatos}
        />
      );
    case 3:
      return <CircularProgress />;
    default:
      throw new Error("Erro");
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const router = useRouter();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Cadastro
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Voltar
                </Button>
              )}

              <Button
                variant="contained"
                onClick={
                  activeStep === steps.length
                    ? router.push("/customer")
                    : handleNext
                }
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Concluir cadastro" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
