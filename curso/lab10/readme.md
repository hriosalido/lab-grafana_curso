
# 🧪 Laboratorio 10 – Monitorización directa de MQTT en Prometheus

## 🎯 Objetivo

Conectar **Prometheus** directamente a una fuente **MQTT**, transformando los mensajes recibidos en métricas Prometheus que puedan visualizarse y alertarse en **Grafana**.

---

## 🗂️ Contenido

* MQTT como fuente de datos industriales
* Uso de `mosquitto` como broker local
* Creación de un bridge MQTT → Prometheus mediante Node.js
* Exposición HTTP en `/metrics` para Prometheus
* Visualización y alerta de métricas MQTT en Grafana

---

## 🛠️ Fases del laboratorio

### 🔹 Fase 1 – Despliegue del broker MQTT local

**Objetivo:** Tener un broker MQTT funcional donde publicar datos simulados.

1. Añade `eclipse-mosquitto` a tu `docker-compose.yml`:

```yaml
  mqtt:
    image: eclipse-mosquitto
    ports:
      - "1883:1883"
    volumes:
      - ./mosquitto.conf:/mosquitto/config/mosquitto.conf
```

2. Usa un archivo mínimo de configuración (`mosquitto.conf`):

```conf
listener 1883
allow_anonymous true
```

3. Verifica que el broker está accesible:

```bash
mosquitto_sub -h localhost -t "#"
```

---

### 🔹 Fase 2 – Publicación de mensajes MQTT

**Objetivo:** Simular sensores publicando a MQTT.

1. Publica mensajes manuales:

```bash
mosquitto_pub -h localhost -t /factory/temperature -m '{"value": 22.7}'
```

2. Opcional: crea un script Node o Python que publique cada X segundos datos aleatorios.

---

### 🔹 Fase 3 – Creación del exporter MQTT → Prometheus

**Objetivo:** Montar un adaptador que escuche MQTT y exponga `/metrics`.

1. Usa un script Node.js con `mqtt` y `express`:

```js
const mqtt = require('mqtt');
const express = require('express');
const app = express();
const port = 9101;

let latestTemp = 0;

const client = mqtt.connect('mqtt://localhost:1883');
client.on('connect', () => {
  client.subscribe('/factory/temperature');
});

client.on('message', (topic, message) => {
  const payload = JSON.parse(message.toString());
  latestTemp = payload.value;
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`# HELP temperature_celsius Temperature from MQTT\n# TYPE temperature_celsius gauge\ntemperature_celsius ${latestTemp}`);
});

app.listen(port, () => {
  console.log(`Exporter listening on :${port}/metrics`);
});
```

---

### 🔹 Fase 4 – Configurar Prometheus para el nuevo job

**Objetivo:** Hacer que Prometheus scrapee el exporter de MQTT.

1. En `prometheus.yml`:

```yaml
  - job_name: 'mqtt'
    static_configs:
      - targets: ['mqtt-exporter:9101']
```

2. Asegúrate de exponer el servicio `mqtt-exporter` en `docker-compose.yml`.

---

### 🔹 Fase 5 – Visualización y alerta en Grafana

**Objetivo:** Mostrar y alertar métricas MQTT como si vinieran de cualquier otra fuente Prometheus.

1. Abre Grafana, crea un panel con la métrica `temperature_celsius`.
2. Añade una alerta: si `temperature_celsius > 30` durante 1m → alerta crítica.
3. Personaliza el panel con colores y tooltips.

---

## 🔄 Alternativas y mejoras

* Añadir más tópicos y métricas (humedad, vibración...).
* Persistir últimos valores en archivo.
* Añadir autenticación en `mosquitto`.

---

## ✅ Resultado Esperado

Un flujo **real-time** de publicación MQTT → exporter Node.js → Prometheus → Grafana, listo para extender a entornos productivos o de simulación industrial.
