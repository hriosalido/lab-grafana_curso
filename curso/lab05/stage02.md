## 🔹 Fase 2 – Navegar al detalle de un proceso con Diagram Panel y drilldown

---

### 🎯 Objetivo

Ampliar la visualización anterior permitiendo al usuario **hacer clic en nodos del diagrama** para navegar al detalle de un `proceso_id` concreto. Esto simula un flujo maestro-detalle: desde una visión general de tipos de evento, saltamos a un dashboard detallado filtrado por proceso.

---

### 🗂️ Estructura

* Tabla: `eventos` (ya creada)
* Columna clave: `proceso_id`
* Variables en Grafana: `proceso` (de tipo *query variable*)
* Dashboards:

  * `Resumen de eventos` (panel de overview)
  * `Detalle proceso` (dashboard con filtros por proceso)

---

### 🪜 Pasos guiados

1. **Crear variable de tipo query en Grafana**

   * Nombre: `proceso`
   * Tipo: `Query`
   * Datasource: `PostgreSQL`
   * Query:

     ```sql
     SELECT DISTINCT proceso_id FROM eventos ORDER BY proceso_id DESC;
     ```

2. **Crear un dashboard de detalle**

   Llama a este dashboard por ejemplo: `Detalle proceso`.

   Añade un panel Table o Time Series con esta consulta:

   ```sql
   SELECT
     timestamp AS time,
     tipo_evento AS metric,
     valor AS value
   FROM eventos
   WHERE $__timeFilter(timestamp)
     AND proceso_id = ${proceso}
   ORDER BY timestamp;
   ```

3. **Modificar el diagrama Mermaid con enlaces dinámicos**

   En el dashboard de overview, crea un Diagram Panel con nodos por tipo de evento o agrupados por proceso:

   ```mermaid
   graph TD
     P101["Proceso 101"]
     P102["Proceso 102"]
     P103["Proceso 103"]

     click P101 "d/detalle-proceso?var-proceso=101" "Ver detalles P101"
     click P102 "d/detalle-proceso?var-proceso=102" "Ver detalles P102"
     click P103 "d/detalle-proceso?var-proceso=103" "Ver detalles P103"
   ```

   > 🧠 Puedes generar dinámicamente estos nodos si cargas el Mermaid desde un backend o JSON externo, pero aquí se simula manualmente.

4. **Usar valores dinámicos para colorear los nodos**

   Consulta para colorear según recuento de eventos por proceso:

   ```sql
   SELECT
     proceso_id AS metric,
     COUNT(*) AS value
   FROM eventos
   WHERE $__timeFilter(timestamp)
   GROUP BY proceso_id;
   ```

   En el panel, mapea:

   ```json
   [
     { "pattern": "P101", "thresholds": [10], "classes": ["activo"] },
     { "pattern": "P102", "thresholds": [50], "classes": ["alerta", "critico"] }
   ]
   ```

---

### 🎯 Retos

1. 🔁 **Mostrar únicamente procesos activos en el rango**

   Modifica la query de la variable `proceso` para:

   ```sql
   SELECT DISTINCT proceso_id
   FROM eventos
   WHERE timestamp >= now() - interval '1 hour';
   ```

2. 🧪 **Crear nodos por estado más reciente de cada proceso**

   Ejemplo (para colorear por el último tipo\_evento):

   ```sql
   SELECT DISTINCT ON (proceso_id)
     proceso_id AS metric,
     tipo_evento AS value
   FROM eventos
   ORDER BY proceso_id, timestamp DESC;
   ```

   Y luego: `resuelto → verde`, `error → rojo`, `asignado → amarillo`.

---

### ✅ Validaciones

* ✅ Variable `proceso` funciona y se actualiza dinámicamente.
* ✅ Los nodos tienen enlaces `click` que redirigen a dashboards de detalle.
* ✅ El dashboard de detalle filtra correctamente por `proceso_id`.
* ✅ Coloreado del nodo se adapta a la actividad del proceso.

---

### 💬 Reflexión

Esta fase introduce el concepto de **navegación contextual** dentro de Grafana, acercando Diagram Panel a una interfaz de tipo HMI o SCADA. La capacidad de ir de un overview al detalle filtrado por identificador permite representar flujos operativos reales y acotar análisis sin sobrecargar paneles únicos.