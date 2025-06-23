

# 🗄️ Laboratorio 05 – Datos estructurados: conexión SQL y visualización en Grafana

---

## 🧠 Introducción conceptual

### 🔸 ¿Por qué usar SQL?

* Refleja sistemas reales en producción: ERPs, CRMs, sistemas de tickets.
* Permite consultar directamente estados de procesos, sin necesidad de ETLs previos.
* Integración directa desde Grafana como datasource sin necesidad de backends intermedios.

### 🔸 Casos típicos de visualización

* Ciclo de vida de tickets o incidencias (`creado → asignado → resuelto`).
* Órdenes de trabajo en planta o producción (`generada → en curso → finalizada`).
* Estados de pedidos, tareas o solicitudes (`pendiente → validado → entregado`).

### 🔸 Esquema de ejemplo

Tabla `tickets`:

```sql
id SERIAL PRIMARY KEY,
cliente TEXT,
estado TEXT,
fecha_creacion TIMESTAMP,
fecha_actualizacion TIMESTAMP,
prioridad TEXT
```

---

## 📚 Requisitos previos

* Docker Compose operativo con servicio PostgreSQL incluido.
* Dataset inicial (`tickets.sql`) cargado en la base de datos.
* Plugin SQL habilitado en Grafana.
* Diagram Panel activo.

---

## 🔹 Fase 1 – Cargar y validar base de datos estructurada

🎯 Crear base `negocio`, tabla `tickets`, e insertar valores simulados. Verificar mediante psql o Adminer.

---

## 🔹 Fase 2 – Conectar Grafana al SQL datasource

🎯 Añadir nuevo datasource PostgreSQL, establecer credenciales y probar conexión.

---

## 🔹 Fase 3 – Consultas base para el modelado visual

🎯 Escribir y validar queries como:

```sql
SELECT estado, COUNT(*) FROM tickets GROUP BY estado;
SELECT id, estado, prioridad FROM tickets WHERE fecha_actualizacion >= now() - interval '1 day';
```

---

## 🔹 Fase 4 – Diagram Panel con nodos basados en SQL

🎯 Crear flujo Mermaid estático (ej. ciclo de vida ticket) y colorear nodos con variables basadas en resultados SQL (estado → color o clase CSS).

---

## 🔹 Fase 5 – Enlazar nodos con drilldown o dashboards

🎯 Usar `click` para que cada nodo redirija a un dashboard filtrado por estado o ID.

```mermaid
click RES "d/detalle?var-estado=Resuelto" "Ver tickets resueltos"
```

---

## 🔹 Fase 6 – Añadir detalle en tabla y paneles complementarios

🎯 Crear panel Table con los últimos tickets modificados y un panel Stat con tickets abiertos hoy.

---

## 🔹 Fase 7 – Dashboard completo con flujo + KPIs SQL

🎯 Montar un dashboard combinado:

* Diagrama de estados
* Tabla de detalles
* Contador de incidencias por prioridad
* Filtro por cliente y por estado (variables de Grafana)
