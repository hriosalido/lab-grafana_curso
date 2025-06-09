### Fase 4: Añadir interacción básica al flujo

🎯 **Objetivo:** Mejorar la experiencia de usuario permitiendo seguir visualmente el flujo completo y explorarlo como sistema.

🧱 **Scaffold:**

* Diagrama Mermaid funcional y coloreado
* Nodos y enlaces entre estados existentes

🧭 **Pasos detallados:**

1. **Editar el panel Mermaid:**

   * Abre el dashboard
   * Haz clic en el panel y selecciona `Edit`

2. **Agregar nodo inicial y final del flujo:**

   * Inserta al inicio del grafo dos nuevos nodos:

     ```mermaid
     start((Inicio))
     end((Fin))
     start --> nuevo
     entregado --> end
     cancelado --> end
     ```

3. **Ajustar conectores para claridad:**

   * Si hay rutas complejas, rediséñalas para evitar cruces o ambigüedad visual

4. **Usar nodos con forma distinta (si soportado):**

   * Puedes usar doble paréntesis `((texto))` para representar eventos de inicio o fin

🔥 **Reto adicional:**

* Añade un nodo de supervisión llamado `revisión` que se conecte desde `procesando` y devuelva al mismo nodo, formando un ciclo visual

💡 *TIP:* Aunque Mermaid no soporta enlaces interactivos HTML en Grafana, puedes usar la forma y la disposición para guiar la vista del usuario paso a paso.

✅ **Validación:**

* Existen nodos `Inicio` y `Fin` visibles y conectados
* El flujo puede recorrerse de principio a fin sin ambigüedades
* El ciclo `procesando → revisión → procesando` se entiende claramente como parte del proceso
* El diagrama mantiene buena legibilidad
