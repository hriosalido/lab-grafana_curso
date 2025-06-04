# lab-grafana# Visualización de Flujos de Negocio en Grafana

Este laboratorio está diseñado para ejecutarse directamente en **GitHub Codespaces** y permite representar procesos de negocio usando Grafana sin necesidad de una infraestructura de observabilidad compleja.

---

## 📦 Servicios incluidos

- **Grafana** (`localhost:3000`)  
  Usuario: `admin`, Contraseña: `admin`

- **Prometheus** (`localhost:9090`)  
  Recoge métricas del Pushgateway.

- **Pushgateway** (`localhost:9091`)  
  Permite enviar métricas simuladas desde scripts.

- **Servidor estático** (`localhost:8080`)  
  Sirve archivos CSV y otros recursos visuales.

---

## 🚀 Primeros pasos

1. Abre este repositorio en Codespaces.
2. Ejecuta en terminal:

\`\`\`bash
docker-compose up -d
\`\`\`

3. Accede a Grafana:  
   [http://localhost:3000](http://localhost:3000)

---

## 📂 Estructura del proyecto

```
.
├── .devcontainer/           # Configuración para Codespaces
├── docker-compose.yml       # Stack con Grafana + Prometheus + Pushgateway
├── prometheus/              # Configuración básica de Prometheus
├── grafana/                 # Datos persistentes y plugins
├── data/                    # CSVs de entrada para los paneles
├── flows/                   # Scripts Python que simulan métricas
└── README.md
```

---

## 🧪 Laboratorio básico incluido

### 🔸 Simulación de flujo con errores

1. Ejecuta el siguiente script:

\`\`\`bash
python3 flows/sim-flujo.py
\`\`\`

2. Abre Prometheus en \`localhost:9090\` y consulta \`flujo_error_rate\`.

3. Crea un panel en Grafana con color dinámico según ese valor.

---

## 📊 Visualización desde CSV

Archivo: \`data/pedidos.csv\`

\`\`\`csv
pedido_id,estado,fecha
1001,validado,2024-06-01
1002,pendiente,2024-06-02
1003,error,2024-06-03
\`\`\`

Puedes usar el plugin **CSV datasource** para representar estados de pedidos en Status Map o FlowCharting.

---

## 🔌 Plugins instalados automáticamente

- \`marcusolsson-csv-datasource\`
- \`agenty-flowcharting-panel\`
- \`yesoreyeram-boomtable-panel\`
- \`natel-statusmap-panel\`

---

## 📚 Recursos adicionales

- [Documentación oficial de Grafana](https://grafana.com/docs/)
- [Pushgateway](https://prometheus.io/docs/practices/pushing/)
- [FlowCharting Plugin](https://github.com/algenty/grafana-flowcharting)

---

## 🧑‍🏫 Curso asociado

Este entorno está diseñado para el curso:  
**“Visualización de Flujos de Negocio en Grafana (25h)”**  
📍 Modalidad: Remota · 🔧 Enfoque práctico · �� Instructor: [David Pestana](https://github.com/davidpestana)
