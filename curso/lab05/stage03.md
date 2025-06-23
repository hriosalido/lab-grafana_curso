
## 🔹 Fase 3 – Representar evolución temporal de eventos por tipo

---

### 🎯 Objetivo

Visualizar la evolución de los distintos `tipo_evento` a lo largo del tiempo mediante **series temporales** reales, agrupadas por minutos u horas. Esto permite detectar patrones como acumulaciones de errores, aumentos de carga en tramos horarios, o inactividad de procesos.

---

### 🗂️ Estructura

* Tabla: `eventos` (ya creada)
* Campos clave: `timestamp`, `tipo_evento`, `valor`
* Paneles utilizados:

  * `Time Series` (tendencia por evento)
  * `Diagram Panel` (coloreado de nodos por frecuencia reciente)
  * `Stat` o `Bar Gauge` (volumen por tipo)

---

### 🪜 Pasos guiados

1. **Crea una consulta temporal agregada**

   En un panel nuevo tipo **Time Series**:

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

   Esto creará una línea por cada tipo de evento: `creado`, `asignado`, `resuelto`, `error`.

2. **Visualiza la tendencia horaria o diaria**

   Cambia el intervalo (`Last 6h`, `Last 24h`, `Last 7d`) y observa cómo se comporta cada tipo de evento a lo largo del tiempo.

   * Picos de `error` podrían indicar fallos en el sistema.
   * Una caída de `resuelto` puede reflejar atascos o inactividad.

3. **Complementa con un panel `Stat` o `Bar Gauge`**

   Usa esta consulta:

   ```sql
   SELECT
     tipo_evento AS metric,
     COUNT(*) AS value
   FROM eventos
   WHERE $__timeFilter(timestamp)
   GROUP BY tipo_evento;
   ```

   Esto muestra un resumen del volumen por tipo en el rango actual.

4. **Relaciona esta métrica con Diagram Panel**

   Puedes usar el mismo resultado para colorear nodos en Diagram Panel como en fases anteriores, ahora basado en **conteo reciente**:

   ```sql
   SELECT
     tipo_evento AS metric,
     COUNT(*) AS value
   FROM eventos
   WHERE timestamp >= now() - interval '15 minutes'
   GROUP BY tipo_evento;
   ```

   Y en Mermaid:

   ```mermaid
   graph TD
     CR[Creado]
     AS[Asignado]
     RE[Resuelto]
     ER[Error]
     click ER "d/errores" "Ver errores"
   ```

   Con mapeo de colores:

   ```json
   [
     { "pattern": "ER", "thresholds": [1, 5, 10], "classes": ["ok", "alerta", "critico"] }
   ]
   ```

---

### 🎯 Retos

1. 📊 **Cambiar la granularidad temporal**

   Modifica `date_trunc('minute', ...)` por `hour`, `day`, etc., según el volumen de eventos.

2. 🔁 **Filtrar por un solo proceso**

   Añade `AND proceso_id = ${proceso}` para analizar el comportamiento individual.

3. 🧪 **Normalizar por valor promedio por hora**

   Sustituye `COUNT(*)` por `AVG(valor)` para detectar eventos más “costosos”.

---

### ✅ Validaciones

* ✅ El panel `Time Series` muestra una línea por tipo de evento.
* ✅ Cambiar el rango de tiempo afecta a la visualización.
* ✅ El panel `Stat` o `Bar Gauge` resume correctamente por tipo.
* ✅ Los datos se pueden mapear a Diagram Panel con coloreado por recuento reciente.

---

### 💬 Reflexión

Esta fase te enseña a usar Grafana para representar **tendencias temporales categorizadas**, algo esencial en el análisis de procesos, actividad de servicios, soporte técnico y flujos de trabajo. En lugar de analizar valores únicos, aquí se exploran **volúmenes distribuidos en el tiempo**, que permiten anticipar problemas, comparar ritmos y evaluar cargas reales.