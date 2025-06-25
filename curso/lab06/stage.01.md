

## 🔹 Fase 1 – Entender el problema de CORS

### 🧠 ¿Qué es CORS?

**CORS** (*Cross-Origin Resource Sharing*) es un mecanismo de seguridad del navegador que impide que una página web cargue recursos (como imágenes, SVGs, fuentes, scripts o archivos de configuración) desde un **origen distinto** al de la propia página —a menos que ese origen lo permita explícitamente.

En nuestro caso:

* **Grafana** está intentando cargar:

  * un archivo `.svg` y/o `.yaml`
  * desde un dominio distinto (por ejemplo, GitHub Pages: `https://usuario.github.io/repo/flow/ejemplo.svg`)
* El navegador bloquea la carga si **el servidor remoto (GitHub Pages)** **no envía** el encabezado:

  ```
  Access-Control-Allow-Origin: *
  ```

---

### 🔥 Ejemplo del error en consola

```text
Access to fetch at 'https://usuario.github.io/repo/flow/ejemplo.svg'
from origin 'http://localhost:3000' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

---

### ✅ Soluciones posibles

| Opción                    | Descripción                                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| ✅ **GitHub Pages**        | GitHub Pages permite servir archivos estáticos con CORS habilitado por defecto (solo si se accede **por HTTPS**).         |
| 🚫 localhost (sin NGINX)  | Si sirves el SVG localmente (`file://` o `http://localhost:8000`), el navegador **bloqueará** la petición.                |
| ✅ **NGINX personalizado** | Si usas tu propio servidor (Docker o VM), debes añadir los encabezados `Access-Control-Allow-Origin` en la configuración. |

---

### 🛠️ Cómo permitir CORS en NGINX

Si montas un servidor NGINX personalizado (por ejemplo, en Codespaces):

```nginx
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods GET,OPTIONS;
    add_header Access-Control-Allow-Headers *;
  }
}
```

⚠️ ¡Recuerda! Estas directivas deben estar **dentro de `location` o `http`**, **no en `server` directamente**, o causarán error de arranque.

---

### 🧪 Prueba rápida

Puedes comprobar si un servidor devuelve el header usando `curl`:

```bash
curl -I https://usuario.github.io/repo/flow/ejemplo.svg
```

Debe incluir una línea como:

```http
access-control-allow-origin: *
```

