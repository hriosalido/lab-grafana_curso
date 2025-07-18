## 🧪 🧩 **Laboratorio – Sesión 8: Interactividad y personalización dinámica con Prometheus**

### 🎯 Objetivo

* Aprender a usar **Prometheus como fuente de datos**
* Escribir consultas PromQL básicas sobre métricas internas
* Aplicar **variables de usuario** para seleccionar instancias o jobs
* Utilizar `${var}` en títulos, filtros y estilos
* Condicionar la visualización de paneles según la selección

---

### 🔧 Fase 1 – Conectar Prometheus y consultar métricas internas

1. Añadir **Prometheus** como datasource
2. Crear un panel tipo `Time series`
3. Escribir la consulta básica:

   ```promql
   go_memstats_alloc_bytes / 1024 / 1024
   ```
4. Formatear la unidad como **MB** en los ejes

---

### 🔧 Fase 2 – Crear variables dinámicas (`job`, `instance`)

1. Crear variable `job`

   * Tipo: `Query`
   * Datasource: `Prometheus`
   * Query:

     ```promql
     label_values(up, job)
     ```

2. Crear variable `instance`

   * Tipo: `Query`
   * Query:

     ```promql
     label_values(up{job="${job}"}, instance)
     ```

3. Usar las variables en el panel:

   ```promql
   go_memstats_alloc_bytes{job="${job}", instance="${instance}"} / 1024 / 1024
   ```

---

### ✨ Fase 3 – Personalización visual con `${var}`

1. Usar `${instance}` en el **título del panel**:

   * Ejemplo: `"Uso de memoria en ${instance}"`
2. Crear panel tipo **Text** o **Stat** con el valor seleccionado
3. Activar `Show in panel` con etiquetas dinámicas como:

   * `"Instancia activa: ${instance}"`

---

### 🧱 Fase 4 – Condicionar visibilidad de paneles

1. Crear un panel tipo **Stat** para el estado `up`
2. Activar **field overrides** o plugins como BoomTable o Text para:

   * Mostrar panel **solo si `up == 0`**
   * O cambiar color si `up == 0`

Ejemplo con PromQL:

```promql
up{job="${job}", instance="${instance}"}
```

---

### 🕹️ Fase 5 – Visualización adaptativa y comportamiento condicional

1. Crear dos paneles distintos para mostrar según el `job`

   * Panel A: visible si `${job} == "prometheus"`
   * Panel B: visible si `${job} == "pushgateway"`

2. Crear una expresión condicional en la visualización (usando plugin o script)

3. (Opcional) Combinar con botones en **Flow Panel** que alteren las variables de navegación
