

## 🔹 Fase 3 – Consultas base para el modelado visual

---

### 🎯 Objetivo

Preparar y validar las consultas SQL necesarias para alimentar los nodos de un diagrama Mermaid, garantizando que la estructura de datos sea compatible con **Diagram Panel**. El objetivo es que los estados (ej. `Pendiente`, `Validado`, `Entregado`) puedan pintarse dinámicamente en función de la actividad reciente.

---

### 🧠 Requisitos técnicos del panel

> **Diagram Panel** requiere:
>
> * Una columna **`timestamp`** como `AS time`
> * Una columna **categórica** como `AS metric` (nombre de nodo)
> * Una columna **numérica** como `AS value`

---

### 🗂️ Estructura del modelo

La tabla `tickets` contiene:

```sql
id SERIAL PRIMARY KEY,
cliente TEXT,
estado TEXT,
fecha_creacion TIMESTAMP,
fecha_actualizacion TIMESTAMP,
prioridad TEXT
```

Queremos pintar los nodos de estado (`Pendiente`, `Validado`, `Entregado`) en función de cuántos tickets fueron modificados recientemente a ese estado.

---

### 🪜 Pasos guiados

#### 1. Escribe una consulta válida para Diagram Panel

```sql
SELECT
  fecha_actualizacion AS time,
  estado AS metric,
  1 AS value
FROM tickets
WHERE $__timeFilter(fecha_actualizacion);
```

> Esta consulta devuelve una **serie temporal por estado**, compatible con Diagram Panel.

#### 2. Ejecuta la consulta en un panel Explore

* Elige el datasource PostgreSQL.
* Pega la consulta y selecciona un rango de tiempo (`Last 1 hour`, `Today`, etc.).
* Asegúrate de obtener múltiples filas con `time`, `metric`, `value`.

#### 3. Comprueba los valores de `estado`

> **Importante:** Los valores devueltos en `estado` deben coincidir con los **IDs de los nodos Mermaid** para que se refleje visualmente.

Puedes revisar los valores con:

```sql
SELECT DISTINCT estado FROM tickets;
```

---

### 🔁 Retos

1. 🧪 **Normaliza los nombres de estado para que coincidan con los nodos**

   > Tip: usa `REPLACE` y `LOWER` para evitar fallos por espacios o mayúsculas:

   ```sql
   SELECT
     fecha_actualizacion AS time,
     REPLACE(LOWER(estado), ' ', '_') AS metric,
     1 AS value
   FROM tickets
   WHERE $__timeFilter(fecha_actualizacion);
   ```

2. 🔀 **Filtra por cliente usando una variable de Grafana**

   > Tip: crea una variable `cliente` en el dashboard y úsala así:

   ```sql
   WHERE cliente = '${cliente}' AND $__timeFilter(fecha_actualizacion)
   ```

3. 📊 **Cambia el eje del análisis: agrupa por prioridad en lugar de estado**

   > Tip: reemplaza `estado` por `prioridad` como `metric` para crear otro tipo de diagrama.

4. ❌ **Explora qué ocurre si no hay datos en el rango seleccionado**

   > Tip: prueba con `Last 5 minutes` si no hay eventos recientes. Comprueba si el panel queda vacío o falla.

5. 🧵 **Agrupa por bloques de tiempo para suavizar la visualización**

   > Tip: usa `date_trunc('minute', fecha_actualizacion)` para obtener un resumen por minuto:

   ```sql
   SELECT
     date_trunc('minute', fecha_actualizacion) AS time,
     estado AS metric,
     COUNT(*) AS value
   FROM tickets
   WHERE $__timeFilter(fecha_actualizacion)
   GROUP BY time, estado
   ORDER BY time;
   ```

---

### ✅ Validaciones

* ✅ Las consultas devuelven columnas `time`, `metric`, `value`.
* ✅ Los valores de `metric` coinciden con los nodos Mermaid.
* ✅ El contenido del panel cambia al variar el rango temporal.

---

### 💬 Reflexión

Esta fase sienta las bases para el uso de SQL como **motor de visualización dinámica**. No se trata solo de mostrar datos, sino de transformarlos en una estructura que Diagram Panel pueda interpretar para pintar procesos. Dominar esta conversión es clave para representar flujos reales con datos en vivo.
