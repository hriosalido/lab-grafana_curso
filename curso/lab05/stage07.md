
## 🔹 Fase 7 – Crear dashboards overview/detalle con navegación contextual

---

### 🎯 Objetivo

Construir una arquitectura de dashboards en Grafana donde un panel principal tipo `Diagram Panel` actúe como vista general (overview), y cada nodo permita acceder con clic a un dashboard detallado filtrado por entidad (ej: proceso, línea, sensor).

---

### 🗂️ Estructura

* Dashboards:

  * `Overview General` → muestra todos los nodos relevantes (Diagram Panel)
  * `Detalle Proceso`, `Detalle Línea`, `Detalle Sensor` → dashboards individuales filtrables por ID
* Variables:

  * `proceso`, `linea`, `sensor` → de tipo `query` en Grafana
* Navegación: `click` en Mermaid con `?var=...`

---

### 🪜 Pasos guiados

1. **Crear variables de tipo query**

   En cada dashboard de detalle, define variables dinámicas:

   * Variable `proceso`:

     ```sql
     SELECT DISTINCT proceso_id FROM eventos ORDER BY proceso_id DESC;
     ```

   * Variable `linea`:

     ```sql
     SELECT DISTINCT linea FROM produccion ORDER BY linea;
     ```

   * Variable `sensor`:

     ```sql
     SELECT DISTINCT dispositivo_id FROM alarmas ORDER BY dispositivo_id;
     ```

2. **Crear dashboards de detalle**

   Cada uno tendrá un filtro aplicado usando la variable correspondiente. Ejemplo:

   * `Detalle Proceso`: panel `Time Series` con

     ```sql
     SELECT
       timestamp AS time,
       tipo_evento AS metric,
       valor AS value
     FROM eventos
     WHERE proceso_id = ${proceso}
     ORDER BY timestamp;
     ```

   * `Detalle Línea`: panel con producción temporal

   * `Detalle Sensor`: últimas alarmas activas

3. **Diseñar overview general en Diagram Panel**

   Ejemplo de diagrama general con flujos y nodos clicables:

   ```mermaid
   graph TD
     PR1[Proceso 101]
     PR2[Proceso 102]
     LN1[Línea 1]
     LN2[Línea 2]
     SN1[Sensor A]
     SN2[Sensor B]

     click PR1 "d/detalle-proceso?var-proceso=101" "Ver Proceso 101"
     click LN1 "d/detalle-linea?var-linea=Línea 1" "Ver Línea 1"
     click SN1 "d/detalle-sensor?var-sensor=Sensor A" "Ver Sensor A"
   ```

4. **Habilita links dinámicos con variables**

   Si lo prefieres más dinámico, puedes mapear nodos a URLs usando `value` de una query SQL:

   ```sql
   SELECT
     CONCAT('PR', proceso_id) AS metric,
     proceso_id AS value
   FROM (
     SELECT DISTINCT proceso_id FROM eventos
   ) sub;
   ```

   Y luego usar `click ${metric} "d/detalle-proceso?var-proceso=${value}"`.

---

### 🎯 Retos

1. 🔀 **Crear enlaces con múltiples variables**

   Ejemplo:

   ```mermaid
   click PR1 "d/detalle-proceso?var-proceso=101&var-linea=L1"
   ```

2. 🧪 **Incluir tooltips informativos**

   Añade:

   ```mermaid
   click SN1 "d/detalle-sensor?var-sensor=Sensor A" "Última alarma: crítica"
   ```

3. 🗂️ **Agrupar nodos por tipo en subgraphs Mermaid**

   ```mermaid
   subgraph Procesos
     PR1
     PR2
   end

   subgraph Líneas
     LN1
     LN2
   end
   ```

---

### ✅ Validaciones

* ✅ Los dashboards de detalle reciben la variable y filtran correctamente.
* ✅ Los nodos de Diagram Panel tienen `click` funcional.
* ✅ Se puede navegar entre dashboards sin usar el menú.
* ✅ Las variables se cargan dinámicamente desde SQL.

---

### 💬 Reflexión

Esta fase muestra cómo construir interfaces de exploración interactivas en Grafana: desde una **vista de alto nivel**, puedes navegar hacia dashboards específicos sin necesidad de menús ni búsquedas. Este patrón mejora la usabilidad en entornos de producción, soporte, calidad o mantenimiento, donde el operador necesita actuar rápido sobre lo que ve.
