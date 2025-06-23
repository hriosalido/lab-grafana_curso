

## 🔹 Fase 6 – Visualizar rendimiento por línea de producción

---

### 🎯 Objetivo

Construir un panel Diagram que represente cada línea de producción como un nodo visual, y colorearlo dinámicamente en función del volumen producido en el intervalo temporal activo. Esto permite detectar rápidamente líneas con baja producción, paros, o superación de umbrales deseados.

---

### 🗂️ Estructura

* Tabla: `produccion`

```sql
CREATE TABLE produccion (
  id SERIAL PRIMARY KEY,
  linea TEXT,             -- Ej: 'Línea 1', 'Línea 2'
  cantidad INT,           -- unidades producidas
  timestamp TIMESTAMP
);
```

* Cada nodo = una línea (`L1`, `L2`, `L3`, etc.)
* Valor = `SUM(cantidad)` por línea y rango de tiempo (`__timeFilter`)

---

### 🪜 Pasos guiados

1. **Insertar datos simulados en Adminer**

   ```sql
   INSERT INTO produccion (linea, cantidad, timestamp)
   VALUES
     ('L1', 150, NOW() - INTERVAL '10 minutes'),
     ('L2', 85, NOW() - INTERVAL '30 minutes'),
     ('L3', 20, NOW() - INTERVAL '45 minutes'),
     ('L4', 300, NOW() - INTERVAL '5 minutes');
   ```

2. **Crea una consulta de rendimiento por línea**

   ```sql
   SELECT
     linea AS metric,
     SUM(cantidad) AS value
   FROM produccion
   WHERE $__timeFilter(timestamp)
   GROUP BY linea;
   ```

   Esto te dará un valor de producción total por línea en el rango actual.

3. **Diseña un diagrama de líneas de producción**

   ```mermaid
   graph LR
     L1[Línea 1]
     L2[Línea 2]
     L3[Línea 3]
     L4[Línea 4]
   ```

4. **Define clases según rendimiento**

   ```mermaid
   classDef alto fill:#81c784,stroke:#2e7d32,color:#fff;
   classDef medio fill:#fff176,stroke:#fbc02d,color:#000;
   classDef bajo fill:#ef9a9a,stroke:#c62828,color:#fff;
   ```

5. **Mapea reglas de color dinámicas**

   Basado en cantidad producida:

   ```json
   [
     { "pattern": "L1", "thresholds": [50, 150], "classes": ["bajo", "medio", "alto"] },
     { "pattern": "L2", "thresholds": [50, 150], "classes": ["bajo", "medio", "alto"] },
     { "pattern": "L3", "thresholds": [50, 150], "classes": ["bajo", "medio", "alto"] },
     { "pattern": "L4", "thresholds": [50, 150], "classes": ["bajo", "medio", "alto"] }
   ]
   ```

   O usa mapeo general si los valores de `metric` coinciden con los nodos:

   ```sql
   SELECT linea AS metric, SUM(cantidad) AS value
   FROM produccion
   WHERE $__timeFilter(timestamp)
   GROUP BY linea;
   ```

---

### 🎯 Retos

1. 🔁 **Crear variable `linea` para filtrar producción por línea**

   En Dashboard Settings → Variables:

   ```sql
   SELECT DISTINCT linea FROM produccion ORDER BY linea;
   ```

2. 📉 **Comparar contra objetivo (target)**

   Suponiendo un objetivo de 100 unidades por hora:

   ```sql
   SELECT
     linea,
     SUM(cantidad) AS produccion,
     100 AS objetivo
   FROM produccion
   WHERE $__timeFilter(timestamp)
   GROUP BY linea;
   ```

3. 🧪 **Agregar clic para ver detalle histórico por línea**

   ```mermaid
   click L2 "d/detalle-linea?var-linea=L2" "Ver historial Línea 2"
   ```

---

### ✅ Validaciones

* ✅ Cada nodo representa una línea con color en función de su producción.
* ✅ El rango temporal del dashboard afecta al resultado.
* ✅ Producciones bajas se colorean en rojo, medias en amarillo, altas en verde.
* ✅ Los datos se obtienen como series temporales desde SQL.

---

### 💬 Reflexión

Esta fase permite usar Diagram Panel para construir **dashboards operativos de producción** sin necesidad de herramientas de control industrial. Es útil en logística, manufactura, mantenimiento y cualquier escenario donde haya múltiples unidades funcionales que deban compararse en tiempo real.
