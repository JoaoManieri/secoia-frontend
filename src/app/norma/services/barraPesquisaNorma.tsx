// import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import CachedIcon from "@mui/icons-material/Cached";
import {
  Card,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  SvgIcon,
  TextField,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

type TipoBuscaNormas = {
  retronoBusca: (buscaNorma: string, entidade: string) => void;
  entidadesUnicas: string[];
};

const BuscaNorma = ({
  retronoBusca: retornoBusca,
  entidadesUnicas,
}: TipoBuscaNormas) => {
  const [buscaNorma, setBuscaNorma] = useState("");
  const [entidadeSelecionada, setEntidadeSelecionada] = useState("todos");

  function handleResetValues() {
    setBuscaNorma("");
    retornoBusca("", "todos");
  }

  function handleBusca(value: string) {
    setBuscaNorma(value);
    retornoBusca(value, entidadeSelecionada);
  }

  function handleEntidadeSelecionada(valueSelected: string) {
    setEntidadeSelecionada(valueSelected);
    retornoBusca(buscaNorma, valueSelected);
  }

  return (
    <Card sx={{ p: 2 }} elevation={2}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <OutlinedInput
            value={buscaNorma}
            onChange={(e) => handleBusca(e.target.value)}
            fullWidth
            placeholder="Codigo / Idioma / Ano"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{
              maxWidth: 500,
              height: 56,
              color: buscaNorma === "" ? "GrayText" : "InfoText",
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            id="outlined-select-currency"
            select
            label="Tensão do Sensor"
            value={entidadeSelecionada}
            onChange={(event) => handleEntidadeSelecionada(event.target.value)}
            fullWidth
            sx={{ height: 56 }}
          >
            <MenuItem value={"todos"}>Todos</MenuItem>
            {entidadesUnicas.map((entidade) => (
              <MenuItem key={entidade} value={entidade}>
                {entidade}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={1}>
          <Tooltip title="Resetar Filtros">
            <IconButton
              size="large"
              sx={{ color: "black" }}
              onClick={() => handleResetValues()}
            >
              <CachedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Card>
  );
};

export default BuscaNorma;
