### Fase 1: Instalar plugin Diagram Panel

🎯 **Objetivo:** Instalar manualmente el plugin `Diagram Panel` en Grafana, reiniciar el contenedor y validar que aparece en la lista de visualizaciones.

🧱 **Scaffold:**

* Contenedor `grafana` corriendo en Codespaces
* Permisos para ejecutar `grafana-cli` dentro del contenedor

🧭 **Pasos detallados:**

1. **Acceder al contenedor de Grafana:**

   ```bash
   docker exec -it grafana /bin/bash
   ```

2. **Instalar el plugin Diagram Panel:**

   ```bash
   grafana-cli plugins install marcusolsson-diagram-panel
   ```

   * Espera a que la instalación se complete correctamente

3. **Salir del contenedor:**

   ```bash
   exit
   ```

4. **Reiniciar el contenedor de Grafana:**

   ```bash
   docker compose restart grafana
   ```

5. **Verificar la instalación:**

   * Accede de nuevo a Grafana en el navegador
   * Crea un nuevo panel y en el tipo de visualización verifica que `Diagram` aparece disponible

🔥 **Reto adicional:**

* Intenta listar todos los plugins instalados en Grafana:

  ```bash
  docker exec grafana grafana-cli plugins ls
  ```

💡 *TIP:* Si el plugin no aparece, asegúrate de reiniciar el contenedor. Algunos plugins no se cargan hasta el reinicio.

✅ **Validación:**

* El plugin `Diagram Panel` aparece como opción al crear un nuevo panel
* `grafana-cli plugins ls` lo muestra como instalado correctamente
* No se producen errores al reiniciar o acceder a Grafana
