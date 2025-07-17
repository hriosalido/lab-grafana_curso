## 🔹 Fase 1 – Crear el SVG base con botones por zona

### 🎯 Objetivo

Diseñar en **draw\.io** un diagrama simple con botones de **arranque** y **parada** por cada etapa de la línea de producción alimentaria. Cada botón tendrá un `cell-id` único para ser enlazado a datos reales desde Grafana usando el plugin **Flow (by GE)**.

---

### 🛠️ Herramientas necesarias

* 🧩 **draw\.io** (preferiblemente versión escritorio)
* 📦 Plugin: `svgdata.js`
  (Activar en `Extras → Plugins → Add → svgdata.js`)

---

### 📐 Diseño del diagrama

1. Abre draw\.io y crea un nuevo diagrama en blanco.
2. Dibuja una estructura horizontal con 3 etapas:
   **Envasado**, **Etiquetado**, **Paletizado**
3. Para cada etapa:

   * Añade un botón de **arranque** (círculo verde)
   * Añade un botón de **parada** (círculo rojo)

   Ejemplo para Envasado:

   * Botón arranque → `arranques_env`
   * Botón parada → `paradas_env`

---

### 🧾 Asignar ID a cada celda

1. Haz clic en un botón.
2. Menú: `Editar → Edit Data`
3. Añade/edita el campo `id` con los siguientes valores:

| Zona       | Botón tipo | `cell-id`       |
| ---------- | ---------- | --------------- |
| Envasado   | Arranque   | `arranques_env` |
| Envasado   | Parada     | `paradas_env`   |
| Etiquetado | Arranque   | `arranques_eti` |
| Etiquetado | Parada     | `paradas_eti`   |
| Paletizado | Arranque   | `arranques_pal` |
| Paletizado | Parada     | `paradas_pal`   |

Estos IDs serán usados luego en el YAML (`cellIdPreamble: "cell-"`), así que asegúrate de que coincidan exactamente.

---

### 💾 Exportar como SVG

1. Menú: `Archivo → Exportar como → SVG…`
2. Marca estas opciones:

   * ✅ *Incluir contenido*
   * ✅ *Área de dibujo completa*
   * ✅ *Incrustar datos (y estilos CSS)*
3. Guarda el archivo como `linea_produccion.svg`

---

### ✅ Resultado esperado

Un archivo `.svg` con 6 botones, cada uno con su `cell-id`, y un diseño claro y sencillo que representa las 3 zonas de la línea de producción.
