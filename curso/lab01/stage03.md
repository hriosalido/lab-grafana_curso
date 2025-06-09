### Fase 3: Añadir colores por estado

🎯 **Objetivo:** Aplicar estilos visuales personalizados a los nodos del diagrama utilizando clases Mermaid para mejorar la legibilidad del flujo.

🧱 **Scaffold:**

* Panel `Diagram` ya creado con el flujo de estados definido en Mermaid
* Conexiones funcionales entre nodos (`nuevo`, `procesando`, `enviado`, `entregado`, `cancelado`)

🧭 **Pasos detallados:**

1. **Editar el panel existente:**

   * Abre el dashboard creado en la fase anterior
   * Haz clic en el panel `Diagram` y selecciona `Edit`

2. **Agregar definición de estilos Mermaid al final del contenido:**

   * Añade las siguientes clases al final de la definición actual:

     ```mermaid
     classDef nuevo fill:#FFEE99,stroke:#D4AA00;
     classDef procesando fill:#D0E6F7,stroke:#007ACC;
     classDef enviado fill:#CDE8C9,stroke:#2D862D;
     classDef entregado fill:#B2F0E0,stroke:#00A97F;
     classDef cancelado fill:#F8D7DA,stroke:#C9302C;

     class nuevo nuevo;
     class procesando procesando;
     class enviado enviado;
     class entregado entregado;
     class cancelado cancelado;
     ```

3. **Aplicar cambios y revisar:**

   * Haz clic fuera del editor para recargar el panel
   * Verifica que cada nodo tenga su color personalizado

🔥 **Reto adicional:**

* Crea una nueva clase `en_retorno` con color morado (`#E0BBE4`) y úsala en un nuevo nodo de prueba conectado desde `entregado`

💡 *TIP:* Las clases Mermaid se definen primero con `classDef` (estilo) y luego se asignan con `class nodo clase;`. Los nombres deben coincidir exactamente.

✅ **Validación:**

* Todos los nodos existentes tienen colores personalizados acordes a su significado
* El nodo `cancelado` tiene fondo rojo claro
* La sintaxis Mermaid no produce errores
* El diagrama es más legible e intuitivo visualmente
