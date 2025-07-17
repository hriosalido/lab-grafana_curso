

## 🔹 Fase 3 – Escribir archivo YAML con configuración por botón

### 🎯 Objetivo

Definir un archivo YAML (`panelConfig.yaml`) que conecte cada botón de **arranque** y **parada** con una serie temporal. Cada celda del SVG se vinculará a un `dataRef` y cambiará de color en función del número de eventos.

---

### 🧾 Estructura del archivo `panelConfig.yaml`

```yaml
---
cellIdPreamble: "cell-"

thresholds: &thresholds
  - { color: "green", level: 0 }
  - { color: "orange", level: 1 }
  - { color: "red", level: 3 }

cells:
  arranques_env:
    dataRef: "arranques-env"
    label:
      valueMappings:
        - { value: null, text: "N/A" }
      units: "eventos"
    fillColor:
      thresholds: *thresholds

  paradas_env:
    dataRef: "paradas-env"
    label:
      units: "eventos"
    fillColor:
      thresholds: *thresholds

  arranques_mezcla:
    dataRef: "arranques-mezcla"
    label:
      units: "eventos"
    fillColor:
      thresholds: *thresholds

  paradas_mezcla:
    dataRef: "paradas-mezcla"
    label:
      units: "eventos"
    fillColor:
      thresholds: *thresholds
```

---

### 🔎 Detalles clave

* `cellIdPreamble`: permite evitar repetir `cell-` al referirse a IDs en el SVG.
* Cada `cell` (botón) se conecta a un alias definido en el panel de datos (`dataRef`).
* Se aplican los mismos `thresholds` (reutilizados con `&thresholds` y `*thresholds`) para colorear en verde, naranja o rojo según la cantidad de eventos.
* `units: "eventos"` muestra la cantidad numérica en la etiqueta.

---

### 📂 Instrucciones de uso

1. Crea un archivo `panelConfig.yaml` en tu repositorio o disco.
2. Pega el contenido mostrado arriba.
3. En el Flow panel:

   * Ve a la pestaña **YAML**
   * Marca `Edit as text`
   * Copia el YAML directamente
   * O, si lo tienes publicado por URL, referencia el archivo (`https://.../panelConfig.yaml`)

---

### ✅ Resultado esperado

Cada botón del SVG mostrará un valor (simulado) correspondiente al número de **arranques** o **paradas**, y cambiará de color según el umbral (verde, naranja o rojo).