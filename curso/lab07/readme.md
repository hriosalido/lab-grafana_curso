## 🏭 Laboratorio 07 – Línea de producción con botones y conteo de eventos precalculados

### 🎯 Objetivo

Visualizar una línea de producción alimentaria que dispone de botones de *arranque* y *parada* en cada etapa. Los contadores de **número total de arranques** y **paradas** por botón se representan como series temporales, una por tipo de evento y botón.

---

## ⚙️ Escenario simulado

| Zona       | Botón de arranque | Botón de parada |
| ---------- | ----------------- | --------------- |
| Envasado   | `arranques_env`   | `paradas_env`   |
| Etiquetado | `arranques_eti`   | `paradas_eti`   |
| Paletizado | `arranques_pal`   | `paradas_pal`   |

Estas series muestran directamente, para cada punto de tiempo, el total acumulado de eventos.

---

## 🧭 Fases del laboratorio

---

### 🔧 Fase 1 – Crear el SVG de botones

1. Abre **draw\.io**, activa el plugin `svgdata.js`.
2. Crea 6 botones (círculos, rectángulos o íconos).
3. Asigna estos IDs:

   * `arranques_env`, `paradas_env`
   * `arranques_eti`, `paradas_eti`
   * `arranques_pal`, `paradas_pal`
4. Exporta como SVG con:

   * `Archivo → Exportar como → SVG…`
   * Marca: “Incluir contenido”, “Área”, y “CSS embebido”.

---

### 📈 Fase 2 – Generar las series simuladas

1. En un panel `Time series`, crea estas queries en `TestData DB`:

   * Alias: `arranques_env`, tipo: **Random Walk**
   * Alias: `paradas_env`, tipo: **Random Walk**
   * Repite con `arranques_eti`, `paradas_eti`, etc.
2. Ajusta la escala: valores entre 0 y 20 por hora.
3. Verifica que las curvas suben lentamente, simulando acumulación de pulsaciones.

---

### 🖼️ Fase 3 – Vincular el SVG en un panel Flow

1. Crea un nuevo panel tipo **Flow (by GE)**.
2. En "SVG Source":

   * **Carga directa** (pega el SVG inline)
   * o bien **vía URL** (recomendado si lo alojas en GitHub Pages)
3. En "Panel Config", añade este YAML:

```yaml
---
cellIdPreamble: "cell-"
cells:
  arranques_env:
    dataRef: "arranques_env"
    label:
      units: "short"
      valueMappings:
        - {value: null, text: "N/A"}
    labelColor:
      thresholds:
        - {level: 0, color: "gray"}
        - {level: 5, color: "green"}
        - {level: 15, color: "orange"}
        - {level: 30, color: "red"}

  paradas_env:
    dataRef: "paradas_env"
    label:
      units: "short"
    labelColor:
      thresholds:
        - {level: 0, color: "gray"}
        - {level: 5, color: "yellow"}
        - {level: 15, color: "orange"}
        - {level: 30, color: "red"}

  # Repite para eti y pal
```

---

### 📊 Fase 4 – Dashboard Overview maestro

1. Título: `Línea de producción – Overview de botones`.
2. Añade:

   * Panel `Flow` con el SVG y YAML de arriba.
   * Paneles `Stat` adicionales para valores máximos o promedio por zona.
3. Activa `time slider` y prueba con distintos rangos (última hora, 24h, etc.).

---

### 🔍 Fase 5 – Dashboard detalle por botón (opcional)

1. Variable: `boton` con valores:

   * `arranques_env`, `paradas_env`, etc.
2. Panel `Time series` con:

   ```
   $__alias == ${boton}
   ```
3. Añadir un Stat con el último valor (`last()`).

---

## 🧪 Bonus: interactividad y estilos

* Añade `tooltipText` para mostrar información adicional.
* Usa `fillColor` además de `labelColor` para destacar botones más usados.
* Aplica un filtro condicional por `zona`.