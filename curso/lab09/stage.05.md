
### 🔹 Fase 5 – Primer contacto con MQTT

#### 🎯 Objetivo

Simular un flujo donde los datos se publican en **MQTT** y son transformados en métricas Prometheus mediante un puente en **Node.js** que empuja los datos al **Pushgateway**. Esta fase **no conecta aún Prometheus directamente al broker**, pero prepara todo para el Laboratorio 10.

---

#### 🔌 Arquitectura introducida

```
[sensor → MQTT] → [Node.js bridge] → [Pushgateway] → [Prometheus] → [Grafana]
```

---

#### 🧱 Paso 1 – Añadir broker MQTT al entorno

Agrega el servicio `mqtt` a tu `docker-compose.yml`:

```yaml
  mqtt:
    image: eclipse-mosquitto
    container_name: mqtt
    ports:
      - "1883:1883"
    volumes:
      - ./mosquitto.conf:/mosquitto/config/mosquitto.conf
```

Crea un archivo `mosquitto.conf`:

```conf
listener 1883
allow_anonymous true
```

Inicia el entorno:

```bash
docker-compose up -d mqtt
```

---

#### 📤 Paso 2 – Simular publicación MQTT

Publica mensajes a un tópico usando `mosquitto_pub`:

```bash
mosquitto_pub -h localhost -t /factory/env/temperature -m '{"value": 26.4}'
```

O crea un script que publique cada 5 segundos:

```bash
while true; do
  VAL=$(awk -v min=20 -v max=28 'BEGIN{srand(); print min+rand()*(max-min)}')
  mosquitto_pub -h localhost -t /factory/env/temperature -m "{\"value\": $VAL}"
  sleep 5
done
```

---

#### 🔁 Paso 3 – Crear bridge Node.js: MQTT → Pushgateway

Instala dependencias:

```bash
npm install mqtt axios
```

Script `mqtt_push.js`:

```js
const mqtt = require('mqtt');
const axios = require('axios');

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  client.subscribe('/factory/env/temperature');
});

client.on('message', async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    const value = data.value;

    const body = `
# TYPE temperature_celsius gauge
temperature_celsius ${value}
`;

    await axios.post('http://localhost:9091/metrics/job=mqtt_sensor', body, {
      headers: { 'Content-Type': 'text/plain' }
    });

    console.log(`[✔] MQTT recibido y push: ${value}`);
  } catch (err) {
    console.error(`[✘] Error:`, err.message);
  }
});
```

Ejecuta el script:

```bash
node mqtt_push.js
```

---

#### 🔍 Paso 4 – Verifica la métrica en Prometheus

1. Accede a [http://localhost:9090](http://localhost:9090)
2. Busca `temperature_celsius{job="mqtt_sensor"}`

---

#### 📊 Paso 5 – Añadir panel en Grafana

1. Usa el mismo dashboard del Lab 09
2. Añade un nuevo panel para el `job="mqtt_sensor"`
3. Observa cómo se actualiza al publicar nuevos mensajes MQTT

---

#### 🚀 ¿Qué sigue?

En el **Laboratorio 10**:

* No necesitaremos Pushgateway: Prometheus **scrapeará directamente** el puente MQTT que expondrá `/metrics`.
* Aprenderás a montar un **exporter MQTT** personalizado compatible con Prometheus.
