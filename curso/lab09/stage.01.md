

### 🔹 Fase 1 – Arquitectura Prometheus + Pushgateway

#### 🎯 Objetivo

Comprender la diferencia entre los modelos **pull** y **push** en Prometheus, y desplegar un entorno funcional que permita recolectar métricas enviadas por scripts o procesos temporales mediante **Pushgateway**.

---

#### 🧱 Componentes implicados

| Servicio      | Rol                                                          |
| ------------- | ------------------------------------------------------------ |
| `Prometheus`  | Motor de monitorización que **scrapea** datos de targets     |
| `Pushgateway` | Gateway que permite a procesos externos **empujar métricas** |
| `Grafana`     | Plataforma de visualización y dashboards                     |

---

#### 📦 Despliegue del entorno

Crea un archivo `docker-compose.yml` con la siguiente definición mínima:

```yaml
version: "3.8"

services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    restart: unless-stopped

  pushgateway:
    image: prom/pushgateway:latest
    ports:
      - "9091:9091"
    restart: unless-stopped

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin
    restart: unless-stopped
```

---

#### 📄 Configuración básica de Prometheus (`prometheus.yml`)

```yaml
global:
  scrape_interval: 5s

scrape_configs:
  - job_name: 'pushgateway'
    static_configs:
      - targets: ['pushgateway:9091']
```

Guarda este archivo en el mismo directorio que el `docker-compose.yml`.

---

#### ▶️ Iniciar el entorno

Desde la carpeta del proyecto, ejecuta:

```bash
docker-compose up -d
```

---

#### 🔍 Verifica el sistema

1. Accede a Prometheus: [http://localhost:9090](http://localhost:9090)
2. Ve a **Status > Targets** y verifica que el job `pushgateway` aparece como "UP"
3. Abre también [http://localhost:9091](http://localhost:9091) para ver el panel de métricas push

