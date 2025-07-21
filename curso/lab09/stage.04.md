

### 🔹 Fase 4 – Visualización dinámica en Grafana

#### 🎯 Objetivo

Crear paneles en **Grafana** que muestren de forma atractiva y dinámica las métricas enviadas a **Pushgateway** y recolectadas por **Prometheus**.

---

#### 🧭 Accede a Grafana

* URL: [http://localhost:3000](http://localhost:3000)
* Usuario/contraseña por defecto: `admin / admin`

---

#### 🔌 Paso 1 – Configurar Prometheus como datasource

1. Ir a **⚙️ Configuration > Data Sources**
2. Seleccionar **Prometheus**
3. En URL: `http://prometheus:9090`
4. Click en **Save & Test**

---

#### 📊 Paso 2 – Crear paneles para métricas simuladas

Ve a **+ > Dashboard** y añade un nuevo panel:

##### Panel 1 – Temperatura

* Query: `temperature_celsius`
* Tipo: **Gauge** o **Time Series**
* Unidades: `°C` o `none`
* Umbrales:

  * Verde: < 24
  * Amarillo: 24–27
  * Rojo: > 27

##### Panel 2 – Humedad

* Query: `humidity_percent`
* Tipo: **Bar Gauge** o **Time Series**
* Unidades: `%`
* Umbrales:

  * Verde: < 55
  * Amarillo: 55–65
  * Rojo: > 65

---

#### 🧰 Consejos de diseño

* Agrupa paneles relacionados en una **Row**
* Usa colores de umbral para reflejar el estado
* Añade **Tooltips** y títulos descriptivos

---

#### 💾 Guarda el dashboard

* Click en el icono 💾 (Save dashboard)
* Nombre sugerido: `Pushgateway - Métricas Simuladas`

---

#### 🧪 Verificación

1. Observa cómo los valores cambian cada 5 segundos.
2. Comprueba que los colores de umbral se actualizan automáticamente.
3. Si detienes el script Node, los valores se congelan (último push recibido).

