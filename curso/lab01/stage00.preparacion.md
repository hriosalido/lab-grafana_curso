# 📘 Briefing Curso: Visualización de Flujos de Negocio en Grafana

(...)

## 🧪 Laboratorio: Visualizar flujo de pedidos con Diagram Panel

### Fase 0: Preparación del entorno

🎯 **Objetivo:** Preparar el entorno de trabajo en GitHub Codespaces desde cero, levantar todos los servicios con Docker, y verificar el acceso a Grafana y a los datos de entrada.

🧱 **Scaffold:**

* Codespace basado en un repositorio que incluya `docker-compose.yml` y una carpeta `./data` con el archivo `pedidos.csv`.
* Servicios definidos en Docker:

  * `grafana` en el puerto 3000
  * `static-server` en el puerto 8080 sirviendo `./data`

🧭 **Pasos detallados:**

1. **Abrir el entorno Codespaces:**

   * Desde GitHub, ve a `Code > Codespaces > Create codespace on main`.
   * Espera a que el contenedor se abra en VS Code Web.

2. **Verificar la estructura de archivos:**

   * Asegúrate de que existen:

     * `docker-compose.yml`
     * `./data/pedidos.csv`
   * Si no existen, créalos:

     ```bash
     mkdir -p data
     echo "pedido_id,estado,fecha" > data/pedidos.csv
     echo "1001,validado,2024-06-01" >> data/pedidos.csv
     echo "1002,pendiente,2024-06-02" >> data/pedidos.csv
     echo "1003,error,2024-06-03" >> data/pedidos.csv
     ```

3. **Levantar los servicios con Docker Compose:**

   ```bash
   docker compose up -d
   docker compose ps
   ```

   * Verifica que los servicios están `Up`

4. **Acceder a Grafana:**

   * Abre el puerto 3000 si aún no lo ves publicado
   * Ve a la URL de Codespaces para el puerto 3000:

     ```
     https://<tu-nombre>-3000.app.github.dev
     ```
   * Login: `admin` / `admin`

5. **Acceder al archivo de datos:**

   * En tu navegador abre:

     ```
     https://<tu-nombre>-8080.app.github.dev/pedidos.csv
     ```
   * Debes ver el contenido CSV con los pedidos

🔥 **Reto adicional:**

* Abre un nuevo archivo llamado `README.md` en el Codespace y documenta:

  * Qué servicios se han levantado
  * Qué URL corresponde a cada uno
  * Qué dataset se usará en el laboratorio

💡 *TIP:* Si no ves los puertos abiertos, ve a la pestaña “Ports” en Codespaces y expón manualmente los puertos 3000 y 8080 como `public`.

✅ **Validación:**

* Puedes entrar a Grafana desde el navegador y hacer login con éxito
* El archivo `pedidos.csv` es accesible públicamente desde el navegador
* `docker compose ps` muestra `grafana` y `static-server` en estado `Up`
