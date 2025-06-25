# Flow

Visualización de diagramas de flujo SVG


El plugin Flow proporciona visualización métrica lado a lado sobre diagramas SVG. Tú proporcionas el diagrama SVG junto con una configuración sobre cómo quieres que se comporte el diagrama. El panel luego combina estos con tus datos de series temporales para dar vida al diagrama.

## Ejemplo 1

![example1](https://github.com/andymchugh/andrewbmchugh-flow-panel/blob/main/src/img/example1.png?raw=true)

## Ejemplo 2

![example2](https://github.com/andymchugh/andrewbmchugh-flow-panel/blob/main/src/img/example2.png?raw=true)

## Ejemplo 3

![example3](https://github.com/andymchugh/andrewbmchugh-flow-panel/blob/main/src/img/threadHighlighting.gif?raw=true)

## Público objetivo

Los dashboards que muestran flujos a través de sistemas distribuidos a menudo se hacen grandes rápidamente y se benefician de un diagrama arquitectónico inicial. Este panel está diseñado para soportar dichos diagramas. Creas el SVG en un editor como draw\.io y luego asocias las series de datos y umbrales mediante configuración YAML. Además de anotar el diagrama con datos, puedes añadir enlaces que permitan hacer clic en los diferentes widgets para navegar a una vista detallada del componente seleccionado.

Piensa en una cabina de mando con capas de detalle; cada capa aporta un nivel mayor de detalle sobre la salud del sistema. Al crear suites de dashboards como estas, a menudo acabas con muchos widgets similares que se benefician de compartir configuración de umbrales. Este panel permite precisamente eso, compartiendo umbrales y enlaces tanto dentro de un panel como entre varios. Incluso permite adaptar conjuntos de umbrales en función de selecciones de variables de Grafana.

Este panel no está limitado a valores finales. Como ya se han cargado los datos del rango de tiempo, este panel te permite ver el diagrama en cualquier punto de ese rango. Usa el control deslizante de tiempo para ver cómo evolucionan tus flujos. Esto no genera sobrecarga adicional en Grafana porque las series ya están cargadas; solo se cambia el punto de interés.

## Conjunto de funcionalidades

El contenido del plugin se define con tres archivos:

* **SVG**: Define el diagrama con widgets controlables identificados por sus IDs.
* **PanelConfig**: Definido en YAML, asocia los IDs del SVG con las series de datos, umbrales, enlaces y configuración visual.
* **SiteConfig**: Definido en YAML, proporciona configuración compartida entre paneles, como colores, umbrales, enlaces, etc.

Los datos pueden ser pegados directamente en el panel o cargados desde URLs externas como GitHub. Por defecto, el panel muestra los últimos valores del rango de tiempo. El control deslizante permite navegar por la serie temporal y ver cómo cambia el flujo a lo largo del tiempo.

Visualizaciones soportadas:

* Contenido de etiquetas
* Color de etiqueta
* Color de relleno
* Color de borde
* Enlaces
* Animaciones de flujo
* Nivel de relleno
* Atributos personalizados de elementos SVG

*Nota: las tooltips no están soportadas directamente, pero se pueden definir en el SVG. En draw\.io: `seleccionar widget -> Editar -> Editar Tooltip` o `ALT + SHIFT + T`.*

## Primeros pasos

Crea un panel Flow en tu dashboard. La configuración inicial carga un ejemplo desde este repositorio vía URLs. También habilita *test-timeseries-enrichment* para que haya datos visibles desde el inicio.

### Explorar

* **Escalado**: Cambia el tamaño del panel y verás cómo el SVG se adapta automáticamente.
* **Control deslizante de tiempo**: Arrástralo y observa cómo cambian los colores y etiquetas. Puedes desactivarlo desde las opciones del panel o ponerlo en modo "Time" para sincronizar con otros paneles.
* **Enlaces**: Pasa el cursor sobre una celda para ver si tiene un enlace asociado. Haz clic para navegar.
* **Referencias SVG y Config**: Edita las referencias y observa cómo el panel responde a los cambios.

### Test Data Generation

Si desactivas esta opción, el SVG perderá sus anotaciones. Al reactivarlo, los colores y valores volverán.

### Debug (desde consola del navegador)

* **Debugging Data**: Muestra las series tal como las ve el plugin.
* **Mappings**: Muestra cómo se asignan los IDs del SVG a las series temporales.
* **Units**: Muestra las unidades disponibles.
* **Colors**: Muestra los colores disponibles por tema.
* **SVG**: Muestra el SVG serializado que se está usando.
* **Timings**: Mide tiempos de renderizado por pasos.

### Usar draw\.io

* Añade el plugin `svgdata.js` desde `Extras → Plugins → Add`.
* Guarda como SVG (o exporta como SVG si usas imágenes embebidas o animaciones).
* Usa IDs significativos.

### Usar YAML

* Puede ser pegado directamente o referenciado por URL.
* `panelConfig`: específico para cada panel.
* `siteConfig`: compartido entre paneles (opcional).

Usa variables de Grafana para adaptar configuraciones a diferentes entornos.

Ejemplos:

* [panelConfig.yaml](https://github.com/andymchugh/andrewbmchugh-flow-panel/blob/main/yaml_defs/panelConfig.yaml)
* [siteConfig.yaml](https://github.com/andymchugh/andrewbmchugh-flow-panel/blob/main/yaml_defs/siteConfig.yaml)

### Flujo de trabajo recomendado

1. Usa draw\.io (app de escritorio) y añade el plugin svgdata.js.
2. Usa GitHub como repositorio de archivos.
3. Usa VSCode para editar YAML y SVG.
4. Itera: edita SVG → copia → pega en panel. Edita YAML → copia → pega en panel.

### Crear tu primer panel

1. Crea SVG con IDs significativos en draw\.io.
2. Usa un ejemplo de panelConfig con testData.
3. Crea panel Flow y asocia el SVG y config YAML.
4. Desarrolla tu consulta en un panel separado y dale un alias.
5. Copia esa consulta al panel Flow.
6. Asocia el `dataRef` al alias.
7. Usa el time-slider para ver cómo cambia.
8. Desactiva testData al terminar.