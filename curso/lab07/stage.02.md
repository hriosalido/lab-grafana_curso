

## 🔹 Fase 2 – Configurar Panel Flow en Grafana y cargar SVG

### 🎯 Objetivo

Crear un **Flow Panel** en Grafana y asociarle el SVG exportado en la fase anterior. Comprobar que los IDs de los botones se reconocen correctamente y que el panel carga el diagrama sin errores.

---

### 🛠️ Requisitos previos

* El archivo `linea_produccion.svg` exportado desde draw\.io (con plugin `svgdata.js` activado).
* Tener instalado y habilitado el plugin **Flow (by GE)** en Grafana.

---

### 🧭 Pasos para crear el panel

1. Abre Grafana y accede a un **dashboard nuevo o existente**.
2. Añade un nuevo panel:
   `➕ Add panel → Flow (by GE)`
3. En el panel:

   * Ve a la pestaña **SVG**
   * Activa la opción: `Edit as text`
   * Abre el archivo `linea_produccion.svg` en VS Code
   * Copia todo el contenido del SVG
   * Pega el contenido completo en el editor del panel

---

### 📌 Verificación de estructura

* Una vez pegado el SVG, asegúrate de que los botones aparecen correctamente.
* Abre la pestaña **Debug > Mappings**:

  * Deberías ver los `cell-id` definidos:
    `arranques_env`, `paradas_env`, etc.
  * Verifica que todos están listados. Si no aparecen, es posible que el plugin `svgdata.js` no estuviera activado al exportar.

---

### 🧾 Ejemplo de fragmento SVG correcto

Debes ver estructuras así en el SVG pegado:

```xml
<g data-cell-id="arranques_env">
  <g id="cell-arranques_env" ...>
    ...
  </g>
</g>
```

Esto asegura que el plugin Flow pueda identificar los botones y asociarlos con métricas posteriormente.

---

### 🧪 Consejos de depuración

1. Si los `cell-id` no aparecen:

   * Revisa que el plugin `svgdata.js` estuviera cargado al exportar.
   * Intenta reexportar usando *Export as SVG* (no *Save as*).

2. Si el panel se ve vacío:

   * Verifica que el SVG tenga contenido visual (círculos, texto, etc.)
   * Usa `Inspect > Console` para ver errores.

---

### ✅ Resultado esperado

Un panel en Grafana con el SVG cargado correctamente y todos los botones (`arranque` y `parada` por zona) reconocidos por el Flow plugin como `cells`.
