
### Fase 2.8 – Editar *Value Mappings*: rangos, máximos y mínimos

🎯 **Objetivo**
Asociar valores o rangos numéricos a etiquetas legibles o representaciones gráficas para mejorar la comprensión del flujo. Dominar el uso de *value mappings* y su relación con thresholds e indicadores.

🗂️ **Scaffolding**
Debe existir un panel con varias métricas (`A-series`, `B-series`, etc.), y valores numéricos definidos por transformaciones tipo `Reduce`.

🪜 **Pasos guiados**

1. Abre el panel y accede a **Field → Value mappings**.

2. Haz clic en **Add mapping** y elige el tipo:

   * `Value to text` para mapear un valor exacto (por ejemplo, `0 → "Offline"`).
   * `Range to text` para asociar tramos de valores (`0-30 → Bajo`, `30-70 → Medio`, `70-100 → Alto`).
   * `Special` para valores como `null`, `NaN`, etc.

3. Crea al menos tres rangos de mapeo como en este ejemplo:

   | Rango  | Texto |
   | ------ | ----- |
   | 0–30   | Bajo  |
   | 30–70  | Medio |
   | 70–100 | Alto  |

4. Opcional: Marca **Show as thresholds** si quieres que los colores coincidan con los mappings definidos.

5. Si tu panel usa `Indicator`, observarás que el color y etiqueta se actualizan automáticamente.

6. Para mejorar aún más la expresividad:

   * Usa emojis (`🔥`, `🟢`, `⚠️`) en el campo de texto.
   * Ajusta `Min` y `Max` en **Standard Options** para controlar la escala visual.

✅ **Validaciones**

* Los valores se muestran como etiquetas, no como números brutos.
* Los rangos se aplican correctamente y cambian según los datos.
* El panel es más legible y expresivo incluso sin conocer los valores numéricos exactos.

🎯 **Retos**

* Diseña una escala semafórica (`Rojo → Amarillo → Verde`) para representar niveles de riesgo.
* Usa *mapping* de tipo `Special` para visualizar errores o valores nulos con iconos o texto.

💬 **Reflexión**

* ¿Qué aporta convertir números en etiquetas?
* ¿Cómo evitar confusión cuando varias métricas comparten escalas distintas?
