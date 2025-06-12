
### Fase 2.10 – Aplicar estilos Mermaid y sobrescribir con CSS

🎯 **Objetivo**
Aprender a definir estilos estructurales en Mermaid mediante `classDef`, y luego sobrescribirlos mediante selectores CSS personalizados desde la sección avanzada del panel.

🗂️ **Scaffolding**
Se parte de un panel Diagram con nodos etiquetados (por ejemplo `A-series`, `B-series`, `C-series`) y clases Mermaid aplicadas (`entrada`, `salida`, `intermedio`).

🪜 **Pasos guiados**

1. En el campo **Diagram definition**, define estilos `classDef` básicos:

```mermaid
graph LR
  A-series:::entrada --> B-series:::salida
  B-series --> C-series:::intermedio

  classDef entrada fill=#e8f5e9,stroke=#2e7d32,color=#1b5e20;
  classDef salida fill=#fff3e0,stroke=#ef6c00,color=#e65100;
  classDef intermedio fill=#e3f2fd,stroke=#1565c0,color=#0d47a1;
```

2. Guarda y observa los cambios aplicados directamente desde Mermaid.

3. Abre el panel > pestaña **Panel options > Advanced > Custom CSS**.

4. Aplica sobrescritura visual con selectores SVG, como:

```css
#diagram-1 g.entrada rect {
  stroke: crimson !important;
  stroke-width: 3px !important;
}

#diagram-1 g.salida text {
  fill: crimson !important;
  font-style: italic !important;
}

#diagram-1 g.intermedio rect {
  rx: 8px; /* esquinas redondeadas */
}
```

5. Guarda y recarga el dashboard si no ves cambios inmediatos.

6. Usa `F12` para inspeccionar si se está aplicando correctamente el estilo.

✅ **Validaciones**

* Se aplican los estilos Mermaid correctamente (`classDef`).
* Al menos un estilo ha sido sobrescrito exitosamente desde CSS.
* El estilo de los nodos es visualmente distinto al renderizado inicial.

🎯 **Retos**

* Define una clase Mermaid llamada `alerta` y cámbiale el color desde CSS a rojo oscuro con borde más grueso.
* Usa `Custom CSS` para redondear solo los nodos `B-series`.
* Forza estilos visuales aunque Mermaid los haya definido con `fill` directamente.

💬 **Reflexión**

* ¿Qué limitaciones tiene `classDef` en comparación con CSS?
* ¿Cuándo conviene usar CSS directo frente a mantener todo en Mermaid?
