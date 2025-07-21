### 🔹 Fase 2 – Publicación de mensajes MQTT simulados

#### 🎯 Objetivo

Simular dispositivos que publican datos periódicos en el broker MQTT, como si fueran sensores industriales reales (temperatura, humedad, vibración, etc.). Estos mensajes serán procesados más adelante por un **exporter** que los convertirá en métricas Prometheus.

---

#### 🧪 Mensaje de ejemplo

Tópico:

```
/factory/env/temperature
```

Payload (formato JSON):

```json
{"value": 23.8}
```

---

#### 🧰 Opción A – Publicación manual

Prueba enviando un mensaje directamente:

```bash
mosquitto_pub -h localhost -t /factory/env/temperature -m '{"value": 24.7}'
```

Suscríbete desde otra terminal:

```bash
mosquitto_sub -h localhost -t /factory/# -v
```

---

#### ⚙️ Opción B – Simulador en bucle con Bash

```bash
while true; do
  VAL=$(awk -v min=20 -v max=28 'BEGIN{srand(); print min+rand()*(max-min)}')
  mosquitto_pub -h localhost -t /factory/env/temperature -m "{\"value\": $VAL}"
  sleep 5
done
```

> Este script publica un valor aleatorio de temperatura cada 5 segundos.

---

#### 💡 Extensión: otros sensores

Simula otros tópicos con distintos valores:

```bash
mosquitto_pub -h localhost -t /factory/env/humidity -m '{"value": 48.2}'
mosquitto_pub -h localhost -t /factory/env/vibration -m '{"value": 0.017}'
```

Puedes modificar el script Bash anterior para alternar tópicos o usar múltiples scripts en paralelo.

---

#### 🧠 Buenas prácticas

* Usa una jerarquía de tópicos consistente (`/factory/env/…`)
* Asegúrate de que los payloads estén en **formato JSON válido**
* Mantén un intervalo regular de publicación para facilitar la recolección y visualización posterior

---

#### ✅ Resultado

Ahora tienes mensajes MQTT publicándose periódicamente en tu broker `mosquitto`, simulando sensores reales. En la próxima fase, construiremos un **exporter** que los recoja y los exponga como métricas Prometheus.

