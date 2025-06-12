### Fase 2.9 – Explorar herramientas del navegador e inspección de estilos

🎯 **Objetivo**
Aprender a usar las herramientas de desarrollo del navegador para identificar clases, estructuras SVG y estilos embebidos en el panel Diagram. Este conocimiento es clave para personalizar mediante CSS.

🗂️ **Scaffolding**
Se parte de un panel Diagram con estilos `classDef` aplicados. Debe haber ya un intento de estilos CSS definidos en la sección "Custom CSS" del panel (Advanced > Panel options).

🪜 **Pasos guiados**

1. Abre el dashboard y ubica tu panel Diagram.

2. Pulsa `F12` o haz clic derecho → "Inspeccionar" sobre el panel.

3. Navega por el DOM hasta encontrar elementos SVG anidados bajo `<div id="diagram-1">` o similar.

4. Busca etiquetas `<g class="node entrada">`, `<rect>`, `<text>`, `<span>`… Son los elementos que puedes estilizar.

5. Copia el selector exacto (clic derecho → `Copy selector`) sobre el nodo que quieres modificar.

6. Vuelve al panel y pega ese selector en la sección **Custom CSS**:

   ```css
   #diagram-1 g.entrada text {
     fill: orange !important;
     font-weight: bold;
   }

   #diagram-1 g.salida rect {
     stroke: teal;
     stroke-width: 2px;
   }
   ```

7. Guarda y revisa si se aplican los cambios. Si no ves efecto:

   * Añade `!important`.
   * Asegúrate de que el selector apunta al elemento correcto (puede cambiar tras un refresh).
   * Verifica que `diagram-1` coincide con el ID real del panel (puede ser `diagram-2`, etc.).

✅ **Validaciones**

* Puedes localizar los elementos SVG que representan nodos.
* Al menos un selector personalizado tiene efecto visible en el panel.
* Has entendido cómo usar `Copy selector` y cómo forzar estilos si no se aplican.

🎯 **Retos**

* Cambia el estilo solo de nodos que empiecen por `"A-"` o `"B-"` usando `starts-with()` en CSS o Regex desde Transform.
* Sobrescribe un estilo embebido por Mermaid usando la cascada (`#diagram-x g.nombre rect` con `!important`).
* Investiga si puedes modificar el `tooltip` visual con CSS (`title` o `foreignObject` en SVG).

💬 **Reflexión**

* ¿Cuándo usar `classDef` y cuándo usar CSS?
* ¿Qué dificultades implica mantener estilos cuando Grafana cambia IDs dinámicamente?
