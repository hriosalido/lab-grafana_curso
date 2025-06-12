
### Fase 2.3 – Montar origen de datos con dos series

🎯 **Objetivo**
Crear una fuente de datos de ejemplo que genere dos series (`A-series`, `B-series`) y aplicar una transformación para mostrar su valor máximo reciente, enlazándolas con los nodos del diagrama.

🗂️ **Scaffolding**
Utilizaremos el datasource de prueba incluido por defecto: `TestData DB`.

🪜 **Pasos guiados**

1. En el panel lateral de Grafana, haz clic en **+ → Panel** para crear un nuevo panel.

2. En la sección **Query**, selecciona la fuente de datos `TestData DB`.

3. Cambia el modo a `Random Walk`.

4. En la pestaña superior, activa el botón **+ Add Query** y repite los pasos para crear dos métricas:

   * En la primera, cambia el nombre a `A-series`.
   * En la segunda, cambia el nombre a `B-series`.

5. Dirígete a la pestaña **Transform → Add transformation → Reduce**:

   * Selecciona ambas series.
   * En la opción **Calculation**, elige `Max`.
   * Asegúrate de que el **time range** del panel está en los últimos 10 minutos.

6. Opcionalmente, aplica la transformación **Rename by regex** si necesitas limpiar nombres como `A-series → ASeries`.

✅ **Validaciones**

* Se muestran dos campos: `ASeries`, `BSeries`, con valores numéricos visibles.
* Al cambiar el valor máximo (refrescando o reabrir el panel), los datos se actualizan correctamente.
* Los campos se pueden enlazar por nombre con nodos Mermaid.

🎯 **Retos**

* Agrega una tercera serie llamada `C-series`.
* Modifica el alias con `Regex` para eliminar guiones o espacios.
* Experimenta con otras funciones de reducción: `Last`, `Average`.

💬 **Reflexión**

* ¿Por qué usamos `Reduce` antes de visualizar en Diagram Panel?
* ¿Cómo afectan los nombres de campo a la vinculación visual?
