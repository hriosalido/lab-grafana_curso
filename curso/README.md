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

## 📅 Plan de Sesiones – Curso: Visualización de Flujos de Negocio en Grafana

---

### 📌 Sesión 1: Fundamentos de Diagram Panel y Mermaid

**Qué aprenderás:**
Comprenderás los principios básicos de visualización de procesos y aprenderás a usar el plugin Diagram Panel en Grafana sin necesidad de datos externos.
**Laboratorio:**
Construirás diagramas Mermaid en modo "hardcoded" con distintos tipos de formas, conexiones, subgraphs y estilos visuales.

---

### 🎨 Sesión 2: Diseño Visual y Buenas Prácticas

**Qué aprenderás:**
Aplicarás codificación visual (colores, bordes, estilos), disposición de nodos y claridad gráfica para representar procesos de negocio.
**Laboratorio:**
Mejorarás diagramas Mermaid ya creados incorporando estilos de nodo, jerarquía visual, comentarios y pruebas con temas oscuros y claros.

---

### 🧩 Sesión 3: Subgraphs, Composición y Jerarquías

**Qué aprenderás:**
Organizarás procesos en bloques lógicos con `subgraph`, representarás jerarquías, paralelismos y bifurcaciones.
**Laboratorio:**
Diseñarás un flujo complejo con agrupaciones y condicionales usando Mermaid.

---

### 💬 Sesión 4: Variables, Tooltips y Texto Dinámico

**Qué aprenderás:**
Usarás variables de Grafana (`$var`) dentro del diagrama, tooltips enriquecidos y etiquetas contextuales.
**Laboratorio:**
Crearás nodos que respondan a selecciones externas o muestren información enriquecida con texto interpolado.

---

### 📁 Sesión 5: Introducción a Datos (sin conexión)

**Qué aprenderás:**
Simularás valores de métricas (manualmente) para colorear nodos según estados o indicadores visuales.
**Laboratorio:**
Probarás umbrales, colores de fondo y estilos condicionados en Diagram Panel sin necesidad de conectar fuentes.

---

### 🗄️ Sesión 6: Conexión de Datos Reales – CSV

**Qué aprenderás:**
Conectarás una fuente CSV con Grafana y vincularás los datos con los nodos Mermaid del panel.
**Laboratorio:**
Leerás estados desde `pedidos.csv` y reflejarás los resultados en cada nodo del flujo.

---

### 🧮 Sesión 7: SQL y Modelado de Estados

**Qué aprenderás:**
Conectarás una base de datos SQL, crearás vistas que reflejen procesos y filtrarás por condiciones.
**Laboratorio:**
Visualizarás flujos con métricas agregadas y filtros interactivos sobre los nodos.

---

### 🧷 Sesión 8: Enlaces entre Dashboards y Drilldowns

**Qué aprenderás:**
Definirás variables y navegación contextual (drilldowns) entre dashboards.
**Laboratorio:**
Configurarás un flujo maestro-detalle donde cada nodo enlaza a vistas específicas.

---

### 📊 Sesión 9: Simulación de Métricas con Prometheus

**Qué aprenderás:**
Simularás estados o cargas usando Pushgateway y las visualizarás como parte del flujo con métricas reales.
**Laboratorio:**
Generarás métricas con scripts y las representarás visualmente según umbrales.

---

### 🚨 Sesión 10: Visualización de Alertas Funcionales

**Qué aprenderás:**
Crearás alertas visuales basadas en condiciones reales y representarás su activación en el flujo de negocio.
**Laboratorio:**
Diseñarás una vista que combine alertas, métricas y transiciones, reaccionando en tiempo real.

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
