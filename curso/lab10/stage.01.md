
### 🔹 Fase 1 – Despliegue del broker MQTT local

#### 🎯 Objetivo

Poner en marcha un **broker MQTT local** con `mosquitto`, que permitirá simular sensores o dispositivos industriales publicando datos. Este broker será el punto de entrada para la integración directa con Prometheus en las siguientes fases.

---

#### 📦 Broker a utilizar

Usaremos **Eclipse Mosquitto**, un broker MQTT ligero y de código abierto.

---

#### 🐳 Paso 1 – Añadir Mosquitto al `docker-compose.yml`

Asegúrate de que tu entorno incluye el siguiente servicio:

```yaml
  mqtt:
    image: eclipse-mosquitto
    container_name: mqtt
    ports:
      - "1883:1883"  # Puerto estándar MQTT
    volumes:
      - ./mosquitto.conf:/mosquitto/config/mosquitto.conf
    restart: unless-stopped
```

---

#### 📄 Paso 2 – Crear archivo de configuración mínimo

Crea un archivo `mosquitto.conf` en el mismo directorio que el `docker-compose.yml`:

```conf
listener 1883
allow_anonymous true
```

Este archivo configura el broker para aceptar conexiones **sin autenticación**, útil para pruebas locales.

---

#### ▶️ Paso 3 – Iniciar el entorno

Lanza el broker:

```bash
docker-compose up -d mqtt
```

Verifica que el contenedor `mqtt` está corriendo:

```bash
docker ps
```

---

#### 🔎 Paso 4 – Verificar funcionamiento del broker

Instala cliente `mosquitto` (si no lo tienes ya):

```bash
sudo apt install mosquitto-clients  # En Linux
```

Suscríbete a todos los mensajes:

```bash
mosquitto_sub -h localhost -t "#" -v
```

En otra terminal, publica un mensaje:

```bash
mosquitto_pub -h localhost -t /test/topic -m "hola mundo"
```

Deberías ver el mensaje aparecer en la terminal suscrita:

```
/test/topic hola mundo
```

---

#### 📦 Resultado

Tienes un **broker MQTT funcional**, accesible desde otros servicios Docker o desde tu máquina, listo para ser utilizado como fuente de métricas en el resto del laboratorio.
