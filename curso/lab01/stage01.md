## Laboratorio 01: Diagramas de procesos con Grafana (Diagram Panel)

🎯 **Objetivo general**
Aprender a utilizar el plugin `jdbranham-diagram-panel` de Grafana para representar flujos de negocio mediante SVG dinámicos, vinculados a datos de una fuente como CSV. Se trabajará con estilos, enlaces, tooltips y condiciones visuales.

🧰 **Requisitos previos**

* Entorno Docker o GitHub Codespaces con Grafana y plugin `jdbranham-diagram-panel` instalado
* Plugin de datasource CSV (`marcusolsson-csv-datasource`) instalado
* Familiaridad básica con dashboards en Grafana

🔬 **Fases del laboratorio**

### Fase 1: Verificación del plugin y entorno

🎯 **Objetivo**
Asegurar que el plugin Diagram Panel está instalado correctamente y disponible para su uso.

🔧 **Pasos detallados**

1. Acceder a Grafana desde tu navegador:

   ```bash
   http://localhost:3000
   ```

   Usuario: `admin`
   Contraseña: `admin` (o según se haya definido)

2. Navegar a `Configuration > Plugins` y buscar `Diagram Panel`:

   * Comprobar que el plugin aparece como instalado.
   * Si no aparece, revisar la variable de entorno:

     ```yaml
     GF_INSTALL_PLUGINS=jdbranham-diagram-panel
     ```

     en tu `docker-compose.yml` o configuración Docker.

3. Reiniciar Grafana si hiciste cambios en los plugins:

   ```bash
   docker restart grafana
   ```

4. Crear un nuevo dashboard:

   * Ir a `Dashboards > New > New Dashboard`
   * Click en `Add new panel`

5. Seleccionar el tipo de panel `Diagram` en la esquina superior derecha.

   * Si no aparece como opción, el plugin **no está bien instalado**.

✅ **Validación del aprendizaje**

* El panel de tipo `Diagram` aparece como opción en la creación de paneles
* El plugin está listado en `Configuration > Plugins`
* No se han producido errores al acceder al panel

🔥 **Reto opcional**

* Intenta instalar el plugin manualmente si estás fuera de un entorno Docker:

  ```bash
  grafana-cli plugins install jdbranham-diagram-panel
  systemctl restart grafana-server
  ```

---

### Fase 2: Primer panel de tipo Diagrama

🎯 Objetivo: Crear un panel básico Diagram y configurar el SVG inicial.

### Fase 3: Configuración de datasource CSV

🎯 Objetivo: Configurar una fuente de datos CSV simple que simule estados de nodos.

### Fase 4: Enlace de nodos SVG con datos

🎯 Objetivo: Usar `metric`, `alias` y otras propiedades para vincular los datos al diagrama.

### Fase 5: Condiciones visuales y estados

🎯 Objetivo: Aplicar cambios visuales en nodos en función de los valores: colores, clases, texto.

### Fase 6: Interacciones avanzadas

🎯 Objetivo: Añadir tooltips dinámicos, enlaces y navegación entre dashboards.

### Fase 7: Subdiagramas y agrupaciones

🎯 Objetivo: Crear componentes reutilizables o zonas diferenciadas dentro del mismo SVG.

### Fase 8: Integración con dashboard completo

🎯 Objetivo: Añadir el panel de diagrama junto a otros (estadísticas, tablas, etc.).

✅ **Validaciones finales**

* Se ha creado un panel funcional con SVG dinámico
* El panel responde a datos del CSV
* Estilos y enlaces se actualizan en tiempo real
* Se han explorado las funcionalidades principales del plugin
