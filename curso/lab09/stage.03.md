

### 🔹 Fase 3 – Script Node.js para simulación de métricas

#### 🎯 Objetivo

Automatizar la generación y envío de métricas a **Pushgateway** mediante un script en **Node.js**, simulando sensores o procesos que reportan datos periódicamente.

---

#### 📦 Requisitos

1. Tener `Node.js` y `npm` instalados.
2. Crear un directorio para el script:

```bash
mkdir mqtt-simulator && cd mqtt-simulator
npm init -y
npm install axios
```

---

#### 📜 Código del script

Crea un archivo `push_metrics.js` con el siguiente contenido:

```js
const axios = require('axios');

function generateMetrics() {
  const temp = (20 + Math.random() * 5).toFixed(2);
  const humidity = (40 + Math.random() * 10).toFixed(2);

  return `
# TYPE temperature_celsius gauge
temperature_celsius ${temp}
# TYPE humidity_percent gauge
humidity_percent ${humidity}
`;
}

function pushToGateway() {
  const body = generateMetrics();

  axios.post('http://localhost:9091/metrics/job/sensorA', body, {
    headers: { 'Content-Type': 'text/plain' }
  })
  .then(() => console.log(`[✔] Métricas enviadas correctamente`))
  .catch(err => console.error(`[✘] Error al enviar métricas:`, err.message));
}

// Ejecutar cada 5 segundos
setInterval(pushToGateway, 5000);
```

---

#### ▶️ Ejecutar el script

Desde el directorio del script:

```bash
node push_metrics.js
```

---

#### 🔍 Verificar en Prometheus

1. Accede a [http://localhost:9090](http://localhost:9090)
2. Busca las métricas:

   * `temperature_celsius`
   * `humidity_percent`
3. Verifica que los valores se actualizan periódicamente

---

#### 🧠 Ideas para extender

* Simular múltiples sensores con distintos jobs (`sensorA`, `sensorB`, etc.).
* Añadir métricas como `vibration_level`, `pressure_kpa`, etc.
* Incluir etiquetas (`instance`, `zone`, etc.) con `grouping_key` (fase opcional).

