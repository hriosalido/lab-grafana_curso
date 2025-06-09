### Fase 8: Interactividad visual y refinamiento del flujo

🎯 **Objetivo:** Ampliar el diagrama con elementos interactivos, subgráficos y mejoras visuales que refuercen la comprensión del proceso de negocio y estimulen la exploración visual.

🧱 **Scaffold:**

* Panel `Diagram` ya existente con flujo definido
* Editor Mermaid activo
* No se requiere conexión dinámica a datos

🧭 **Pasos detallados:**

1. **Agrupar nodos en subgráficos**

   * Organiza visualmente las fases del flujo:

     ```mermaid
     graph LR

       subgraph Validación
         pedido[📦 Pedido recibido]
         pedido --> validado[✅ Validado]
         pedido --> pendiente[⏳ Pendiente]
         pedido --> error[❌ Error]
       end

       validado --> almacenado[📁 Almacenado]
       error --> soporte[📞 Soporte técnico]
     ```

2. **Hacer nodos clicables**

   * Usa `click` para simular navegación:

     ```mermaid
     click soporte "https://miempresa.com/tickets"
     click almacenado "https://miempresa.com/logistica"
     ```
   * Esto permite abrir enlaces al hacer clic en un nodo

3. **Mejorar con estilos visuales (clases Mermaid)**

   * Añade clases para diferenciar estados:

     ```mermaid
     classDef verde fill:#c1f0c1,stroke:#2d2;
     classDef rojo fill:#f8d7da,stroke:#c9302c;
     class validado,almacenado verde;
     class error,soporte rojo;
     ```

4. **Opcional: leyenda o panel auxiliar explicativo**

   * Añade un panel `Text → Markdown` explicando qué significa cada color, subgrupo o icono

🔥 **Retos adicionales:**

* Crea una sección "subgraph Entrega" con al menos dos pasos adicionales
* Cambia los íconos de cada nodo por otros más expresivos usando emojis
* Añade al menos dos nodos clicables que simulen enlaces a otras herramientas (soporte, logística, etc.)

💡 *TIP:* Puedes usar `subgraph` para agrupar por departamentos, fases del proceso o incluso flujos de decisión.

✅ **Validación:**

* El diagrama incluye al menos un `subgraph` bien delimitado
* Hay nodos clicables funcionales con URL
* Los colores ayudan a identificar estados críticos o correctos
* El diseño general es claro y visualmente atractivo
