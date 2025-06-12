### Fase 2.6 – Añadir field override en thresholds

🎯 **Objetivo**
Aplicar configuraciones específicas a cada métrica o nodo del diagrama utilizando la función de *Field overrides*, extendiendo los thresholds definidos anteriormente a nodos concretos del panel.

🗂️ **Scaffolding**
El panel debe tener una transformación activa (`Reduce`) que reduzca a un único valor por métrica (`A-series`, `B-series`, etc.), y debe haberse definido al menos un conjunto de umbrales (thresholds).

🪜 **Pasos guiados**

1. Abre el panel y accede a la pestaña **Field**.

2. Haz clic en **"Add override"**.

3. En el campo **Field name matcher**, selecciona `"A-series"` (o el nombre real del campo reducido).

4. En la sección de override, selecciona **Thresholds** y define nuevos rangos para ese nodo en concreto:

   * Ejemplo para `A-series`:

     * < 10 → Azul
     * 10–30 → Verde
     * > 30 → Rojo

5. Repite para `B-series` o cualquier otra serie si deseas aplicar umbrales diferentes.

6. Observa cómo el color del valor varía por nodo, independientemente de los umbrales generales.

✅ **Validaciones**

* Cada métrica tiene su propio conjunto de thresholds aplicado mediante override.
* El valor renderizado muestra colores diferentes por serie al variar el input.

🎯 **Retos**

* Crea al menos tres overrides personalizados con rangos distintos para cada uno.
* Define umbrales que imiten prioridades de negocio: por ejemplo, verde = operativo, rojo = error, gris = sin datos.

💬 **Reflexión**

* ¿Cuándo conviene usar overrides en lugar de definir thresholds globales?
* ¿Qué ventajas ofrece esta granularidad en la visualización del flujo?
