### Fase 7: Representación end-to-end del flujo de pedidos

🎯 **Objetivo:** Consolidar la visualización del proceso completo de pedidos conectando los datos, el flujo visual y su interpretación en un único dashboard integrado y comprensible de principio a fin.

🧱 **Scaffold:**

* Panel `Diagram` con flujo Mermaid visual y manualmente actualizado
* Panel `Table` con conteo por estado conectado a `pedidos.csv`
* Panel `Text` con leyenda o descripción

🧭 **Pasos detallados:**

1. **Crear un layout completo del dashboard:**

   * Organiza los tres paneles:

     * Diagrama Mermaid centrado o en la parte superior
     * Tabla de datos justo debajo
     * Panel de texto lateral o al pie del dashboard
   * Ajusta los tamaños para que todo sea visible sin hacer scroll horizontal

2. **Actualizar el flujo visual con los datos actuales:**

   * Revisa el panel `Table`
   * Edita el panel Mermaid y sustituye los valores de los nodos con los datos actuales (ej. `Procesando: 7`, `Cancelado: 2`, etc.)
   * Verifica que los nombres coinciden exactamente con los del CSV

3. **Añadir panel de texto explicativo:**

   * Tipo: `Text → Markdown`
   * Contenido sugerido:

     ```
     ### Interpretación del flujo
     Este panel representa visualmente el estado actual de los pedidos procesados. 
     Los valores están sincronizados con los datos del archivo CSV cargado dinámicamente.
     ```

4. **Ajustar colores o formas si es necesario:**

   * Verifica si hay nuevos estados
   * Añade nuevas clases Mermaid si corresponde (solo si el flujo ha cambiado)

🔥 **Reto adicional:**

* Exporta el dashboard completo como JSON y guárdalo en el repositorio (`dashboards/flujo-pedidos-e2e.json`)

💡 *TIP:* Los dashboards bien diseñados permiten a cualquier observador entender el proceso sin necesidad de entrar en los datos técnicos. Usa títulos, colores y orden para reforzar ese objetivo.

✅ **Validación:**

* El dashboard presenta una vista unificada del flujo de pedidos, datos reales y explicación
* Los valores numéricos de los nodos coinciden con la tabla conectada
* El resultado final se entiende sin intervención del instructor
