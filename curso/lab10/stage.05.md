
### 🔹 Fase 5 – Visualización y alerta en Grafana

#### 🎯 Objetivo

Crear paneles y alertas en **Grafana** que visualicen en tiempo real las métricas recolectadas desde **MQTT** a través del exporter Prometheus, aplicando umbrales visuales y notificaciones condicionales.

---

#### 🔌 Paso 1 – Verificar que el datasource Prometheus está activo

Entra en [http://localhost:3000](http://localhost:3000):

1. Ir a **⚙️ Configuration > Data Sources**
2. Verifica que **Prometheus** aparece como conectado

---

#### 📊 Paso 2 – Crear un dashboard

1. Ir a **+ > Dashboard > Add new panel**
2. Añade un panel para cada métrica:

##### Panel 1 – Temperatura

* **Query**: `temperature_celsius{job="mqtt"}`
* **Visualización**: Gauge o Time Series
* **Unidades**: `°C`
* **Umbrales**:

  * Verde: < 26
  * Amarillo: 26–29
  * Rojo: ≥ 29

##### Panel 2 – Humedad

* **Query**: `humidity_percent{job="mqtt"}`
* **Unidades**: `%`
* Umbrales similares: 40–50–60

##### Panel 3 – Vibración

* **Query**: `vibration_level{job="mqtt"}`
* Unidades: `none` o personalizados

---

#### 🚨 Paso 3 – Configurar alerta

1. Abre el panel de temperatura
2. Click en **Alert > Create alert**
3. Definir condición:

```text
WHEN avg() OF query(A, 5m, now) IS ABOVE 28
```

4. Añadir mensaje:
   *“⚠️ Temperatura alta recibida por MQTT”*

5. (Opcional) Configura contacto (Slack, correo…) si usas un canal de alerta

---

#### 💡 Personalización extra

* Añadir variables: selección por sensor o zona (`zone`, `instance`, `topic`)
* Colores personalizados por nivel de severidad
* Tooltips explicativos por encima de cada panel
* Panel de estado con texto dinámico:
  `"Temperatura normal"` vs `"⚠️ Riesgo térmico elevado"`

---

#### ✅ Resultado

Tienes un dashboard en tiempo real con:

* Datos recolectados desde MQTT
* Visualización con umbrales e indicadores visuales
* Sistema de alertas configurado para métricas clave
