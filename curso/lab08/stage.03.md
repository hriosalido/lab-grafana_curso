

## ✨ Fase 3 – Personalización visual con `${var}`

### 🎯 Objetivo

Aplicar variables en los títulos, etiquetas y contenidos de los paneles para que la visualización se adapte automáticamente al `job` e `instance` seleccionados por el usuario. Esto mejora la comprensión del contexto y permite dashboards reutilizables.

---

### 🛠️ Pasos

1. Abre el panel de uso de memoria editado en la Fase 2.

2. En la parte derecha, en **Panel options > Title**, escribe:

   ```
   Uso de memoria en ${instance}
   ```

3. Haz clic en **Apply** para guardar los cambios.

---

### 🧪 Mostrar valores dinámicos

1. Crea un nuevo panel de tipo **Stat** o **Text**.
2. En la consulta escribe:

   ```promql
   up{job="${job}", instance="${instance}"}
   ```
3. Este panel mostrará si la instancia seleccionada está activa (`1`) o caída (`0`).

---

### 🎨 Personaliza el título

* En **Panel title**, usa:

  ```
  Estado de ${job} en ${instance}
  ```

4. (Opcional) Activa **Thresholds** o **color por valor** para que el panel muestre verde si `up == 1`, rojo si `up == 0`.

---

### 🧾 Resultado esperado

* Los títulos de los paneles se actualizan automáticamente al seleccionar un `job` e `instance`.
* El usuario puede cambiar el contexto sin duplicar paneles.
* Se visualiza claramente qué instancia se está consultando y su estado.


