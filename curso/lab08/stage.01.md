

## 🔧 Fase 1 – Conectar Prometheus y consultar métricas internas

### 🎯 Objetivo

Conectar Prometheus como datasource en Grafana y realizar una primera consulta PromQL para visualizar una métrica interna de uso de memoria. Convertiremos los valores de bytes a megabytes y formatearemos correctamente la visualización.

---

### 🛠️ Pasos

1. Abre Grafana en `http://localhost:3000` (usuario: `admin`, contraseña: `admin`).
2. Ve a **⚙️ Configuration > Data Sources > Add data source**.
3. Selecciona **Prometheus**.
4. En la URL pon `http://prometheus:9090` (si usas Docker Compose con red compartida).
5. Haz clic en **Save & Test** → Verifica que dice: ✅ `Data source is working`.

---

### 📈 Crear una gráfica de uso de memoria

1. Ve a **Dashboards > New > New Panel**.

2. Abajo, en **Query**, selecciona `Prometheus` como datasource.

3. Escribe esta consulta en PromQL:

   ```promql
   go_memstats_alloc_bytes / 1024 / 1024
   ```

   Esto convierte el uso de memoria desde bytes a megabytes.

4. En el panel de la derecha, busca la sección **"Standard options" > Unit** y selecciona:

   * `Data > megabytes (MB)`

5. Cambia el título del panel a:

   * `Uso de memoria de Prometheus (MB)`

---

### ✅ Resultado esperado

Un gráfico de tipo `Time series` que muestra el uso de memoria de Prometheus en tiempo real, en MB, consultado directamente desde su métrica interna.