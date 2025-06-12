

# 🎨 CSS3 – Fundamentos y Técnicas para Controlar el Estilo Visual

## 📌 ¿Qué es CSS?

CSS (Cascading Style Sheets) es el lenguaje de estilos que permite definir **cómo se ve** un documento HTML: colores, tamaños, posiciones, animaciones, jerarquía visual…

El “**cascading**” (cascada) significa que varios estilos pueden aplicarse al mismo elemento, y existen **reglas de prioridad**.

---

## 1️⃣ Estructura de una regla CSS

```css
selector {
  propiedad: valor;
}
```

**Ejemplo:**

```css
p {
  color: blue;
  font-size: 16px;
}
```

Esto aplica estilo a **todos los `<p>`** del documento.

---

## 2️⃣ Selectores CSS más comunes

| Selector   | Significado  | Ejemplo       | Aplica a...                               |
| ---------- | ------------ | ------------- | ----------------------------------------- |
| `*`        | Todo         | `* {}`        | Todos los elementos                       |
| `p`        | Etiqueta     | `p {}`        | Todos los `<p>`                           |
| `.clase`   | Clase        | `.info {}`    | Elementos con `class="info"`              |
| `#id`      | ID           | `#main {}`    | Elemento con `id="main"`                  |
| `div p`    | Descendiente | `div p {}`    | Todos los `<p>` dentro de un `<div>`      |
| `p > span` | Hijo directo | `p > span {}` | Solo los `<span>` hijos directos de `<p>` |

---

## 3️⃣ Cascada y prioridad: ¿quién gana?

CSS aplica estilos según **especificidad y orden**:

* ✅ **Inline style** (`style="..."`) → máxima prioridad
* ✅ **ID selector** (`#main`) → prioridad alta
* ✅ **Class selector** (`.btn`) → media
* ✅ **Elemento (`div`, `p`)** → baja

**Ejemplo:**

```html
<p id="msg" class="error" style="color: green;">Hola</p>
```---

¿Quieres que prepare también un cheat sheet imprimible para los alumnos?


Si tienes esto en CSS:

```css
.error { color: red; }
#msg { color: blue; }
```

🔎 El texto será **verde** porque `style="color: green;"` tiene más prioridad.

---

## 4️⃣ Cómo forzar un estilo con `!important`

Cuando necesitas **ganar sí o sí** ante estilos inline o fuertes:

```css
p {
  color: orange !important;
}
```

Usa `!important` con cuidado: **abusa solo cuando no tienes otra opción** (por ejemplo, al sobrescribir estilos embebidos como en Grafana).

---

## 5️⃣ Propiedades visuales más comunes

| Propiedad          | Ejemplo                     | Descripción            |
| ------------------ | --------------------------- | ---------------------- |
| `color`            | `color: red;`               | Color del texto        |
| `background-color` | `background-color: yellow;` | Fondo                  |
| `border`           | `border: 1px solid black;`  | Borde                  |
| `padding`          | `padding: 10px;`            | Espacio interior       |
| `margin`           | `margin: 20px;`             | Espacio exterior       |
| `font-size`        | `font-size: 14px;`          | Tamaño de letra        |
| `display`          | `display: flex;`            | Modelo de presentación |
| `position`         | `position: absolute;`       | Posicionamiento        |

---

## 6️⃣ Pseudoclases y estados

Permiten aplicar estilo según **el estado** del elemento:

```css
a:hover {
  color: orange;
}
input:focus {
  border-color: blue;
}
```

---

## 7️⃣ Media queries y diseño responsivo

Para adaptar estilos según el tamaño de pantalla:

```css
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}
```

---

## 8️⃣ Jerarquía visual y buenas prácticas

* Usa **colores con contraste** para legibilidad.
* Define una **tipografía clara y jerarquizada** (`h1 > h2 > p`).
* Mantén coherencia entre secciones: usa clases reutilizables.
* Agrupa estilos por componente o sección.

---

## 🧪 Mini ejercicio práctico

```html
<div class="card">
  <h2>Título</h2>
  <p>Este es un párrafo con estilo</p>
</div>
```

```css
.card {
  border: 2px solid #333;
  padding: 10px;
  background-color: #f9f9f9;
}
.card p {
  color: #555;
  font-style: italic;
}
```

📌 ¿Qué estilos se aplicarían si ahora añadimos `style="color: red;"` al `<p>`?
