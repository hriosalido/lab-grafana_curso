

## 🧱 Fase 4 – Condicionar visibilidad de paneles

### 🎯 Objetivo

Configurar paneles que se muestren u oculten automáticamente en función de las variables seleccionadas o del valor de las métricas. Esto permite adaptar el dashboard a distintos contextos sin duplicar vistas.

---

### 🛠️ Parte 1 – Ocultar panel si una instancia está activa

1. Crea un panel tipo **Stat** con la siguiente consulta:

   ```promql
   up{job="${job}", instance="${instance}"}
   ```

2. En la pestaña **Overrides** (a la derecha del editor del panel), haz clic en **Add field override**:

   * Selecciona: `Value`
   * Luego en **Add override property**, elige:

     * `Thresholds`
     * `Value mappings` (opcional: para mostrar "Activo"/"Inactivo")

3. Usa **thresholds** y colores para destacar cuando `up == 0` (servicio caído).

---

### 🛠️ Parte 2 – Mostrar panel solo si se cumple una condición

Grafana no permite condicionar la visibilidad de un panel *por PromQL* directamente, pero sí puedes usar:

#### 🅰️ Alternativa 1 – Condición visual con plugins como **Boom Table** o **Text**

* Crea un panel de tipo **Text** o **Boom Table**
* Configura para que muestre una alerta si `up == 0`
* Usa `${var}` en el texto:

  ```markdown
  ⚠️ La instancia `${instance}` está inactiva.
  ```

#### 🅱️ Alternativa 2 – Duplicar paneles y usar "visibility by variable"

1. En el panel → ve a **Field > Display > Visibility**
2. Elige **"Hide when"** y pon:

   ```
   ${job} != "prometheus"
   ```

   → Así puedes mostrar un panel solo cuando el `job` seleccionado sea `"prometheus"`

---

### ✅ Resultado esperado

* Los paneles aparecen o cambian según la selección de `job` o `instance`.
* Los usuarios ven información relevante solo en los casos adecuados (por ejemplo, solo si hay un fallo).

