

## 🔹 Fase 2 – Conectar Grafana al SQL datasource

---

### 🎯 Objetivo

Establecer conexión entre Grafana y la base de datos PostgreSQL donde residen los datos estructurados de negocio (ej. tickets). Esta conexión permitirá lanzar consultas SQL directamente desde los paneles, sin necesidad de ETL o backend intermedio.

---

### 📦 Contexto

* El servicio PostgreSQL ya está operativo a través de Docker Compose.
* El dataset `tickets.sql` se ha cargado correctamente en la base `negocio`.
* Grafana está accesible vía `localhost:3000`.
* Ya está instalado el plugin nativo de **PostgreSQL** como datasource en Grafana.

---

### 🪜 Pasos guiados

#### 1. Abrir configuración de datasources

Desde el menú lateral de Grafana:

> ⚙️ **Configuration** → **Data sources** → **Add data source**

#### 2. Seleccionar PostgreSQL

Escoge el tipo de datasource `PostgreSQL`.

#### 3. Completar la configuración

Rellena los campos con los datos de conexión definidos en Docker:

| Campo        | Valor                    |
| ------------ | ------------------------ |
| **Name**     | PostgreSQL Negocio       |
| **Host**     | `postgres:5432`          |
| **Database** | `negocio`                |
| **User**     | `grafana`                |
| **Password** | `grafana`                |
| **SSL Mode** | `disable`                |
| **Version**  | `15` (u otra compatible) |

Haz clic en **Save & Test**. Debes ver el mensaje ✅ *"Database Connection OK"*.

#### 4. Validar con consulta rápida

Entra en **Explore** y lanza:

```sql
SELECT NOW();
```

Luego prueba una de las tablas:

```sql
SELECT * FROM tickets LIMIT 5;
```

---

### 🧪 Comprobación clave

Grafana necesita que los datos estén en formato de **serie temporal** para integrarse con Diagram Panel. Eso significa que tus consultas deben incluir:

* Una columna `timestamp` como `AS time`
* Un identificador `AS metric` (por ejemplo, `estado`)
* Un valor numérico `AS value` (ej. cantidad o constante)

Ejemplo válido:

```sql
SELECT
  fecha_actualizacion AS time,
  estado AS metric,
  1 AS value
FROM tickets
WHERE $__timeFilter(fecha_actualizacion);
```

---

### ✅ Validaciones

* ✅ El datasource PostgreSQL aparece en la lista de datasources configurados.
* ✅ La conexión es exitosa con credenciales válidas.
* ✅ Puedes lanzar consultas SQL desde el panel Explore.
* ✅ Las consultas devuelven datos con formato compatible con Diagram Panel (`time`, `metric`, `value`).

---

### 💬 Reflexión

Esta fase permite abrir la puerta al modelado visual de procesos reales. La conexión directa con PostgreSQL habilita la consulta de flujos, estados y KPIs sin necesidad de exportar los datos ni transformarlos previamente. Sin embargo, la **visualización requiere adaptar el formato SQL a las limitaciones de Diagram Panel**, asegurando series temporales con métricas numéricas.

