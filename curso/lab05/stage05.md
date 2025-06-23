
## 🔹 Fase 5 – Visualizar alarmas activas por severidad y dispositivo

---

### 🎯 Objetivo

Crear un panel Diagram que represente cada dispositivo o subsistema como un nodo, coloreado según la severidad de la última alarma activa asociada. Esta vista simula un entorno de supervisión donde se pueden identificar rápidamente qué partes del sistema están en fallo, advertencia o en estado correcto.

---

### 🗂️ Estructura

* Tabla: `alarmas`

```sql
CREATE TABLE alarmas (
  id SERIAL PRIMARY KEY,
  dispositivo_id TEXT,
  severidad TEXT,       -- valores: 'critica', 'media', 'leve'
  activa BOOLEAN,
  timestamp TIMESTAMP
);
```

* Cada nodo = un `dispositivo_id`
* Valor = severidad de la alarma activa más reciente por dispositivo
* Visualización: Diagram Panel (SCADA view)

---

### 🪜 Pasos guiados

1. **Insertar datos simulados en Adminer**

   ```sql
   INSERT INTO alarmas (dispositivo_id, severidad, activa, timestamp)
   VALUES
     ('SENSOR_1', 'critica', true, NOW() - interval '2 minutes'),
     ('SENSOR_2', 'media', true, NOW() - interval '10 minutes'),
     ('SENSOR_3', 'leve', true, NOW() - interval '1 hour'),
     ('SENSOR_4', 'critica', false, NOW() - interval '2 hours');
   ```

2. **Crear una consulta para el último estado por dispositivo**

   ```sql
   SELECT DISTINCT ON (dispositivo_id)
     dispositivo_id AS metric,
     severidad AS value
   FROM alarmas
   WHERE activa = true
   ORDER BY dispositivo_id, timestamp DESC;
   ```

   Esto devuelve el último valor de severidad activa por cada dispositivo.

3. **Diseñar el bloque Mermaid con los nodos SCADA**

   ```mermaid
   graph TD
     SENSOR_1[Sensor 1]
     SENSOR_2[Sensor 2]
     SENSOR_3[Sensor 3]
     SENSOR_4[Sensor 4]

     click SENSOR_1 "d/detalle?var-dispositivo=SENSOR_1" "Ver Sensor 1"
   ```

4. **Configurar estilos según severidad**

   ```mermaid
   classDef critica fill:#e53935,stroke:#b71c1c,color:#fff;
   classDef media fill:#fdd835,stroke:#f57f17,color:#000;
   classDef leve fill:#81c784,stroke:#2e7d32,color:#000;
   ```

5. **Asignar colores con lógica dinámica**

   En el panel Diagram:

   ```json
   [
     { "pattern": "SENSOR_1", "value": "critica", "class": "critica" },
     { "pattern": "SENSOR_2", "value": "media", "class": "media" },
     { "pattern": "SENSOR_3", "value": "leve", "class": "leve" }
   ]
   ```

   O generalizado si los valores de `metric` coinciden con los nodos:

   ```sql
   SELECT dispositivo_id AS metric, severidad AS value
   FROM (
     SELECT DISTINCT ON (dispositivo_id) *
     FROM alarmas
     WHERE activa = true
     ORDER BY dispositivo_id, timestamp DESC
   ) sub;
   ```

---

### 🎯 Retos

1. 🔁 **Crear panel Stat complementario con total de alarmas críticas**

   ```sql
   SELECT COUNT(*) FROM alarmas WHERE severidad = 'critica' AND activa = true;
   ```

2. 📉 **Representar cantidad acumulada de alarmas por severidad**

   ```sql
   SELECT severidad AS metric, COUNT(*) AS value
   FROM alarmas
   WHERE activa = true
   GROUP BY severidad;
   ```

3. 🧪 **Simular nuevos disparos de alarma desde Adminer**

   ```sql
   INSERT INTO alarmas (dispositivo_id, severidad, activa, timestamp)
   VALUES ('SENSOR_1', 'critica', true, NOW());
   ```

---

### ✅ Validaciones

* ✅ Cada nodo representa un dispositivo.
* ✅ El color refleja la severidad activa más reciente.
* ✅ Solo se muestran alarmas activas.
* ✅ Cambios en los datos se reflejan inmediatamente.

---

### 💬 Reflexión

Esta fase permite visualizar el **estado operativo por elemento físico o subsistema**. Es especialmente útil para arquitecturas SCADA, entornos industriales, redes de sensores o servicios distribuidos donde el fallo de un componente debe identificarse de forma inmediata y clara.
