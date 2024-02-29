import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import CachedIcon from '@mui/icons-material/Cached';
import {
  Card,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  SvgIcon,
  TextField,
  Tooltip
} from '@mui/material';
import { useState } from 'react';

type SensorSearchType = {
  searchReturn: (sensorSearch: string, selectedVoltage: string) => void;
};

export const CustomerSearch = ({ searchReturn }: SensorSearchType) => {
  const [sensorSearch, setSensorSearch] = useState('');
  const [selectedVoltage, setSelectedVoltage] = useState('todos');

  function handleResetValues() {
    setSensorSearch('');
    searchReturn('', 'todos');
  }

  function handleSearchUid(value: string) {
    setSensorSearch(value);
    searchReturn(value, selectedVoltage);
  }

  function handleSelectVoltage(valueSelected: string) {
    setSelectedVoltage(valueSelected);
    searchReturn(sensorSearch, valueSelected);
  }

  return (
    <Card sx={{ p: 2 }} elevation={2}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <OutlinedInput
            value={sensorSearch}
            onChange={e => handleSearchUid(e.target.value)}
            fullWidth
            placeholder="Modelo/Conector"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{
              maxWidth: 500,
              height: 56,
              color: sensorSearch === '' ? 'GrayText' : 'InfoText'
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            id="outlined-select-currency"
            select
            label="Tensão do Sensor"
            value={selectedVoltage}
            onChange={event => handleSelectVoltage(event.target.value)}
            fullWidth
            sx={{ height: 56 }}
          >
            <MenuItem value={'todos'}>Todos</MenuItem>
            <MenuItem value={'12V'}>12V</MenuItem>
            <MenuItem value={'24V'}>24V</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={1}>
          <Tooltip title="Resetar Filtros">
            <IconButton
              size="large"
              sx={{ color: 'black' }}
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