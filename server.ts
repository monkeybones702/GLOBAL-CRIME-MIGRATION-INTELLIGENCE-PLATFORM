import express from 'express';
import {createServer} from 'vite';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const vite = await createServer({
    server: {middlewareMode: true},
    appType: 'spa',
  });

  app.use(vite.middlewares);

  // API Endpoints
  app.get('/api/intelligence/:country', async (req, res) => {
    const {country} = req.params;
    try {
      // In a production environment, you would use a secure backend API key.
      // const response = await fetch(`https://api.crimeometer.com/v1/incidents?location=${country}`, {
      //   headers: { 'x-api-key': process.env.CRIMEOMETER_API_KEY }
      // });
      // const data = await response.json();
      
      // Returning structured mock data as a template for real API response
      res.json({
        country,
        crime: 'High',
        migration: 'Moderate',
        trends: [
          {year: 2020, crime: 10, migration: 5},
          {year: 2021, crime: 12, migration: 6},
          {year: 2022, crime: 15, migration: 8},
          {year: 2023, crime: 13, migration: 10},
          {year: 2024, crime: 18, migration: 12},
        ]
      });
    } catch (error) {
      res.status(500).json({error: 'Failed to fetch intelligence data'});
    }
  });

  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
}

startServer();
