// servidor simple para servir SVG y YAML dinámicos
const express = require('express');
const app = express();
const port = 8080;

// Middleware CORS (por si se accede desde FlowPanel)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  console.log('sirviendo');
  next();
});

// SVG dinámico (por ejemplo, con valor embebido)
app.get('/svg/:value?', (req, res) => {
  const value = req.params.value || '---';
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="100">
  <rect x="10" y="10" width="200" height="40" fill="lightgray" stroke="black"/>
  <text id="test" x="110" y="35" font-size="20" text-anchor="middle" fill="black">${value}</text>
</svg>`);
});

// YAML dinámico para Flow Panel
app.get('/config.yaml', (req, res) => {
  const dataRef = req.query.dataRef || 'test-data';
  res.setHeader('Content-Type', 'text/yaml');
  res.send(`
cells:
  test:
    dataRef: "${dataRef}"
    label:
      units: "%"
      decimalPoints: 1
    labelColor:
      gradientMode: "hue"
      thresholds:
        - { color: "green", level: 0 }
        - { color: "yellow", level: 50 }
        - { color: "red", level: 90 }
`);
});

app.listen(port, () => {
  console.log(`Servidor SVG/YAML dinámico en http://localhost:${port}`);
});
