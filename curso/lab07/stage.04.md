## 🔹 Fase 4 – Simular datos y comprobar comportamiento en Flow Panel

### 🎯 Objetivo

Simular el número de eventos de arranque y parada por botón, usando series temporales de `grafana-testdata-datasource`. Observar cómo se actualiza el SVG mediante `panelConfig.yaml`, cambiando color y mostrando el valor.

---

### 🛠️ Escenarios de simulación con `grafana-testdata-datasource`

#### 🔹 Simulación básica por alias

Configura cada serie como sigue:

| Alias            | Scenario    | Start Value | Spread | Noise | Comentario                       |
| ---------------- | ----------- | ----------- | ------ | ----- | -------------------------------- |
| arranques-env    | Random Walk | 1           | 1      | 0.1   | Número de arranques (entorno)    |
| paradas-env      | Random Walk | 0           | 2      | 0.1   | Número de paradas (entorno)      |
| arranques-mezcla | Random Walk | 2           | 1      | 0.2   | Número de arranques (mezcladora) |
| paradas-mezcla   | Random Walk | 1           | 1      | 0.1   | Número de paradas (mezcladora)   |

> ⚠️ Asegúrate de escribir **exactamente los mismos aliases** que aparecen en `panelConfig.yaml`.

---

### 🎨 Comportamiento esperado

Según la configuración:

```yaml
thresholds:
  - { color: "green", level: 0 }
  - { color: "orange", level: 1 }
  - { color: "red", level: 3 }
```

Verás:

| Valor | Color   |
| ----- | ------- |
| 0     | Verde   |
| 1–2   | Naranja |
| ≥3    | Rojo    |

Cada celda del SVG se coloreará en tiempo real según el número de eventos y mostrará el número actual.

---

### 🧪 Consejos de depuración

1. **Inspect > Data**: revisa que las series `arranques-env`, `paradas-env`, etc., lleguen con datos válidos.
2. Verifica coincidencia exacta entre el `dataRef` del YAML y el alias de la serie.
3. Usa el control de **Time Slider** para moverte por el rango temporal y observar los valores en el SVG.

---

### 🧩 Bonus opcional

Puedes añadir más series, como por ejemplo:

* `alarmas-env` (errores o bloqueos)
* `reset-mezcla` (eventos de reinicio)

Y asociarlos a nuevas celdas del SVG para enriquecer la visualización.