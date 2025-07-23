import axios from 'axios';

const PUSHGATEWAY_URL = 'http://pushgateway:9091';
const JOB_NAME = 'simulador_prueba';

const zonas = ['despiece', 'congelado', 'paletizado'];
const tipos = ['arranque', 'parada'];

function generarPayload() {
  let payload = `# HELP eventos_fabricacion_total Eventos simulados de producción\n`;
  payload += `# TYPE eventos_fabricacion_total counter\n`;

  zonas.forEach(zona => {
    tipos.forEach(tipo => {
      const valor = Math.floor(Math.random() * 5); // entre 0 y 4
      if (valor > 0) {
        payload += `eventos_fabricacion_total{zona="${zona}", tipo="${tipo}"} ${valor}\n`;
      }
    });
  });

  return payload;
}

async function pushMetrics() {
  const payload = generarPayload();
  try {
    await axios.post(`${PUSHGATEWAY_URL}/metrics/job/${JOB_NAME}`, payload, {
      headers: { 'Content-Type': 'text/plain' }
    });
    console.log(`[${new Date().toISOString()}] Métricas enviadas:\n${payload}`);
  } catch (err) {
    console.error('Error al enviar métricas:', err.message);
  }
}

// Push cada 10 segundos
setInterval(pushMetrics, 10_000);

// Primera ejecución inmediata
pushMetrics();
