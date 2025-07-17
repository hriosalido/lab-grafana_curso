

## 🔹 Fase 5 – Enlazar desde overview a detalle

### 🎯 Objetivo

Permitir al usuario hacer clic en un botón de arranque/parada y navegar a un dashboard detallado que muestre información específica de ese equipo o línea.

---

### 🔗 ¿Cómo se hace la navegación?

El plugin Flow permite añadir enlaces (`link`) en cada celda del SVG mediante el archivo `panelConfig.yaml`. Estos enlaces pueden incorporar variables como `${cell.name}` para que la navegación sea **contextual**.

---

### 📁 Paso 1 – Crear dashboard destino (detalle)

1. Duplica el dashboard actual y llámalo por ejemplo: `Detalle Máquina`.
2. Añade una variable llamada `maquina` (de tipo texto o query).
3. Filtra los paneles según la variable `maquina` (por ejemplo, mostrando solo las series cuyo alias contenga el nombre de la máquina).

---

### ⚙️ Paso 2 – Añadir enlaces al YAML

En `panelConfig.yaml` define los enlaces por celda:

```yaml
cells:
  arranque-env:
    dataRef: arranques-env
    label:
      units: arranques
    fillColor:
      thresholds: *thresholds
    link: "/d/detalle-maquina?var-maquina=env"
  
  parada-env:
    dataRef: paradas-env
    label:
      units: paradas
    fillColor:
      thresholds: *thresholds
    link: "/d/detalle-maquina?var-maquina=env"
  
  arranque-mezcla:
    dataRef: arranques-mezcla
    label:
      units: arranques
    fillColor:
      thresholds: *thresholds
    link: "/d/detalle-maquina?var-maquina=mezcla"
```

> 🔎 Puedes usar `${__dashboard.uid}` o `${__cell.name}` si necesitas reutilizar variables del entorno.

---

### 🧪 Verificación

1. Pasa el ratón por encima de un nodo del SVG.
2. Verifica que se muestre un icono/link de navegación.
3. Haz clic → se abrirá el dashboard detalle con la variable `maquina` ya seleccionada.

---

### 🧭 Bonus: navegación cruzada + back

En el dashboard de detalle puedes añadir un botón o un panel con un enlace de vuelta:

```
[← Volver al overview](/d/overview-maquinas)
```

