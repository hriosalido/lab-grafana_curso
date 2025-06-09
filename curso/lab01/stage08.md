### Fase 1.8 – Uso de íconos e información multilinea en nodos

🎯 **Objetivo**
Mejorar la expresividad de los nodos utilizando íconos de FontAwesome y texto con saltos de línea para representar información estructurada y estados visuales claros.

🗂️ **Scaffolding**
No se necesita estructura adicional. Se requiere que Diagram Panel tenga activada la opción de íconos (normalmente habilitada por defecto).

🪜 **Pasos guiados**

1. Abre un panel existente o uno nuevo.

2. En el campo **Diagram definition**, pega el siguiente contenido:

```mermaid
graph TD
  A(fa:fa-box Pedido recibido) --> B(fa:fa-cogs "En<br>proceso")
  B --> C(fa:fa-check Entregado)
  B --> D(fa:fa-ban "Cancelado<br>por cliente")
```

3. Observa cómo se representan los íconos junto con texto enriquecido.
4. Prueba otros íconos: `fa-truck`, `fa-exclamation`, `fa-clock`, etc.

✅ **Validaciones**

* Al menos tres nodos muestran un ícono.
* Se han utilizado saltos de línea (`<br>`) en al menos un nodo.
* El flujo representa al menos dos rutas posibles (entrega y cancelación).

🎯 **Retos**

* Añadir un nodo de error con el ícono `fa-exclamation-triangle`.
* Usar un ícono para representar un tiempo de espera (`fa-clock`) con texto multilinea.

💬 **Reflexión**

* ¿Cómo afecta la incorporación de iconografía a la comprensión inmediata del estado?
* ¿En qué contextos reales podrían usarse distintos íconos para representar eventos?
