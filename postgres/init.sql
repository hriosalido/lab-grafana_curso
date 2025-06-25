-- Crear base de datos y esquema
CREATE TABLE IF NOT EXISTS eventos (
  id SERIAL PRIMARY KEY,
  proceso_id INT,
  tipo_evento TEXT,                -- creado, asignado, resuelto, error
  valor NUMERIC DEFAULT 1,         -- opcional: duración, peso, carga...
  timestamp TIMESTAMP              -- marca temporal del evento
);


CREATE TABLE IF NOT EXISTS pulsaciones (
  id SERIAL PRIMARY KEY,
  proceso_id INT,
  boton TEXT,  
  accion TEXT,              
  valor NUMERIC DEFAULT 1,         
  timestamp TIMESTAMP              
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
<<<<<<< HEAD
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
=======
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


DO $$
BEGIN
  FOR i IN 1..5000 LOOP
    INSERT INTO pulsaciones (
      proceso_id,
      boton,
      accion,
      valor,
      timestamp
    ) VALUES (
      FLOOR(RANDOM() * 200)::INT + 100,
      (ARRAY['seccion-a','seccion-b'])[FLOOR(RANDOM()*2 + 1)],
      (ARRAY['0','1'])[FLOOR(RANDOM()*2 + 1)],
      ROUND((RANDOM() * 10 + 1)::numeric, 2),
      NOW() - (RANDOM() * INTERVAL '30 days')
    );
  END LOOP;
END $$;
>>>>>>> a21d7a79521c4fab1aab01313495ec8380685319
