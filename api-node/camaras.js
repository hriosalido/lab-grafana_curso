const express = require('express');
const router = express.Router();
const {
  formatISO,
  parseISO,
  isValid,
  addSeconds,
  addMinutes,
  addHours,
  differenceInSeconds,
} = require('date-fns');

const CAMARAS = ['Camara_1', 'Camara_2', 'Camara_3'];

function getIntervalFn(secondsDiff) {
  if (secondsDiff <= 15 * 60) return { fn: addSeconds, step: 1 };
  if (secondsDiff <= 6 * 3600) return { fn: addMinutes, step: 1 };
  if (secondsDiff <= 7 * 86400) return { fn: addMinutes, step: 10 };
  if (secondsDiff <= 30 * 86400) return { fn: addHours, step: 1 };
  return { fn: addHours, step: 6 };
}

router.get('/', (req, res) => {
  const camara = req.query.camara || 'Camara_1';
  const from = req.query.from ? parseISO(req.query.from) : new Date(Date.now() - 3600_000);
  const to = req.query.to ? parseISO(req.query.to) : new Date();

  if (!isValid(from) || !isValid(to) || from >= to) {
    return res.status(400).json({
      error: 'Parámetros "from" y "to" requeridos y válidos en formato ISO: ?from=...&to=...',
    });
  }

  if (!CAMARAS.includes(camara)) {
    return res.status(400).json({
      error: `Parámetro "camara" inválido. Opciones válidas: ${CAMARAS.join(', ')}`,
    });
  }

  const diffSeconds = differenceInSeconds(to, from);
  const { fn: addFn, step } = getIntervalFn(diffSeconds);

  console.log(`[INFO] GET /camaras - camara=${camara}, from=${formatISO(from)}, to=${formatISO(to)}, intervalo=${step}${addFn.name.replace('add', '').toLowerCase()}`);

  const rows = [];
  rows.push('time,T,H,D,C,A'); // 🟢 Cabecera CSV

  let current = from;
  while (current <= to) {
    const timestamp = formatISO(current, { representation: 'complete' });
    const T = (Math.random() * -4 - 1).toFixed(1);
    const H = Math.floor(Math.random() * 10 + 80);
    const D = Math.random() < 0.5 ? 'Cerrada' : 'Abierta';
    const C = 'ACTIVO';
    const A = Math.random() < 0.1 ? 'ACTIVA' : 'INACTIVA';

    rows.push(`${timestamp},${T},${H},${D},${C},${A}`);
    current = addFn(current, step);
  }

  res.setHeader('Content-Type', 'text/csv');
  res.send(rows.join('\n'));
});

module.exports = router;
