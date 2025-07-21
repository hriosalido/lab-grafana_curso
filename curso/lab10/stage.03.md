

### 🔹 Fase 3 – Creación del exporter MQTT → Prometheus

#### 🎯 Objetivo

Montar un **exporter en Node.js** que se conecte al broker MQTT, escuche mensajes en tiempo real, y los exponga en una ruta `/metrics` compatible con Prometheus. Este exporter actuará como puente **pull** para la monitorización.

---

#### 🧱 Componentes

* Cliente MQTT (`mqtt`)
* Servidor HTTP (`express`)
* Lógica interna de almacenamiento de última métrica recibida
* Exposición en formato Prometheus

---

#### 📦 Paso 1 – Preparar entorno

1. Crea un nuevo directorio:

```bash
mkdir mqtt-exporter && cd mqtt-exporter
npm init -y
npm install mqtt express
```

---

#### 📜 Paso 2 – Crear archivo `exporter.js`

```js
const mqtt = require('mqtt');
const express = require('express');

const app = express();
const port = 9101;

let metrics = {
  temperature: 0,
  humidity: 0,
  vibration: 0
};

// Conectar al broker MQTT
const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('[MQTT] Conectado al broker');
  client.subscribe('/factory/env/#');
});

client.on('message', (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());
    const val = payload.value;

    if (topic.includes('temperature')) metrics.temperature = val;
    if (topic.includes('humidity')) metrics.humidity = val;
    if (topic.includes('vibration')) metrics.vibration = val;

    console.log(`[MQTT] ${topic} → ${val}`);
  } catch (err) {
    console.error('[MQTT] Error al procesar mensaje:', err.message);
  }
});

// Exposición de métricas para Prometheus
app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(
    `# HELP temperature_celsius Temperatura desde MQTT
# TYPE temperature_celsius gauge
temperature_celsius ${metrics.temperature}

# HELP humidity_percent Humedad relativa desde MQTT
# TYPE humidity_percent gauge
humidity_percent ${metrics.humidity}

# HELP vibration_level Nivel de vibración desde MQTT
# TYPE vibration_level gauge
vibration_level ${metrics.vibration}
`
  );
});

app.listen(port, () => {
  console.log(`[HTTP] Exporter disponible en http://localhost:${port}/metrics`);
});
```

---

#### ▶️ Paso 3 – Ejecutar el exporter

```bash
node exporter.js
```

---

#### 🔎 Verifica funcionamiento

1. Publica datos MQTT:

```bash
mosquitto_pub -h localhost -t /factory/env/temperature -m '{"value": 25.3}'
```

2. Abre en navegador: [http://localhost:9101/metrics](http://localhost:9101/metrics)

Deberías ver un texto plano con las métricas actualizadas.

---

#### ✅ Resultado

Tienes un **servicio HTTP** que convierte mensajes MQTT en métricas Prometheus **en tiempo real**, sin necesidad de Pushgateway.

