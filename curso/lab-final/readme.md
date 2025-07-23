## 🏭 Laboratorio Final – Monitoreo en Tiempo Real con MQTT, Prometheus y Flow Panel

### 🎯 Objetivo

Implementar un caso real de monitoreo industrial en una planta de procesado alimentario usando:

* Scripts Node.js que simulan sensores y publican datos a MQTT
* Exportador MQTT compatible con Prometheus
* Prometheus + Alertmanager para recogida y alertas
* Grafana con Flow Panel basado en SVG para visualización SCADA
* Notificaciones por Slack o Email ante eventos críticos

---

## 🔹 Fase 1 – Generadores de métricas en Node.js

Crea scripts Node.js que publiquen a MQTT cada X segundos:

### `sensor_temperatura.js`

```js
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://mosquitto:1883')
setInterval(() => {
  const valor = (50 + Math.random() * 30).toFixed(1)
  client.publish('planta/horno1/temperatura', valor)
}, 10000)
```

### `sensor_estado_motor.js`

```js
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://mosquitto:1883')
setInterval(() => {
  const estado = Math.random() > 0.5 ? 'ON' : 'OFF'
  client.publish('planta/mezcladora1/estado', estado)
}, 15000)
```

---

## 🔹 Fase 2 – Broker MQTT y Exportador

### `docker-compose.yml`

```yaml
version: '3.8'
services:
  mosquitto:
    image: eclipse-mosquitto
    ports: ["1883:1883"]

  mqtt-exporter:
    image: kpetrem/mqtt-exporter:latest
    ports: ["9344:9344"]
    volumes:
      - ./mqtt_exporter.yml:/config/config.yml
```

### `mqtt_exporter.yml`

```yaml
mqtt:
  host: mqtt://mosquitto
  topics:
    - planta/+/temperatura
    - planta/+/estado
mapping:
  - topic: planta/.+/temperatura
    name: temperatura_horno
    type: gauge
  - topic: planta/.+/estado
    name: estado_motor
    type: gauge
    value_mapping:
      ON: 1
      OFF: 0
```

---

## 🔹 Fase 3 – Prometheus y Alertmanager

### `prometheus.yml`

```yaml
global:
  scrape_interval: 10s
scrape_configs:
  - job_name: 'mqtt'
    static_configs:
      - targets: ['mqtt-exporter:9344']
rule_files:
  - 'rules.yml'
```

### `rules.yml`

```yaml
groups:
  - name: planta_alerts
    rules:
      - alert: AltaTemperatura
        expr: temperatura_horno > 70
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Horno sobrecalentado"
```

### `alertmanager.yml`

```yaml
global:
  slack_api_url: 'https://hooks.slack.com/services/TU-WEBHOOK'
receivers:
  - name: 'slack-alerts'
    slack_configs:
      - channel: '#alertas-planta'
        send_resolved: true
        text: '{{ .Annotations.summary }}'
route:
  receiver: 'slack-alerts'
```

---

## 🔹 Fase 4 – SVG SCADA + Flow Panel

### `planta.svg`

(Generado en draw\.io, incluye elementos con estos IDs: `horno1`, `mezcladora1`, `tanqueA`)

### `panelconfig.yaml`

```yaml
cells:
  - id: horno1
    metric: temperatura_horno
    thresholds:
      - value: 50
        color: orange
      - value: 70
        color: red
    unit: °C
    linkRef: horno1_detalle

  - id: mezcladora1
    metric: estado_motor
    thresholds:
      - value: 0
        color: gray
      - value: 1
        color: green
    unit: estado
```

Publica ambos archivos (`planta.svg` y `panelconfig.yaml`) en un servidor accesible por Grafana. Usa Flow Panel con URLs externas o locales según configuración.

---

## 🔹 Fase 5 – Visualización y prueba

1. Abre Grafana y verifica que el panel Flow actualiza colores en tiempo real.
2. Cambia manualmente los valores (simula sobrecalentamiento).
3. Verifica:

   * Color rojo en horno1
   * Alerta activada en Prometheus
   * Notificación en Slack o Email

