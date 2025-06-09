## 🧾 Apuntes de apoyo — Sesión 1: Fundamentos de Visualización

Esta sección acompaña al trabajo de laboratorio con una explicación más amplia que puedes consultar antes, durante o después de realizar la práctica. Está pensada como guía conceptual y de contexto general para reforzar lo aprendido en la sesión.

---

### 📌 Qué entendemos por "flujo de negocio"

Un flujo de negocio representa una secuencia estructurada de actividades que se deben completar para conseguir un objetivo empresarial. Ejemplos típicos incluyen:

* Gestión de pedidos
* Atención al cliente
* Procesos de validación o aprobación
* Fabricación y logística

Estos flujos suelen tener estados definidos, transiciones entre ellos, responsables asignados y reglas de negocio asociadas.

Representarlos visualmente nos ayuda a:

* Diagnosticar cuellos de botella
* Comunicar procesos complejos de forma clara
* Supervisar el estado en tiempo real
* Detectar incidencias o ineficiencias

---

### 📈 Por qué usar Grafana para visualizar procesos

Aunque Grafana se asocia con métricas técnicas, su flexibilidad visual y extensibilidad lo hacen apto también para representar procesos de negocio. Sus ventajas clave:

* Admite múltiples fuentes de datos: CSV, SQL, APIs, JSON.
* Permite construir dashboards visuales muy personalizados.
* Su sistema de plugins permite extender la interfaz para representar flujos, nodos y estados.
* Puede incorporar condiciones visuales, navegación entre paneles, variables, alertas y enlaces.

---

### 🧩 ¿Qué es Diagram Panel y por qué lo usamos aquí?

Diagram Panel es un plugin que permite representar procesos como diagramas de flujo:

* Se dibujan nodos (estados) y conexiones (transiciones).
* Cada nodo puede tener un valor asociado, una condición de color o un tooltip.
* El diseño puede definirse en JSON o mediante interfaz visual.

En esta sesión usaremos Diagram Panel para representar gráficamente el estado de pedidos a partir de un archivo CSV.

---

### 📁 Nuestro ejemplo: `pedidos.csv`

Trabajaremos con un archivo llamado `pedidos.csv`, que contiene una lista de pedidos y su estado actual:

```
PedidoID,Estado
1,Nuevo
2,Nuevo
3,Procesando
4,Enviado
5,Entregado
...
```

Este archivo será nuestra fuente de datos para el primer panel del curso. Representaremos cada estado como un nodo, y contaremos cuántos pedidos hay en cada uno.

Queremos construir una visualización clara, directa y navegable que responda a preguntas como:

* ¿Cuántos pedidos están atascados en un estado?
* ¿Qué proporción ha llegado al final del flujo?
* ¿Dónde hay más carga operativa?

