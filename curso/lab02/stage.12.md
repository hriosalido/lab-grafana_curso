Perfecto. Aquí tienes la **Fase 2.12** **replanteada como un laboratorio exploratorio**, centrado en **descubrir por qué es crucial “ganar la jerarquía” en la cascada CSS**, empezando por un enfoque que falla y luego uno que sí funciona:

---

### Fase 2.12 – Exploración: ganar la jerarquía en estilos con CSS

🎯 **Objetivo**
Entender por qué **los estilos embebidos (`element.style`) de Mermaid** a veces impiden que nuestras reglas visuales se apliquen, y cómo podemos **superar esa jerarquía** usando selectores robustos y `!important`.

🗂️ **Scaffolding**
Un panel `Diagram` con 3 nodos conectados (`A-series`, `B-series`, `C-series`) ya renderizado y con `classDef` aplicado.

🪜 **Pasos guiados**

1. Abre el panel que ya contiene tu diagrama. Asegúrate de que los nodos tienen estilos Mermaid básicos:

   ```mermaid
   graph TD
     A-series:::entrada --> B-series:::proceso --> C-series:::salida

     classDef entrada fill=#005f73,stroke=#fff,color=#fff;
     classDef salida fill=#fff,stroke=#005f73,color=#005f73;
   ```

2. Entra a `Advanced > Custom CSS` y **prueba un estilo muy básico, general y sin `!important`**:

   ```css
   .salida rect {
     stroke: red;
     stroke-width: 5px;
   }
   ```

3. ⚠️ **Observa que no ocurre nada**. Abre `F12` y verás que:

   * Los nodos tienen estilo en `element.style`.
   * Tu regla **queda ignorada o sobrescrita**.

4. Ahora intenta usar un selector **más específico**:

   ```css
   g.node.salida rect {
     stroke: red;
     stroke-width: 5px;
   }
   ```

   🔍 Revisa si ya hay efecto. En muchos casos, **tampoco basta**.

5. Finalmente, **gana la jerarquía**: añade el ID del panel y usa `!important`:

   ```css
   #diagram-1 g.node.salida rect {
     stroke: red !important;
     stroke-width: 5px !important;
     fill: white !important;
   }

   #diagram-1 g.node.salida text {
     fill: red !important;
     font-weight: bold;
   }
   ```

6. Recarga el panel y **valida que ahora sí se aplica tu estilo**. En el inspector (`F12`):

   * El `element.style` queda tachado.
   * Tu CSS aparece como la regla activa.

7. Haz la misma prueba en otro nodo (ej. `entrada`) con otro color para reforzar el aprendizaje.

✅ **Validaciones**

* Se comprueba que una regla simple no tiene efecto si compite con `element.style`.
* Se valida que **la combinación de selector específico + `!important` + ID de panel** permite sobrescribir los estilos.
* La consola del navegador muestra claramente la prioridad aplicada.

🎯 **Retos**

* Prueba usar solo `.node.salida rect` sin ID. ¿Funciona? ¿Por qué no?
* Usa el inspector para identificar el selector exacto que sí gana. ¿Cuál es el más corto posible que funciona?
* Intenta cambiar `fill`, `stroke`, `text` en varios niveles del SVG y observa qué se puede y qué no.

💬 **Reflexión**

* ¿Por qué no bastaba con escribir una regla general de CSS?
* ¿Cuál es el orden de prioridad entre `classDef`, CSS externo y `element.style`?
* ¿Cuándo debemos preferir `classDef` y cuándo `Custom CSS`?

---

¿Quieres que prepare una captura con `F12` para mostrar el efecto visual de la jerarquía en un ejemplo real?
