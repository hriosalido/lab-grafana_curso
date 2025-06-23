-- Crear base de datos y esquema
CREATE TABLE IF NOT EXISTS eventos (
  id SERIAL PRIMARY KEY,
  proceso_id INT,
  tipo_evento TEXT,                -- creado, asignado, resuelto, error
  valor NUMERIC DEFAULT 1,         -- opcional: duración, peso, carga...
  timestamp TIMESTAMP              -- marca temporal del evento
);

-- Insertar datos base manuales para testing visual
INSERT INTO eventos (proceso_id, tipo_evento, valor, timestamp)
VALUES
  (101, 'creado', 1, NOW() - INTERVAL '4h'),
  (101, 'asignado', 1, NOW() - INTERVAL '3h'),
  (101, 'resuelto', 1, NOW() - INTERVAL '2h'),
  (102, 'creado', 1, NOW() - INTERVAL '2.5h'),
  (102, 'asignado', 1, NOW() - INTERVAL '2h'),
  (102, 'error', 1, NOW() - INTERVAL '1.5h'),
  (103, 'creado', 1, NOW() - INTERVAL '1h');

-- Generar 5000 eventos aleatorios en el último mes (simulación para rendimiento)
DO $$
BEGIN
  FOR i IN 1..5000 LOOP
    INSERT INTO eventos (
      proceso_id,
      tipo_evento,
      valor,
      timestamp
    ) VALUES (
      FLOOR(RANDOM() * 200)::INT + 100,
      (ARRAY['creado','asignado','resuelto','error'])[FLOOR(RANDOM()*4 + 1)],
      ROUND((RANDOM() * 10 + 1)::numeric, 2),
      NOW() - (RANDOM() * INTERVAL '30 days')
    );
  END LOOP;
END $$;
