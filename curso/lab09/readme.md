# 🧪 Laboratorio 09 – Integración con Prometheus y métricas simuladas

## 🎯 Objetivo

Aprender a enviar métricas personalizadas a Prometheus mediante **Pushgateway**, y representar su evolución en Grafana. Además, sentar las bases para la incorporación de fuentes **MQTT**, que se profundizarán en el siguiente laboratorio.

---

## 🗂️ Contenido

* Push vs Pull en Prometheus
* Uso de Prometheus Pushgateway
* Simulación de métricas desde scripts
* Visualización dinámica en Grafana
* Introducción a métricas desde MQTT

---

## 🛠️ Fases del laboratorio

### 🔹 Fase 1 – Arquitectura Prometheus + Pushgateway

**Objetivo:** Comprender cómo Prometheus recolecta métricas de Pushgateway y visualizar el flujo completo.

1. Levanta el stack con Docker Compose incluyendo:

   * `prom/prometheus`
   * `prom/pushgateway`
   * `grafana/grafana`

2. Revisa y comprende el `prometheus.yml`:

   ```yaml
   scrape_configs:
     - job_name: 'pushgateway'
       static_configs:
         - targets: ['pushgateway:9091']
   ```

3. Abre Prometheus ([http://localhost:9090](http://localhost:9090)) y verifica que el job `pushgateway` está activo.

---

### 🔹 Fase 2 – Envío manual de métricas con `curl`

**Objetivo:** Entender cómo se formatean las métricas Prometheus y cómo enviarlas al Pushgateway.

```bash
echo "temperature_celsius 23.5" | curl --data-binary @- http://localhost:9091/metrics/job/sensorA
```

1. Visualiza la métrica en Prometheus: busca `temperature_celsius`.
2. Crea otra para simular humedad, presión u otra variable industrial.

---

### 🔹 Fase 3 – Script Node.js para simulación de métricas

**Objetivo:** Automatizar el envío periódico de métricas.

1. Usa el siguiente script base:

```js
const axios = require("axios");

setInterval(() => {
  const value = (20 + Math.random() * 5).toFixed(2);
  axios.post("http://localhost:9091/metrics/job/sensorA", `temperature_celsius ${value}`, {
    headers: { "Content-Type": "text/plain" },
  });
}, 5000);
```

2. Ejecuta el script y verifica en Prometheus cómo se actualiza el valor.
3. Añade más métricas (ej. `humidity_percent`, `vibration_level`).

---

### 🔹 Fase 4 – Visualización dinámica en Grafana

**Objetivo:** Crear dashboards que respondan en tiempo real a las métricas push.

1. Añade Prometheus como datasource.
2. Crea paneles para:

   * Temperatura (`temperature_celsius`)
   * Humedad (`humidity_percent`)
   * Estado (`up{job="pushgateway"}`)
3. Usa:

   * Gauge panel
   * Time series
   * Bar gauge

---

### 🔹 Fase 5 – Primer contacto con MQTT

**Objetivo:** Entender cómo introducir métricas desde fuentes MQTT.

> ⚠️ En este laboratorio no se conecta aún Prometheus a MQTT, pero se deja todo preparado.

1. Simula mensajes MQTT con un broker local (`mosquitto`) o MQTT Explorer.
2. Crea un script Node.js que escuche en MQTT y **envíe métricas al Pushgateway** (como puente).
3. Prepara:

   * `topic`: `/factory/env/temperature`
   * Payload: `{"value": 26.1}`
   * Script que convierte ese JSON en métrica Prometheus y lo empuja.

