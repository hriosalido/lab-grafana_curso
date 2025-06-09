## 📘 Guía del Alumno

# 🧭 Curso: Visualización de Flujos de Negocio en Grafana

**Duración total:** 25 horas
**Formato:** 10 sesiones de 2,5 horas
[fundamentos](https://fundamentos-de-visualiza-xfbvyua.gamma.site/)

---

## Sesión 1: Fundamentos de Visualización

### 🎯 Objetivo de la sesión

* Comprender qué es un flujo de negocio y cómo representarlo.
* Conocer los fundamentos de visualización orientada a procesos.
* Aprender a usar Diagram Panel para construir visualizaciones básicas.
* Iniciar el entorno de trabajo personal desde Codespaces.

---

### 🧱 Scaffold necesario

Asegúrate de tener acceso a los siguientes archivos dentro del repositorio clonado:

```
📁 ./data/
├── pedidos.csv         # Dataset de ejemplo con estados del proceso

📁 ./dashboards/
├── flujo_pedidos.json  # (opcional) Ejemplo de dashboard ya creado
```

El entorno se inicia con:

```bash
docker-compose up
```

Accede a Grafana en: [http://localhost:3000](http://localhost:3000)
Usuario: `admin` · Contraseña: `admin`

---

### 🧪 Laboratorio: Visualizar flujo de pedidos con Diagram Panel

#### 🔹 Fase 1: Crear nuevo dashboard

* Abre Grafana → Dashboards → New → Add New Panel.
* Elige **Diagram Panel** como tipo.

#### 🔹 Fase 2: Cargar el flujo

* Edita el contenido del panel y define los nodos: `Nuevo`, `Procesando`, `Enviado`, `Entregado`.
* Usa `pedidos.csv` como fuente para determinar cuántos pedidos hay en cada estado.

#### 🔹 Fase 3: Añadir colores por estado

* Define reglas visuales para colorear los nodos según estado (`green`, `yellow`, `orange`, `red`).

#### 🔹 Fase 4: Interacción básica

* Añade enlaces entre nodos si aplica.
* Prueba que el usuario pueda seguir el flujo visualmente.

---

### 🔍 Validación final

✅ El dashboard debe mostrar los nodos del flujo.
✅ Cada nodo refleja correctamente el número de pedidos.
✅ Los colores cambian en función del estado.
✅ La navegación entre elementos es fluida (si aplica).

---

### 💡 Reflexión final

* ¿Qué decisiones visuales ayudaron más a entender el flujo?
* ¿Dónde colocarías información adicional como KPIs o métricas de alerta?
* ¿Qué otros procesos de tu empresa podrían representarse con esta técnica?

---

Este README será tu punto de referencia para la **Sesión 1**. Puedes volver a él si necesitas rehacer el panel o adaptarlo a un nuevo proceso.
