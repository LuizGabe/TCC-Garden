import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import OpacityIcon from '@mui/icons-material/Opacity';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import { getData } from './services/api';

export const App = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    getData()
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);
  
  const { umidadeAr, umidadeSolo, temperatura } = data || { umidadeAr: 0, umidadeSolo: 0, temperatura: 0 };

  return (
    <div style={{ padding: 20, display: 'flex', alignItems: 'center', height: '100vh' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ padding: 20, backgroundColor: '#E57373', color: '#FFF' }}>
            <OpacityIcon fontSize="large" />
            <Typography variant="h4">{umidadeSolo}%</Typography>
            <Typography variant="subtitle1">Umidade do Solo</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ padding: 20, backgroundColor: '#64B5F6', color: '#FFF' }}>
            <ThermostatIcon fontSize="large" />
            <Typography variant="h4">{temperatura}°C</Typography>
            <Typography variant="subtitle1">Temperatura</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ padding: 20, backgroundColor: '#81C784', color: '#FFF' }}>
            <AirIcon fontSize="large" />
            <Typography variant="h4">{umidadeAr}%</Typography>
            <Typography variant="subtitle1">Umidade do Ar</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
