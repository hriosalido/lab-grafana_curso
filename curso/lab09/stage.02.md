
### 🔹 Fase 2 – Envío manual de métricas con `curl`

#### 🎯 Objetivo

Aprender a enviar métricas **personalizadas** a Prometheus mediante el **Pushgateway**, usando herramientas básicas como `curl`. Esta fase permite entender la sintaxis Prometheus y verificar el flujo push → scrape → visualización.

---

#### 📥 Sintaxis de una métrica

Una métrica Prometheus básica tiene esta estructura:

```
<metric_name> <value>
```

Ejemplo:

```
temperature_celsius 24.6
```

---

#### 📤 Envío de la métrica con `curl`

Utiliza el siguiente comando para enviar una métrica al Pushgateway:

```bash
echo "temperature_celsius 24.6" | curl --data-binary @- http://localhost:9091/metrics/job/sensorA
```

> 🔁 Puedes cambiar el nombre del `job` (`sensorA`) para representar distintas fuentes de datos.

---

#### ✅ Verificación

1. Abre Prometheus: [http://localhost:9090](http://localhost:9090)
2. Busca la métrica:

```
temperature_celsius
```

3. Verifica que aparece una serie con etiquetas como:

```
{job="sensorA"}
```

4. También puedes consultar por el job:

```
{job="sensorA"}
```

---

#### 🧪 Prueba con más métricas

Envía otra métrica con un nombre diferente:

```bash
echo "humidity_percent 56.2" | curl --data-binary @- http://localhost:9091/metrics/job/sensorA
```

También puedes cambiar el `job`:

```bash
echo "vibration_level 3.8" | curl --data-binary @- http://localhost:9091/metrics/job/motorB
```

---

#### 💡 Consejo

Puedes agrupar varias métricas en un solo push:

```bash
cat <<EOF | curl --data-binary @- http://localhost:9091/metrics/job/sensorA
temperature_celsius 22.1
humidity_percent 48.7
EOF
```

