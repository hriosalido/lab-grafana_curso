

## 🔹 Fase 3 – Conectar Flow Panel en Grafana a SVG + Configuración YAML

### 🎯 Objetivo

Crear un panel de tipo Flow en Grafana que consuma los archivos SVG y YAML publicados en GitHub Pages, y represente datos dinámicamente sobre los elementos del diagrama.

---

### ✅ Requisitos previos

* Plugin instalado: [`agenty-flowcharting-panel`](https://grafana.com/grafana/plugins/agenty-flowcharting-panel/)
* Acceso a:

  * `https://usuario.github.io/flow-lab/flow/ejemplo.svg`
  * `https://usuario.github.io/flow-lab/flow/config.yaml`

---

### 🛠️ Paso a paso en Grafana

#### 1. Crear un nuevo panel

* Dirígete a tu dashboard.
* Añade un **nuevo panel**.
* En "Visualization", selecciona: **FlowCharting (Flow Panel)**.

---

#### 2. Configurar el panel

En la configuración del panel, completa los siguientes campos:

* **SVG Source**:

  ```
  https://usuario.github.io/flow-lab/flow/ejemplo.svg
  ```

* **Config Source**:

  ```
  https://usuario.github.io/flow-lab/flow/config.yaml
  ```

---

#### 3. Crear la consulta de datos

En la pestaña **Queries**:

* **Datasource**: `TestData`
* **Ref ID**: `A`
* **Scenario**: `Random Walk`
* **Alias**: `test-data-small-sin`

Configura así:

| Campo       | Valor |
| ----------- | ----- |
| Start value | 50    |
| Min         | 0     |
| Max         | 100   |
| Spread      | 1     |
| Noise       | 0.1   |

---

#### 4. Vincular datos

Grafana Flow vinculará automáticamente los valores con los nodos SVG definidos en `config.yaml`, por ejemplo:

```yaml
cells:
  test:
    dataRef: test-data-small-sin
```

> Asegúrate de que en el SVG haya un nodo con `id="test"` o `data-id="test"`.

---

#### 5. Ajustar visualización

* Activa `Show label`, `Label color`, etc., si quieres mostrar el valor renderizado.
* Puedes activar el **modo de inspección** para verificar que los datos llegan correctamente (`Inspect > Data > Values`).

---

### 🧪 Validación

* Si el valor de `test-data-small-sin` cambia, debe reflejarse en el nodo correspondiente del SVG (`<rect>`, `<text>`, etc.).
* Si supera los umbrales del YAML, debe cambiar de color según `labelColor.thresholds`.

