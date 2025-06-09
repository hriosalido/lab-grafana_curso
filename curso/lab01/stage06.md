### Fase 6: Vincular visualización con datos reales (indirectamente)

🎯 **Objetivo:** Alinear visualmente el flujo Mermaid con los datos reales del CSV, usando paneles complementarios y coherencia de estados sin integración directa.

🧱 **Scaffold:**

* Panel `Diagram` creado con estados estáticos
* Panel `Table` creado con conteo por estado
* Datasource `Pedidos CSV` activo

🧭 **Pasos detallados:**

1. **Organizar los paneles en el dashboard:**

   * Abre el dashboard donde se encuentran ambos paneles
   * Coloca el panel `Diagram` a la izquierda y el panel `Table` a la derecha o debajo
   * Usa el modo de grid para que se vea todo sin solapamientos

2. **Revisar correspondencia entre nodos y datos:**

   * Asegúrate de que los estados en Mermaid coincidan exactamente con los del CSV (`validado`, `pendiente`, `error`, etc.)
   * Si es necesario, adapta el texto de los nodos del diagrama para reflejar el mismo vocabulario

3. **Simular datos en el flujo (manual):**

   * Edita el panel Mermaid y añade temporalmente los conteos de forma estática:

     ```mermaid
     graph LR
       nuevo[🟡 Nuevo: 5]
       nuevo --> procesando[🔄 Procesando: 3]
       procesando --> enviado[📦 Enviado: 2]
       enviado --> entregado[✅ Entregado: 1]
     ```
   * Usa los valores actuales del panel de tabla

4. **Sincronización futura (sólo visual):**

   * A medida que cambie el CSV, actualiza manualmente los números del Mermaid
   * Esto ayuda a reforzar el paralelismo entre fuente de datos y diagrama

🔥 **Reto adicional:**

* Añade un comentario de texto en el dashboard explicando que el flujo refleja el estado actual de los datos de pedidos (aunque de forma manual)

💡 *TIP:* Usa paneles de tipo `Text` para añadir contexto o instrucciones en el dashboard y guiar al usuario final sobre cómo interpretar los valores visuales.

✅ **Validación:**

* El flujo muestra números que coinciden con los datos del CSV
* El usuario puede consultar ambos paneles y entender el paralelismo
* La actualización de datos en el CSV puede reflejarse visualmente editando el Mermaid
