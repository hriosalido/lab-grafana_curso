
### Fase 2.11 – Usar herramientas del navegador para depurar estilos

🎯 **Objetivo**
Aprender a inspeccionar elementos del gráfico Mermaid renderizado en el panel de Grafana y verificar qué estilos se aplican, qué se puede sobrescribir y cómo identificar clases dinámicas generadas.

🗂️ **Scaffolding**
Se parte de un panel Diagram con al menos tres nodos renderizados y estilos Mermaid aplicados.

🪜 **Pasos guiados**

1. Abre el dashboard en modo edición y localiza el panel Diagram.

2. Haz clic derecho sobre el panel y selecciona **"Inspeccionar"** (o pulsa `F12` en tu navegador).

3. Navega en el inspector hasta el bloque `<svg>` que representa el grafo:

   ```html
   <div id="diagram-1" class="mermaid">
     <svg>...</svg>
   </div>
   ```

4. Localiza los nodos dentro del SVG, por ejemplo:

   ```html
   <g class="node entrada">
     <rect ... />
     <text>...</text>
   </g>
   ```

5. Observa:

   * Las clases `node`, `entrada`, `salida`, etc.
   * Los estilos `style="..."` embebidos que **tienen prioridad** si no se sobrescriben con `!important`.

6. Crea o ajusta los estilos CSS en **Panel > Advanced > Custom CSS**, asegurándote de usar el selector correcto.

7. Vuelve al navegador, edita los estilos directamente en el inspector para ver los efectos en tiempo real antes de copiar al CSS definitivo.

✅ **Validaciones**

* Se ha identificado al menos un nodo con clase dinámica (`node entrada`, `node salida`).
* Se ha sobrescrito correctamente un estilo embebido mediante `!important`.
* Se comprenden los estilos por defecto del plugin y cómo alterarlos.

🎯 **Retos**

* Encuentra un nodo que esté ignorando tu estilo Mermaid y aplica una sobrescritura efectiva con CSS.
* Crea un `style tag` en el inspector que cambie en vivo el color de fondo de un nodo específico sin alterar el resto del dashboard.

💬 **Reflexión**

* ¿Qué limitaciones encuentras al usar `classDef` frente a CSS?
* ¿Qué tipo de inspección es más útil: editar el panel o el navegador?
