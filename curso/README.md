# 📘 README – Curso: Visualización de Flujos de Negocio en Grafana

**Duración total:** 25 horas
**Formato:** 10 sesiones de 2,5 horas
**Entorno:** Codespaces con Docker Compose (Grafana, Prometheus, Pushgateway)

---

## 🎯 Objetivos del curso

* Comprender los principios del diseño visual orientado a flujos de negocio.
* Representar procesos, etapas y estados mediante paneles personalizados en Grafana.
* Usar plugins avanzados como Diagram Panel, FlowCharting, Status Map y Node Graph.
* Aprovechar fuentes de datos simples (CSV, SQL, JSON, API) sin necesidad de Prometheus.
* Introducir conceptos básicos de observabilidad con Prometheus y Pushgateway.
* Diseñar una alerta funcional y reflejarla visualmente en el dashboard.

---

## 🌎 Perfil del alumnado

Técnicos con experiencia básica en Grafana que desean representar procesos de negocio de forma visual y dinámica. No se presupone experiencia con observabilidad, Prometheus ni infraestructura de métricas.

---

## 📅 Plan de sesiones

### ✅ Práctica Inicial (antes de la Sesión 1)

Clonar y configurar el entorno personal en GitHub Codespaces. Validar acceso a Grafana y entorno Docker.

---

### 📌 Sesión 1 – Fundamentos de Diagram Panel y Mermaid

**Qué aprenderás:** Sintaxis Mermaid, tipos de nodos, flujos básicos, agrupaciones y estilo visual sin datos.
**Laboratorio:** Diagramas Mermaid hardcoded por fases: formas, subgraphs, condiciones, variables, iconos.

---

### 🎨 Sesión 2 – Diseño Visual y Buenas Prácticas

**Qué aprenderás:** Claridad visual, jerarquía, codificación por colores, uso de tooltips y disposición óptima.
**Laboratorio:** Refactorizar diagramas anteriores para mejorar su legibilidad y expresividad visual.

---

### 🧩 Sesión 3 – Representación jerárquica y flujos complejos

**Qué aprenderás:** Rutas condicionales, ciclos, excepciones, decisiones anidadas, subgraphs enlazados.
**Laboratorio:** Modelar un flujo con caminos alternativos y lógicos realistas de negocio.

---

### 📁 Sesión 4 – Datos planos: uso de CSV y JSON

**Qué aprenderás:** Conectar Diagram Panel a fuentes como archivos `.csv` y `.json`, y colorear nodos por estado.
**Laboratorio:** Cargar `pedidos.csv` y visualizar el estado de cada pedido directamente en el diagrama.

---

### 🗄️ Sesión 5 – Datos estructurados: conexión SQL

**Qué aprenderás:** Conectar a una base de datos, crear consultas y representar procesos con tablas reales.
**Laboratorio:** Modelar el estado actual de tickets o procesos desde SQL y vincularlo visualmente.

---

### 🔌 Sesión 6 – Plugins visuales avanzados (FlowCharting, Status Map)

**Qué aprenderás:** Usar SVG con FlowCharting, matrices con Status Map, y asociar métricas a nodos personalizados.
**Laboratorio:** Importar un SVG, enlazarlo a datos reales y añadir tooltips con KPIs.

---

### 🧭 Sesión 7 – Dashboards overview/detalle y navegación contextual

**Qué aprenderás:** Crear estructuras maestro-detalle, usar variables, filtros y enlaces entre dashboards.
**Laboratorio:** Crear un dashboard overview con navegación hacia detalles por ID de proceso o cliente.

---

### 💬 Sesión 8 – Interactividad y personalización dinámica

**Qué aprenderás:** Usar variables de usuario, condiciones visuales y reglas de visualización adaptativa.
**Laboratorio:** Mostrar texto y estilos condicionados por selección (`${var}`), mostrar u ocultar paneles.

---

### 📊 Sesión 9 – Integración básica con Prometheus

**Qué aprenderás:** Enviar métricas simuladas con Pushgateway, consumirlas desde Prometheus y visualizarlas.
**Laboratorio:** Ejecutar scripts de simulación y ver el resultado reflejado dinámicamente en el dashboard.

---

### 🚨 Sesión 10 – Alertas funcionales y visualización en Grafana

**Qué aprenderás:** Crear alertas Prometheus basadas en condiciones de negocio y visualizar su activación.
**Laboratorio:** Disparar alertas reales, usar colores, iconos y mensajes para reflejar el estado en tiempo real.

---

## 📚 Recursos del curso

* Repositorio Codespaces con entorno preconfigurado.
* Archivos de datos: `pedidos.csv`, `kpis.json`, `flujo.svg`.
* Scripts Python de simulación de procesos (`labs/flows/*.py`).
* Dashboards `.json` exportables por sesión.
* Plantillas SVG para usar con FlowCharting.
* Cheatsheets: Mermaid, variables de Grafana, PromQL básico.

---

Este documento es tu guía de referencia. Úsalo para orientarte en cada sesión, revisar objetivos y preparar tu entorno antes de cada laboratorio.
