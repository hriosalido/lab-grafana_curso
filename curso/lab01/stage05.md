### Fase 5: Añadir una fuente de datos real (CSV) al panel

🎯 **Objetivo:** Conectar el panel a una fuente de datos CSV real y representar el número de pedidos en cada estado, aunque no se muestren dinámicamente en el diagrama.

🧱 **Scaffold:**

* Archivo `pedidos.csv` accesible en `https://<tu-codespace>-8080.app.github.dev/pedidos.csv`
* Plugin `marcusolsson-csv-datasource` ya instalado en Grafana

🧭 **Pasos detallados:**

1. **Añadir el datasource CSV en Grafana:**

   * Ve a `Configuration > Data Sources`
   * Haz clic en `Add data source`
   * Busca y selecciona `CSV`
   * Configura:

     * **Name:** `Pedidos CSV`
     * **URL:** `https://<tu-codespace>-8080.app.github.dev/pedidos.csv`
   * Haz clic en `Save & Test`

2. **Crear nuevo panel temporal para validar datos:**

   * Ve a tu dashboard → `Add Panel`
   * Elige `Table` como tipo
   * En la consulta, selecciona `Pedidos CSV`
   * Verifica que aparecen los datos:

     ```
     pedido_id | estado     | fecha
     ----------|------------|----------
     1001      | validado   | 2024-06-01
     1002      | pendiente  | 2024-06-02
     1003      | error      | 2024-06-03
     ```

3. **Aplicar transformación para agrupar por estado:**

   * Ve a pestaña `Transform`
   * Añade transformación `Group by`

     * Group by: `estado`
     * Aggregation: `Count` sobre `pedido_id`
   * Resultado esperado:

     ```
     estado    | Count
     ----------|------
     validado  | 1
     pendiente | 1
     error     | 1
     ```

4. **(Opcional) Guardar este panel como referencia de datos:**

   * Renómbralo como `Conteo por estado`
   * Este panel servirá de apoyo visual junto al diagrama

🔥 **Reto adicional:**

* Modifica el CSV añadiendo más entradas y valida que el conteo por estado se actualiza al refrescar el panel

💡 *TIP:* Grafana no puede inyectar directamente valores en Mermaid. Sin embargo, puedes mantener este panel como fuente visible o usarlo en pantalla dividida durante la interpretación del flujo.

✅ **Validación:**

* La fuente de datos `Pedidos CSV` aparece en el listado de datasources
* El panel muestra correctamente los datos y el conteo por estado
* El archivo CSV puede ser editado y refleja los cambios al recargar
