//console.log(import.meta.env.VITE_API_KEY);
//instalar npm express mongoose nodemon aparte
//instalar npm install para el node modules
//hacer la carpeta ".env.local" para poner la api key "  VITE_API_KEY="fea9d169b741475f83790017241006"  "

import { LoadingButton } from "@mui/lab";
import { Container, Box, TextField, Typography } from "@mui/material";
import { useState } from "react";

const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${
  import.meta.env.VITE_API_KEY
}&lang=es&q=`;

export default function App() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temperature: "",
    condition: "",
    icon: "",
    conditionText: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({
      error: false,
      message: "",
    });
    try {
      if (!city.trim()) throw { message: "El campo ciudad es obligatorio" };

      const response = await fetch(`${API_WEATHER}${city}`);
      const data = await response.json();

      if (data.error) throw { message: data.error.message };

      setWeather({
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        condition: data.current.condition.code,
        icon: data.current.condition.icon,
        conditionText: data.current.condition.text,
      });
      console.log(data);

    } catch (error) {
      setError({
        error: true,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  //const handleSearch = async () => {
    //try {
      //const response = await fetch(':https://api.weatherapi.com/v1/current.json?key=fea9d169b741475f83790017241006&lang=es&q=', {
        //method: 'POST',
        //headers: {
          //'Content-Type': 'application/json',
        //},
        //body: JSON.stringify({ city: city }),
      //});

      //if (!response.ok) {
        //throw new Error('Error al obtener los datos del clima');
      //}

      //const data = await response.json();
      //setWeatherData(data);
    //} catch (error) {
      //console.error(error);
    //}
  //};

  return (
    <Container
     maxWidth="xs"
     sx={{ mt: 2 }}
    >
    <Typography
     variant="h3"
     omponent="h1"
     align="center"
     gutterBottom
    >
      App de Clima
    </Typography>
    <Box
     sx={{display: "grid", gap: 2}}
     component="form"
     autoComplete="off"
     onSubmit={onSubmit}
    >
    <TextField
     id="city"
     label="ciudad"
     variant="outlined"
     size="small"
     required
     fullWidth
     value={city}
     onChange={(e) => setCity(e.target.value)}
     error={error.error}
     helperText={error.message}
    />
    <LoadingButton
     type="submit"
     variant="contained"
     loading={loading}
     loadingIndicator="Buscando..."
    >
     Buscar
    </LoadingButton>
    </Box>

    {weather.city && (
      <Box
       sx={{
        mt: 2,
        display: "grid",
        gap: 2,
        textAlign: "center",
       }}
      >
        <Typography variant="h4" component="h2">
          {weather.city}, {weather.country}
        </Typography>
         <Box 
          component="img"
          alt={weather.conditionText}
          src={weather.icon}
          sx={{ margin: "0 auto" }}
         />
         <Typography variant="h5" component="h3">
          {weather.temperature} °C
         </Typography>
         <Typography variant="h6" component="h5">
          {weather.conditionText}
         </Typography>
         </Box>
    )}

    <Typography
        textAlign="center"
        sx={{ mt: 2, fontSize: "10px" }}
      >
        Powered by:{" "}
        <a
          href="https://www.weatherapi.com/"
          title="Weather API"
        >
          WeatherAPI.com
        </a>
      </Typography>
    </Container>
  );
}