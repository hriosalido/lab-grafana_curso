
## 🔹 Fase 4 – Diagram Panel con nodos dinámicos basados en SQL

---

### 🎯 Objetivo

Crear un diagrama Mermaid en Diagram Panel que represente visualmente los **estados de los tickets**. Los nodos se activan y se colorean dinámicamente según los eventos registrados en la base de datos, utilizando datos SQL estructurados en forma de **serie temporal**.

---

### 🗂️ Requisitos

* Haber completado la fase anterior: tener una consulta SQL que devuelva `time`, `metric`, `value`.
* El nombre del nodo Mermaid debe coincidir exactamente con el valor de `metric`.
* Solo funciona si `value` es **numérico** y **varía en el tiempo**.

---

### 🪜 Pasos guiados

#### 1. Crea un nuevo panel de tipo Diagram Panel

* Panel → Add Panel → Diagram.
* Selecciona el datasource SQL configurado.

#### 2. Usa la consulta de la Fase 3 como fuente

```sql
SELECT
  fecha_actualizacion AS time,
  estado AS metric,
  1 AS value
FROM tickets
WHERE $__timeFilter(fecha_actualizacion);
```

> Asegúrate de que `estado` solo contenga valores esperados: `Pendiente`, `Validado`, `Entregado`, etc.

#### 3. Escribe el flujo Mermaid en el panel

```mermaid
graph LR
  Pendiente --> Validado --> Entregado
```

> Puedes añadir nodos intermedios si los estados reales lo requieren.

#### 4. Define clases Mermaid manualmente (por ahora)

```mermaid
classDef activo fill:#4caf50,stroke:#2e7d32,color:#fff;
classDef alerta fill:#ff9800,stroke:#ef6c00,color:#fff;
classDef critico fill:#f44336,stroke:#b71c1c,color:#fff;
```

> Aunque Diagram Panel aún **no soporta mappings automáticos estables**, puedes **forzar clases con lógica condicional más adelante** si enriqueces el Mermaid.

#### 5. Comprobación visual

* Cambia el rango de tiempo del dashboard.
* Si los nombres coinciden con `metric`, los nodos se activan (colorean o resaltan).
* El panel puede no colorear correctamente si los datos no se interpretan como serie → volver a revisar consulta.

---

### 🔁 Retos

1. 🧪 **Normaliza los nombres de estado para asegurar coincidencia exacta**

   > Tip: Usa `REPLACE` y `LOWER` para transformar valores como `"En Curso"` → `"en_curso"` y reflejarlo en el nodo Mermaid.

2. 🎯 **Crea versiones alternativas del flujo para otros procesos**

   > Tip: Por ejemplo: `Registrado → Revisado → Aprobado → Ejecutado`.

3. 🔀 **Agrega enlaces de navegación en los nodos**

   ```mermaid
   click Validado "d/detalle?var-estado=Validado" "Ver tickets validados"
   ```

   > Tip: Esto funciona incluso sin mapeo de color, y añade navegabilidad entre dashboards.

4. 📊 **Cambia el criterio de activación: por prioridad en vez de estado**

   > Tip: Modifica la consulta y el diagrama para visualizar `"Alta" → "Media" → "Baja"` en función de urgencia de los tickets.

---

### ✅ Validaciones

* ✅ El diagrama se renderiza sin errores.
* ✅ Los nombres de los nodos coinciden con `metric`.
* ✅ El contenido del panel cambia al variar el tiempo.
* ✅ Puedes ver los eventos reflejados en los nodos.

---

### 💬 Reflexión

Diagram Panel, aunque limitado, permite representar flujos de negocio con datos vivos si se respetan sus requisitos técnicos. En esta fase hemos unido **modelo de datos SQL** con **visualización de procesos**, algo que no suele hacerse en Grafana. Este enfoque permite ver directamente el pulso del negocio desde su base de datos.