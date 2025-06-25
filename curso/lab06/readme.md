

## 🧪 Laboratorio 06 – Visualización de SVG externo con datos en FlowPanel

### 🎯 Objetivo

Conectar un panel de tipo **Flow** en Grafana a un SVG alojado en GitHub Pages, y representar datos de una serie temporal (`Random Walk` o `CSV Content`) sobre ese SVG usando una configuración YAML. Se explorará además el problema de **CORS** y su solución.

---

### 🔹 Fase 1 – Entender el problema de CORS

🧠 **Concepto clave**:
Cuando cargamos recursos externos (SVG o YAML) desde otra URL (por ejemplo, desde GitHub Pages), el navegador **bloquea** por defecto esa carga si no se ha definido explícitamente el encabezado `Access-Control-Allow-Origin`.

✅ **Qué hacer para evitarlo**:

* Asegurarse de que el servidor (p. ej. NGINX, GitHub Pages) **responda con el header CORS**.
* En GitHub Pages, esto se resuelve con una URL directa HTTPS pública.

---

### 🔹 Fase 2 – Crear y publicar recursos en GitHub Pages

1. **Crear estructura del proyecto**

   ```
   /flow
     ├── ejemplo.svg
     └── config.yaml
   ```

2. **Contenido mínimo de ejemplo.svg**

   ```xml
   <svg xmlns="http://www.w3.org/2000/svg" width="400" height="100">
     <rect x="10" y="10" width="100" height="30" fill="gray"/>
     <text x="15" y="30" fill="white" font-size="14" id="test">---</text>
   </svg>
   ```

3. **Contenido de config.yaml**

   ```yaml
   cells:
     test:
       dataRef: "test-data-small-sin"
       label:
         units: "%"
         decimalPoints: 1
       labelColor:
         gradientMode: "hue"
         thresholds:
           - { color: "green", level: 0 }
           - { color: "yellow", level: 50 }
           - { color: "red", level: 90 }
   ```

4. **Publicar en GitHub Pages**

   * Subir la carpeta `flow/` a un repositorio con Pages habilitado.
   * Verifica acceso a `https://<usuario>.github.io/<repo>/flow/ejemplo.svg`.

---

### 🔹 Fase 3 – Crear panel Flow en Grafana

1. Instalar plugin `agenty-flowcharting-panel`.
2. Crear un panel nuevo y seleccionar visualización **Flow**.
3. Configurar el panel:

   * `SVG Source`: URL del `ejemplo.svg`.
   * `Config Source`: URL del `config.yaml`.
   * Activar `Test Data Generation`.

---

### 🔹 Fase 4 – Asociar datos al panel

Usar el datasource `grafana-testdata-datasource` con uno de estos escenarios:

#### Opción A: **Random Walk**

```plaintext
Scenario: Random Walk
Alias: test-data-small-sin
Start value: 1
Min: 0
Max: 100
```

#### Opción B: **CSV Content**

```csv
time,value
2025-06-25T09:00:00Z,77
```

---

### 🔹 Fase 5 – Validar

✅ Si todo está bien:

* El texto en el SVG con `id="test"` se actualizará con el valor recibido.
* Cambiará de color según los umbrales definidos en `labelColor.thresholds`.

