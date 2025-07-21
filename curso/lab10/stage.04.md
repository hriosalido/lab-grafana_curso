### 🔹 Fase 4 – Configurar Prometheus para scrapear el exporter

#### 🎯 Objetivo

Incluir el exporter MQTT dentro de la configuración de Prometheus para que este lo **scrapee periódicamente**, obteniendo las métricas publicadas vía MQTT y expuestas en `/metrics`.

---

#### 🧾 Paso 1 – Añadir el job en `prometheus.yml`

Edita tu archivo `prometheus.yml` y añade la siguiente sección al bloque `scrape_configs`:

```yaml
  - job_name: 'mqtt'
    static_configs:
      - targets: ['mqtt-exporter:9101']
```

> Asegúrate de respetar la indentación YAML.

Ejemplo completo:

```yaml
global:
  scrape_interval: 5s

scrape_configs:
  - job_name: 'pushgateway'
    static_configs:
      - targets: ['pushgateway:9091']

  - job_name: 'mqtt'
    static_configs:
      - targets: ['mqtt-exporter:9101']
```

---

#### 🐳 Paso 2 – Añadir el exporter al `docker-compose.yml` (opcional)

Si quieres ejecutarlo como contenedor, añade este servicio:

```yaml
  mqtt-exporter:
    build: ./mqtt-exporter
    ports:
      - "9101:9101"
    restart: unless-stopped
    depends_on:
      - mqtt
```

Y en `mqtt-exporter/Dockerfile` (si lo deseas contenerizar):

```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "exporter.js"]
```

O bien, si lo ejecutas en local, asegúrate de que Prometheus pueda acceder a `host.docker.internal:9101` si corres en Linux/Mac/Windows.

---

#### ▶️ Paso 3 – Reiniciar Prometheus

Reinicia el contenedor de Prometheus para aplicar la nueva configuración:

```bash
docker-compose restart prometheus
```

---

#### 🔍 Paso 4 – Verifica en Prometheus

1. Accede a [http://localhost:9090/targets](http://localhost:9090/targets)
2. Verifica que el **job `mqtt`** aparece y su estado es **UP**
3. Abre la pestaña **Graph** y busca:

```
temperature_celsius
humidity_percent
vibration_level
```

---

#### ✅ Resultado

Prometheus ahora recolecta directamente los datos de MQTT a través de tu exporter personalizado, sin necesidad de intermediarios como Pushgateway.
