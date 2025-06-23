
## 🔹 Fase 6 – Añadir detalle en tabla y paneles complementarios

---

### 🎯 Objetivo

Construir paneles adicionales que acompañen al diagrama principal para proporcionar información en tiempo real sobre los tickets: últimas actualizaciones, distribución por prioridad, y evolución de actividad. Estos elementos permiten complementar el flujo visual con datos más específicos y auditables.

---

### 🗂️ Estructura esperada

* Diagrama de flujo (Diagram Panel)
* Panel tipo Table con últimos tickets modificados
* Panel tipo Stat con tickets abiertos hoy
* Panel tipo Bar gauge por prioridad (si se desea)

---

### 🪜 Pasos guiados

#### 1. Panel tipo Table – Últimos tickets modificados

Consulta:

```sql
SELECT
  id,
  cliente,
  estado,
  prioridad,
  fecha_actualizacion
FROM tickets
WHERE $__timeFilter(fecha_actualizacion)
ORDER BY fecha_actualizacion DESC
LIMIT 10;
```

> Tip: Asegúrate de que las columnas estén correctamente configuradas en el panel para mejorar legibilidad (oculta `id` si es irrelevante).

#### 2. Panel tipo Stat – Tickets abiertos hoy

Consulta:

```sql
SELECT
  COUNT(*) AS value
FROM tickets
WHERE fecha_creacion >= CURRENT_DATE;
```

> Este panel mostrará un número total de tickets abiertos hoy.

#### 3. Panel tipo Bar Gauge – Distribución por prioridad

Consulta:

```sql
SELECT
  prioridad AS metric,
  COUNT(*) AS value
FROM tickets
WHERE $__timeFilter(fecha_actualizacion)
GROUP BY prioridad;
```

> Puedes usar un **Bar Gauge**, **Pie Chart** o **Time series** para visualizar.

---

### 🔁 Retos

1. 🔍 **Agregar un panel de alerta visual**

   > Tip: Si el número de tickets pendientes supera 20, muestra un Stat en rojo (usa "Thresholds").

   Consulta:

   ```sql
   SELECT COUNT(*) AS value FROM tickets WHERE estado = 'Pendiente' AND $__timeFilter(fecha_actualizacion);
   ```

2. 🧪 **Combinar filtros de variables de dashboard**

   > Tip: Aplica filtros por cliente o estado mediante variables y modifica tus consultas:

   ```sql
   SELECT * FROM tickets WHERE estado = '${var-estado}' AND cliente = '${var-cliente}' AND $__timeFilter(fecha_actualizacion);
   ```

3. 📆 **Visualizar evolución diaria de creación de tickets**

   > Tip: Ideal con panel de tipo "Time Series":

   ```sql
   SELECT
     date_trunc('day', fecha_creacion) AS time,
     COUNT(*) AS value
   FROM tickets
   WHERE $__timeFilter(fecha_creacion)
   GROUP BY time
   ORDER BY time;
   ```

---

### ✅ Validaciones

* ✅ Las tablas muestran datos en orden cronológico.
* ✅ Los KPIs cambian dinámicamente con el rango de tiempo.
* ✅ Las métricas se pueden filtrar por variables si se desea.
* ✅ Los paneles son coherentes con el flujo Mermaid.

---

### 💬 Reflexión

Los paneles adicionales permiten pasar del **seguimiento visual abstracto** a la **comprobación concreta de datos**. Esta combinación es clave en entornos reales de soporte, mantenimiento, operaciones o atención al cliente, donde los KPIs y los detalles deben coexistir con la visión de alto nivel.
