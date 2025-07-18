

## 🕹️ Fase 5 – Visualización adaptativa y comportamiento condicional

### 🎯 Objetivo

Aplicar lógica adaptativa en el dashboard para mostrar distintos paneles, contenidos o visualizaciones según el valor de las variables seleccionadas o el estado de los datos. Esto permite construir dashboards “inteligentes” y contextuales.

---

### 🛠️ Parte 1 – Mostrar paneles distintos según el `job` seleccionado

1. Duplica un panel y crea dos versiones:

   * **Panel A**: para `job="prometheus"`
   * **Panel B**: para `job="pushgateway"`

2. En cada uno:

   * Ve a **Field > Display > Visibility**
   * En **"Hide when"**, escribe:

     * Para Panel A:

       ```
       ${job} != "prometheus"
       ```
     * Para Panel B:

       ```
       ${job} != "pushgateway"
       ```

3. (Opcional) Añade un **Text panel** que explique qué se está mostrando según el `job`.

---

### 🛠️ Parte 2 – Cambiar el contenido visual según el estado de los datos

1. Crea un panel tipo **Stat** que indique la disponibilidad (`up`):

   ```promql
   up{job="${job}", instance="${instance}"}
   ```

2. Configura:

   * `Value mappings` para mostrar "Activo"/"Inactivo"
   * `Thresholds` con colores: rojo (`0`), verde (`1`)

3. (Opcional) En **Text panel**, crea una alerta visible solo cuando `up == 0`.

---

### 🛠️ Parte 3 – (Bonus) Comportamiento dependiente de múltiples condiciones

> Esta parte requiere creatividad con las variables y paneles duplicados, ya que Grafana no permite lógica compleja directamente.

Ejemplo: mostrar un mensaje si:

* `job = pushgateway`
* y `up == 0`

Solución:

* Crea un **Stat panel** con:

  ```promql
  up{job="${job}", instance="${instance}"}
  ```
* Y muestra texto condicionalmente con:

  ```
  ${job} == "pushgateway" && up == 0
  ```

  *(esto se simula manualmente usando múltiples paneles con visibilidad condicional)*

---

### ✅ Resultado esperado

* Distintos paneles aparecen o desaparecen según lo seleccionado arriba
* Los usuarios ven información personalizada según el contexto
* Se reduce el ruido visual y se mejora la experiencia de navegación

