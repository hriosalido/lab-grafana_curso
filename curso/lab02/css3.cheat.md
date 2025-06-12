

# 📄 CSS3 Cheat Sheet – Guía Rápida de Estilos

---

## 🎯 ESTRUCTURA BÁSICA

```css
selector {
  propiedad: valor;
}
```

---

## 🔍 SELECTORES

| Selector      | Significado                          |
| ------------- | ------------------------------------ |
| `*`           | Todos los elementos                  |
| `p`           | Todos los `<p>`                      |
| `.clase`      | Elementos con `class="clase"`        |
| `#id`         | Elemento con `id="id"`               |
| `div p`       | Todos los `<p>` dentro de un `<div>` |
| `p > span`    | `<span>` hijo directo de `<p>`       |
| `a:hover`     | Cuando el cursor pasa sobre un `<a>` |
| `input:focus` | Cuando un `<input>` está enfocado    |

---

## 🎨 PROPIEDADES COMUNES

| Propiedad          | Ejemplo                    | Descripción            |
| ------------------ | -------------------------- | ---------------------- |
| `color`            | `color: red;`              | Color del texto        |
| `background-color` | `background-color: #eee;`  | Color de fondo         |
| `font-size`        | `font-size: 16px;`         | Tamaño de fuente       |
| `font-weight`      | `font-weight: bold;`       | Negrita                |
| `text-align`       | `text-align: center;`      | Alineación             |
| `padding`          | `padding: 10px;`           | Espacio interno        |
| `margin`           | `margin: 20px;`            | Espacio externo        |
| `border`           | `border: 1px solid black;` | Borde                  |
| `width` / `height` | `width: 100px;`            | Dimensiones            |
| `display`          | `display: flex;`           | Modelo de presentación |
| `position`         | `position: relative;`      | Posicionamiento        |

---

## 🔗 ESPECIFICIDAD Y CASCADA

| Nivel        | Prioridad |
| ------------ | --------- |
| Inline style | 🔥 Máxima |
| `#id`        | Alta      |
| `.clase`     | Media     |
| `elemento`   | Baja      |

✔️ Usa `!important` solo si necesitas forzar un estilo:

```css
p { color: red !important; }
```

---

## 📱 MEDIA QUERIES

```css
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}
```

Adapta estilos a pantallas pequeñas.

---

## ✨ BONUS: FLEXBOX

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

---

## 🧪 EJEMPLO COMPLETO

```html
<div class="box">Hola</div>
```

```css
.box {
  color: white;
  background-color: navy;
  padding: 10px;
  border-radius: 5px;
}
```