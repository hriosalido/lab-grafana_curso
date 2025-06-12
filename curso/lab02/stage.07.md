### Fase 2.7 – Añadir indicador y personalizarlo

🎯 **Objetivo**
Visualizar el estado actual de cada nodo usando **indicadores visuales** como barras, colores y formas, en lugar del valor numérico puro. Aprender a configurar estos indicadores con opciones visuales adaptadas a los thresholds definidos.

🗂️ **Scaffolding**
Debe existir al menos una métrica (`A-series`, `B-series`, etc.) con una transformación `Reduce`, y se deben haber definido thresholds o value mappings en fases anteriores.

🪜 **Pasos guiados**

1. Abre el panel y accede a la pestaña **Standard options**.

2. Cambia el modo de visualización desde `Value` a `Indicator`.

   * Esto ocultará el valor numérico y mostrará solo un **estado visual**.
   * En algunos casos se usa un rectángulo de color o un icono.

3. Ajusta los thresholds si no se ven reflejados correctamente en el indicador:

   * Asegúrate de que el campo tenga valores válidos dentro de los rangos.

4. Si usas múltiples series (`A-series`, `B-series`...), puedes aplicar **Field override** para cambiar el tipo de visualización de forma individual:

   * Ejemplo: `A-series` como indicador, `B-series` como valor.

5. Observa cómo se actualiza el diagrama al variar los datos.

✅ **Validaciones**

* El nodo muestra el estado como indicador visual (color o forma).
* Los thresholds se reflejan con los colores esperados.
* El valor numérico ya no se muestra directamente si se ha ocultado.

🎯 **Retos**

* Personaliza un nodo como **icono visual** con estado, y otro con solo texto.
* Usa `Max`, `Last` o `Mean` como función de reducción para ver su efecto en el indicador.

💬 **Reflexión**

* ¿Qué aporta el modo *Indicator* en comparación con mostrar un número?
* ¿Cómo se puede mejorar la legibilidad de un proceso solo con colores?
