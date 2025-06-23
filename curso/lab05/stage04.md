
## 🔹 Fase 4 – Visualizar el estado actual por proceso en Diagram Panel

---

### 🎯 Objetivo

Obtener el **último evento registrado** para cada `proceso_id` (ej. `resuelto`, `error`, `asignado`, etc.) y usarlo para construir un panel Diagram en Grafana donde cada nodo representa un proceso distinto, coloreado según su estado actual.

---

### 🗂️ Estructura

* Tabla: `eventos`
* Columnas: `proceso_id`, `tipo_evento`, `timestamp`
* Nodos: Uno por cada proceso (`P101`, `P102`, etc.)
* Valor: Último `tipo_evento` por proceso (estado actual)

---

### 🪜 Pasos guiados

1. **Crea una consulta para obtener el último evento por proceso**

   ```sql
   SELECT DISTINCT ON (proceso_id)
     proceso_id,
     tipo_evento AS value
   FROM eventos
   WHERE $__timeFilter(timestamp)
   ORDER BY proceso_id, timestamp DESC;
   ```

   Esta query devuelve un único registro por proceso, con su último evento más reciente.

2. **Crea un diagrama Mermaid con nodos por proceso**

   En Diagram Panel:

   ```mermaid
   graph TD
     P101[Proceso 101]
     P102[Proceso 102]
     P103[Proceso 103]
     P104[Proceso 104]
     P105[Proceso 105]
   ```

   Si tienes más procesos, genera los nodos manualmente o dinámicamente desde backend.

3. **Define clases de color por tipo\_evento**

   ```mermaid
   classDef creado fill:#bbdefb,stroke:#1976d2,color:#000;
   classDef asignado fill:#fff59d,stroke:#f9a825,color:#000;
   classDef resuelto fill:#a5d6a7,stroke:#388e3c,color:#000;
   classDef error fill:#ef9a9a,stroke:#c62828,color:#000;
   ```

4. **Mapea los valores a clases dinámicas**

   Usa esta estructura en las opciones avanzadas del panel:

   ```json
   [
     { "pattern": "P101", "value": "resuelto", "class": "resuelto" },
     { "pattern": "P102", "value": "error", "class": "error" },
     { "pattern": "P103", "value": "asignado", "class": "asignado" }
   ]
   ```

   O usa una regla general si el nombre del nodo coincide con el `proceso_id`:

   ```sql
   SELECT
     CONCAT('P', proceso_id) AS metric,
     tipo_evento AS value
   FROM (
     SELECT DISTINCT ON (proceso_id) *
     FROM eventos
     WHERE $__timeFilter(timestamp)
     ORDER BY proceso_id, timestamp DESC
   ) sub;
   ```

5. **Explora el resultado**

   * Cambia el rango de tiempo y observa cómo cambia el estado de cada nodo.
   * Si se generaron eventos nuevos (`INSERT INTO eventos ...`), los nodos reflejarán el cambio.

---

### 🎯 Retos

1. 🧪 **Simula errores o resoluciones recientes**

   Inserta nuevos eventos desde Adminer:

   ```sql
   INSERT INTO eventos (proceso_id, tipo_evento, timestamp)
   VALUES (101, 'error', NOW());
   ```

2. 🔁 **Agregar clic en cada proceso para ver su historial**

   ```mermaid
   click P101 "d/detalle-proceso?var-proceso=101" "Ver detalles"
   ```

3. 📉 **Generar panel complementario con total por estado actual**

   ```sql
   SELECT value, COUNT(*) FROM (
     SELECT DISTINCT ON (proceso_id)
       tipo_evento AS value
     FROM eventos
     ORDER BY proceso_id, timestamp DESC
   ) sub
   GROUP BY value;
   ```

---

### ✅ Validaciones

* ✅ Cada nodo representa un proceso único.
* ✅ El color refleja el último `tipo_evento`.
* ✅ La consulta es eficiente (usa `DISTINCT ON` + `ORDER BY timestamp DESC`).
* ✅ Cambiar los datos o el tiempo afecta directamente al diagrama.

---

### 💬 Reflexión

Esta fase muestra cómo llevar la lógica de “estado actual por entidad” a Grafana usando SQL puro. A diferencia de métricas acumuladas, esta representación permite visualizar la **foto operativa actual del sistema**, algo fundamental en entornos de planta, centros de soporte o seguimiento de flujos de negocio.