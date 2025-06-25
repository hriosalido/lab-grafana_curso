

## 🔹 Fase 2 – Crear y publicar SVG + config en GitHub Pages

### 🎯 Objetivo

Crear un **diagrama SVG** y un archivo de configuración `.yaml` para usarlo en el plugin Flowcharting/Flow de Grafana, y servir ambos desde **GitHub Pages** para que Grafana los consuma dinámicamente.

---

### 📁 Estructura del proyecto

```bash
flow-lab/
├── flow/
│   ├── ejemplo.svg
│   └── config.yaml
├── .github/
│   └── workflows/deploy.yml   # opcional
├── index.html                 # opcional
└── README.md
```

---

### 🖼️ ejemplo.svg (mínimo)

Puedes crear tu SVG con [draw.io](https://draw.io) y exportarlo como `.svg`. Asegúrate de incluir `data-id` o `data-name` en los nodos si luego quieres vincular datos.

```xml
<!-- flow/ejemplo.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <rect x="10" y="10" width="150" height="50" fill="lightblue" stroke="black" data-id="test" />
  <text x="25" y="40">Nodo Test</text>
</svg>
```

---

### ⚙️ config.yaml

```yaml
cells:
  test:
    dataRef: test-data-small-sin
    label:
      units: "%"
      decimalPoints: 1
    labelColor:
      gradientMode: "hue"
      thresholds:
        - { color: "green", level: 0 }
        - { color: "yellow", level: 50 }
        - { color: "red", level: 90 }
```

---

### 🌍 Activar GitHub Pages

1. Sube el repositorio a GitHub.
2. Ve a `Settings → Pages`.
3. Elige como fuente `Branch: main`, carpeta `/root` o `/docs` si lo pones ahí.
4. Una vez publicado, tendrás una URL tipo:

```
https://usuario.github.io/flow-lab/flow/ejemplo.svg
https://usuario.github.io/flow-lab/flow/config.yaml
```

⚠️ **Usa HTTPS** para evitar errores CORS.

---

### 🧪 Validación rápida

Visita ambos enlaces en el navegador. Deben mostrarse:

* El `.svg` como imagen.
* El `.yaml` como texto plano.

También puedes validar CORS con:

```bash
curl -I https://usuario.github.io/flow-lab/flow/ejemplo.svg
```
