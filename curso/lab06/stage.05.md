

## 🔹 Fase 5 – Retos prácticos para el alumno

> 💡 Cada reto incluye un *tip técnico* para ayudar sin dar la solución completa.

---

### 🎯 Reto 1 – Añadir múltiples celdas a un mismo SVG

**Objetivo**: extender el SVG para mostrar al menos 3 nodos dinámicos (`cpu`, `ram`, `disk`), cada uno vinculado a un dato diferente.

📌 *Tip*:

* Copia y pega rectángulos en tu SVG con `id="cpu"`, `id="ram"`, `id="disk"`.
* Añade sus `dataRef` correspondientes en el `config.yaml`.

---

### 🎯 Reto 2 – Asociar umbrales personalizados

**Objetivo**: define umbrales de color distintos para `cpu` (más agresivos) y `ram` (más permisivos).

📌 *Tip*:

```yaml
cpu:
  labelColor:
    thresholds:
      - { color: "green", level: 0 }
      - { color: "orange", level: 30 }
      - { color: "red", level: 60 }

ram:
  labelColor:
    thresholds:
      - { color: "green", level: 0 }
      - { color: "yellow", level: 70 }
      - { color: "red", level: 90 }
```

---

### 🎯 Reto 3 – Publicar tu propio SVG y YAML

**Objetivo**: clonar el repositorio base y modificarlo para usar tu propio diseño y configuración.

📌 *Tip*:

* Usa [draw.io](https://draw.io) o VSCode para generar el SVG.
* Sube a un repo GitHub y activa Pages desde `/docs`.

---

### 🎯 Reto 4 – Romper CORS y solucionarlo

**Objetivo**: simular un error de CORS sirviendo los archivos desde un origen distinto y **explicar la solución en una nota técnica**.

📌 *Tip*:

* Sirve tu SVG desde localhost o una URL sin `https`.
* Usa `curl -I` para verificar la cabecera `Access-Control-Allow-Origin`.

---

### 🎯 Reto 5 – Usar datos reales en vez de test data

**Objetivo**: cambiar el datasource de `grafana-testdata-datasource` a PostgreSQL, Prometheus o JSON externo, y mapear las métricas reales al SVG.

📌 *Tip*:

* Asegúrate de que la query devuelva valores **con alias** que coincidan con los `dataRef`.
* Puedes usar paneles tipo Table para validar resultados antes de integrarlos.

---

## 🧪 Validación

Al terminar los retos, el alumno debe tener:

* Un panel Flow conectado a múltiples métricas.
* Un SVG personalizado que cambia de color dinámicamente.
* Una comprensión práctica del problema de CORS.
* Recursos públicos servidos desde GitHub Pages o NGINX.

