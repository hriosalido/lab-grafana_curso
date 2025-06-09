## 📘 Guía del Alumno

# 🧭 Curso: Visualización de Flujos de Negocio en Grafana

**Duración total:** 25 horas
**Formato:** 10 sesiones de 2,5 horas
**Modalidad:** Remoto (videoconferencia)

---

## 🎯 Objetivo del Curso

Este curso está diseñado para ayudarte a dominar la representación visual de procesos de negocio mediante Grafana, sin necesidad de infraestructura de observabilidad avanzada. Al finalizar, serás capaz de:

* Diseñar dashboards profesionales basados en procesos y estados.
* Usar datos planos (CSV, SQL, JSON) para crear visualizaciones funcionales.
* Incorporar herramientas de interactividad, navegación y alertado.
* Aplicar buenas prácticas de diseño visual para mejorar la comprensión y usabilidad.

Trabajaremos en un entorno completamente preparado en Codespaces, utilizando herramientas reales, datasets simulados y laboratorios guiados.

---

## 📚 Plan de Sesiones

### ✅ Práctica Inicial: Clona tu entorno de trabajo

Antes de comenzar la primera sesión, realiza esta práctica obligatoria:

**Objetivo:** Crear una copia personal del entorno del curso en tu cuenta de GitHub para poder trabajar con autonomía.

**Pasos:**

1. Accede al repositorio base del curso.
2. Haz clic en el botón **"Fork"** (esquina superior derecha).
3. Asegúrate de forkarlo a tu usuario personal.
4. Una vez creado el fork, abre Codespaces desde tu fork usando la opción "Code → Codespaces → Create new".
5. Espera a que se configure el entorno automáticamente.
6. Abre un terminal y ejecuta `docker-compose up` para levantar el entorno de prácticas.

**Validación:**

* Puedes acceder a Grafana en `http://localhost:3000`.
* El dashboard inicial debe cargar sin errores.

A partir de aquí, cada sesión se basará en el entorno que acabas de crear.

---

### 📌 Sesión 1: Fundamentos de Visualización en Grafana

**Qué aprenderás:** Principios básicos de visualización de procesos. Introducción a Diagram Panel.
**Laboratorio:** Crearás un flujo de pedidos visual a partir de `pedidos.csv`, representando nodos y transiciones clave.

### 🎨 Sesión 2: Diseño Visual y Buenas Prácticas

**Qué aprenderás:** Uso de codificación visual (colores, estilos) y claridad en la presentación de datos.
**Laboratorio:** Mejorarás un dashboard existente con ajustes visuales que faciliten la lectura.

### 🗄️ Sesión 3: Conexión de Datos (CSV y SQL)

**Qué aprenderás:** Conectar Grafana a archivos CSV o bases de datos SQL. Introducción al panel Status Map.
**Laboratorio:** Visualizarás múltiples estados simultáneos desde fuentes estructuradas.

### 🧮 Sesión 4: Modelado de Estados con SQL y Filtros

**Qué aprenderás:** Crear vistas SQL que reflejen el estado actual de procesos y permitir filtrado interactivo.
**Laboratorio:** Implementarás un panel basado en condiciones dinámicas y rangos definidos.

### 🧩 Sesión 5: Plugins Avanzados de Visualización

**Qué aprenderás:** Diagram Panel, FlowCharting y Node Graph aplicados a flujos y jerarquías.
**Laboratorio:** Construirás visualizaciones complejas combinando distintos estilos y conexiones.

### 🧭 Sesión 6: Interactividad y Tooltips

**Qué aprenderás:** Usar SVG y tooltips contextuales para enriquecer la interacción en el panel.
**Laboratorio:** Crearás un panel interactivo con navegación e información sensible al contexto.

### 🧷 Sesión 7: Jerarquías y Navegación Contextual

**Qué aprenderás:** Definir variables y enlaces entre dashboards. Implementación de drilldowns.
**Laboratorio:** Establecerás una estructura maestro-detalle usando variables.

### 🧰 Sesión 8: Dashboards Overview/Detalle

**Qué aprenderás:** Combinar paneles globales y detallados, trabajando con filtros cruzados.
**Laboratorio:** Crearás un dashboard general con enlaces a vistas específicas por proceso o estado.

### 📊 Sesión 9: Introducción a Prometheus y Alertado

**Qué aprenderás:** Simular métricas con Pushgateway y visualizarlas en Grafana con Prometheus.
**Laboratorio:** Ejecutarás scripts Python para generar datos y configurarás la visualización.

### 🚨 Sesión 10: Visualización de Alertas Funcionales

**Qué aprenderás:** Crear y representar alertas visuales en los paneles.
**Laboratorio:** Activarás condiciones de alerta y comprobarás su reflejo visual en tiempo real.

---

## 🧪 Metodología de Trabajo

Durante el curso:

* Tendrás una breve introducción teórica en cada sesión.
* Verás una demo guiada del profesor.
* Realizarás un laboratorio dividido en fases, con instrucciones detalladas y validaciones.
* Podrás consultar y reutilizar ejemplos reales y configuraciones preparadas.

---

## 🔧 Entorno de Prácticas

Se utilizará un entorno Docker ya montado en GitHub Codespaces, compuesto por:

* **Grafana** con plugins CSV, FlowCharting y BoomTable
* **Prometheus** y **Pushgateway** para simulación de métricas
* **Servidor estático** para servir datasets (`/data/`)

Archivos disponibles:

* `./data/pedidos.csv`, `flujo.svg`, `kpis.json`
* `./labs/flujo_pedidos.py`
* `./prometheus/prometheus.yml`

---

## 📌 Cómo Seguir el Curso

1. Entra al Codespace y arranca el entorno con `docker-compose up`.
2. Abre el puerto 3000 para acceder a Grafana.
3. Sigue las fases del laboratorio de cada sesión.
4. Valida tu resultado: cada ejercicio debe producir un panel funcional.
5. Consulta el README de cada sesión si necesitas repasar conceptos o ejemplos.

---

Este documento es tu guía de referencia. Úsalo como índice general del curso para orientarte durante las sesiones, repasar conceptos y validar tu progreso.
