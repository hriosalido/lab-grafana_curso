

## 🔧 Fase 2 – Crear variables dinámicas (`job`, `instance`)

### 🎯 Objetivo

Crear variables en el dashboard para que el usuario pueda seleccionar dinámicamente un `job` y una `instance` desde los valores reales que existen en Prometheus. Usaremos estas variables para personalizar la consulta y el comportamiento del panel.

---

### 🛠️ Pasos

1. En el dashboard, haz clic en la parte superior derecha: **⚙️ Settings > Variables > New variable**.

---

#### 🧩 Variable 1 – `job`

* **Name**: `job`
* **Type**: `Query`
* **Data source**: `Prometheus`
* **Query**:

  ```promql
  label_values(up, job)
  ```
* **Include All option**: `✓` (opcional)
* Haz clic en **Update**

---

#### 🧩 Variable 2 – `instance`

* **Name**: `instance`
* **Type**: `Query`
* **Data source**: `Prometheus`
* **Query**:

  ```promql
  label_values(up{job="${job}"}, instance)
  ```
* **Include All option**: `✓` (opcional)
* Haz clic en **Update**

---

### 📈 Aplicar variables a la consulta

1. Abre el panel creado en la Fase 1 (uso de memoria).
2. Sustituye la query por esta:

   ```promql
   go_memstats_alloc_bytes{job="${job}", instance="${instance}"} / 1024 / 1024
   ```
3. Elige valores desde los menús desplegables de variables arriba del dashboard.

---

### 🧪 Resultado esperado

El panel ahora muestra el uso de memoria de una instancia concreta del job seleccionado, y puede adaptarse dinámicamente cambiando los valores de las variables en la parte superior del dashboard.
