import mqtt from 'mqtt';
import axios from 'axios';

const MQTT_URL = 'mqtt://broker.hivemq.com'; // Puedes cambiar por tu broker
const TOPIC = 'fab/linea/#';
const PUSHGATEWAY_URL = 'http://pushgateway:9091';
const JOB_NAME = 'mqtt_fabricacion';

const metricas = {};  // { zona-tipo: contador }

function incrementar(zona, tipo) {
  const clave = `${zona}-${tipo}`;
  metricas[clave] = (metricas[clave] || 0) + 1;
}

const client = mqtt.connect(MQTT_URL);

client.on('connect', () => {
  console.log(`📡 Conectado a MQTT: ${MQTT_URL}`);
  client.subscribe(TOPIC, err => {
    if (err) console.error('❌ Error al suscribirse:', err);
    else console.log(`🔔 Suscrito a topic: ${TOPIC}`);
  });
});

client.on('message', (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());
    const zona = payload.zona || 'desconocida';
    const tipo = payload.tipo || 'evento';
    incrementar(zona, tipo);
  } catch (e) {
    console.warn('⚠️ Payload no válido:', message.toString());
  }
});

function generarPayload() {
  let payload = `# HELP eventos_mqtt_total Eventos recibidos vía MQTT\n`;
  payload += `# TYPE eventos_mqtt_total counter\n`;

  for (const clave in metricas) {
    const [zona, tipo] = clave.split('-');
    payload += `eventos_mqtt_total{zona="${zona}", tipo="${tipo}"} ${metricas[clave]}\n`;
  }

  return payload;
}

async function pushMetrics() {
  const payload = generarPayload();
  try {
    await axios.post(`${PUSHGATEWAY_URL}/metrics/job/${JOB_NAME}`, payload, {
      headers: { 'Content-Type': 'text/plain' }
    });
    console.log(`[MQTT → Push] OK\n${payload}`);
  } catch (err) {
    console.error('Error al enviar métricas:', err.message);
  }
}

setInterval(pushMetrics, 10_000);
