const http = require('http');
const url = require('url');
const https = require('https');

const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/weather') {
    const city = parsedUrl.query.city;

    if (!city) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('City parameter is missing.');
      return;
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    https.get(weatherUrl, (weatherRes) => {
      let data = '';

      weatherRes.on('data', (chunk) => {
        data += chunk;
      });

      weatherRes.on('end', () => {
        try {
          const weatherData = JSON.parse(data);
          if (weatherData.main && weatherData.main.temp) {
            const temperature = weatherData.main.temp;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ city, temperature }));
          } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('City not found.');
          }
        } catch (error) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error processing weather data.');
        }
      });
    }).on('error', (error) => {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error fetching weather data.');
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Endpoint not found.');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});