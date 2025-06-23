## 🔹 Fase 1 – Visualizar el flujo temporal de eventos desde base de datos SQL

---

### 🎯 Objetivo

Usar la tabla `eventos` (que ya contiene miles de registros con `timestamp`) para construir una visualización dinámica en Diagram Panel. El objetivo es reflejar **cómo evolucionan los eventos de negocio en el tiempo**, coloreando nodos según la frecuencia o severidad de eventos recientes.

---

### 🗂️ Estructura

* Tabla: `eventos`
* Columnas clave: `tipo_evento`, `timestamp`, `valor`
* Nodos representados: `creado`, `asignado`, `resuelto`, `error`
* Visualización con `Diagram Panel` basada en conteo temporal de eventos

---

### 🪜 Pasos guiados

1. **Consulta básica desde PostgreSQL (modo tabla)**

   Crea un panel nuevo en Grafana con tu datasource PostgreSQL y escribe:

   ```sql
   SELECT
     tipo_evento AS metric,
     COUNT(*) AS value
   FROM eventos
   WHERE $__timeFilter(timestamp)
   GROUP BY tipo_evento;
   ```

   ✅ Esto devolverá el número de eventos de cada tipo dentro del rango temporal seleccionado en el dashboard.

2. **Crea un bloque Mermaid básico en Diagram Panel**

   ```mermaid
   graph LR
     CR[Creado]
     AS[Asignado]
     RE[Resuelto]
     ER[Error]

     CR --> AS --> RE
     AS --> ER
   ```

3. **Define clases para pintar nodos según valor**

   En el área del Diagram Panel añade:

   ```mermaid
   classDef activo fill:#4caf50,stroke:#2e7d32,color:#fff;
   classDef alerta fill:#ff9800,stroke:#ef6c00,color:#fff;
   classDef critico fill:#f44336,stroke:#b71c1c,color:#fff;
   ```

4. **Mapeo dinámico desde la query**

   Si el nombre de los nodos coincide con los valores de `metric`, se colorearán automáticamente.

   Mapea:

   ```json
   [
     { "pattern": "ER", "thresholds": [1], "classes": ["critico"] },
     { "pattern": "RE", "thresholds": [5, 20], "classes": ["activo", "alerta", "critico"] }
   ]
   ```

5. **Explora el resultado**

   * Cambia el rango de tiempo en el dashboard (`Last 5 minutes`, `Last 1 hour`, etc.).
   * Observa cómo los nodos se pintan en función del número de eventos ocurridos.

---

### 🎯 Retos

1. 📈 **Probar la misma visualización con Time Series**

   ```sql
   SELECT
     date_trunc('minute', timestamp) AS time,
     tipo_evento AS metric,
     COUNT(*) AS value
   FROM eventos
   WHERE $__timeFilter(timestamp)
   GROUP BY time, tipo_evento
   ORDER BY time;
   ```

2. 🧪 **Agregar tooltip personalizado a cada nodo**

   En Diagram Panel:

   ```mermaid
   click ER "d/alertas?var-evento=error" "Ver errores recientes"
   ```

3. 🚦 **Crear una lógica de severidad**

   Asume:

   * `error` = crítico
   * `resuelto` = normal
   * `asignado` = medio

   Y pinta con reglas dinámicas según el volumen en los últimos 15 minutos.

---

### ✅ Validaciones

* ✅ La consulta devuelve series temporales reales.
* ✅ Los nodos del flujo Mermaid coinciden con los valores de `tipo_evento`.
* ✅ Los colores cambian según el conteo dinámico.
* ✅ La selección de rango en el dashboard afecta al resultado.

---

### 💬 Reflexión

Esta fase demuestra cómo **usar datos SQL reales como series temporales** para pintar procesos vivos en Diagram Panel. La separación clara entre `timestamp`, `tipo_evento` y `valor` permite aplicar lógica visual dinámica sin depender de datos de Prometheus. Es una técnica muy útil para representar procesos en flujos de negocio, mantenimiento, soporte técnico o producción.
