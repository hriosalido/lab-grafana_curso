

## 🔹 Fase 4 – Simular datos y comprobar comportamiento en Flow Panel

### 🎯 Objetivo

Simular diferentes tipos de datos y comprobar cómo se actualiza el SVG conectado mediante el archivo YAML: tanto valores estáticos como series temporales (`Random Walk`), así como cómo responden los colores al superar umbrales.

---

### 🛠️ Escenarios de simulación con `grafana-testdata-datasource`

#### 🔹 Opción A – Valor constante (para pruebas rápidas)

* **Datasource**: `TestData`
* **Scenario**: `CSV Content`
* **Alias**: `test-data-small-sin`

```csv
time,value
now,77
```

Esto garantiza que haya un punto **en el rango de tiempo actual**. Puedes cambiar el valor a `25`, `55`, `91`, etc., y observar el efecto en el color del nodo en el SVG.

---

#### 🔹 Opción B – Serie continua (`Random Walk`)

Configura así:

| Campo       | Valor               |
| ----------- | ------------------- |
| Scenario    | Random Walk         |
| Ref ID      | A                   |
| Alias       | test-data-small-sin |
| Start value | 20                  |
| Min         | 0                   |
| Max         | 100                 |
| Spread      | 1                   |
| Noise       | 0.1                 |

✅ Con esta opción, el valor cambia a lo largo del tiempo y observarás el color del nodo SVG adaptarse en tiempo real.

---

### 🎨 Comportamiento esperado

Según tu `config.yaml`:

```yaml
thresholds:
  - { color: "green", level: 0 }
  - { color: "yellow", level: 50 }
  - { color: "red", level: 90 }
```

El nodo SVG con `id: test` o `data-id="test"` cambiará de color:

| Valor | Color    |
| ----- | -------- |
| < 50  | verde    |
| 50–89 | amarillo |
| ≥ 90  | rojo     |

---

### 🧪 Consejos de depuración

1. **Pestaña Inspect > Data** → confirma que `test-data-small-sin` está llegando con valores.
2. Si no ves cambios:

   * Verifica que `dataRef` en `config.yaml` coincida con el **alias exacto**.
   * Verifica que el SVG tenga `id="test"` en un nodo `<rect>` o `<text>`.

---

### 📈 Bonus: usa múltiples celdas

Puedes extender tu `config.yaml` para múltiples elementos:

```yaml
cells:
  test:
    dataRef: test-data-small-sin
    label: ...
  ram:
    dataRef: test-data-ram
    label: ...
```

Y en tu SVG defines:

```xml
<rect id="test" ... />
<rect id="ram" ... />
```