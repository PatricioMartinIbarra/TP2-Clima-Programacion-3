//console.log(import.meta.env.VITE_API_KEY);
//instalar npm express mongoose nodemon aparte
//instalar npm install para el node modules
//instalar npm install body-parser
//instalar npm install cors
//instalar npm install axios 
//hacer el archivo ".env.local" para poner la api key "  VITE_API_KEY="fea9d169b741475f83790017241006"  afuera del src"
//y tambien poner " MONGO_URI=mongodb://localhost:27017/p3tp2_appclima ""

import { LoadingButton } from "@mui/lab";
import { Container, Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${
  import.meta.env.VITE_API_KEY
}&lang=es&q=`;

export default function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temperature: "",
    condition: "",
    icon: "",
    conditionText: "",
  });

  const saveSearch = async (searchData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/saveSearch",
        searchData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error saving search:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Axios error:", error.message);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({
      error: false,
      message: "",
    });
    try {
      if (!city.trim()) throw { message: "El campo ciudad es obligatorio" };

      const res = await fetch(API_WEATHER + city);
      const data = await res.json();

      if (data.error) {
        throw { message: data.error.message };
      }

      console.log(data);

      const weatherData = {
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        condition: data.current.condition.code,
        conditionText: data.current.condition.text,
        icon: data.current.condition.icon,
      };

      setWeather(weatherData);

      // Guarda datos de búsqueda en el backend
      await saveSearch(weatherData);
    } catch (error) {
      console.log(error);
      setError({ error: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

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