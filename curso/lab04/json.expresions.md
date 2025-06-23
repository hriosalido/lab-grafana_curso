# 📄 Cheat Sheet – Expresiones JSONPath para Grafana

---

## 🧠 Estructura base compatible

```json
[
  {
    "time": "2025-06-23T00:00:00Z",
    "temp": 22.5,
    "hum": 60,
    "status": "OK",
    "sensor": { "id": "C1", "ubicacion": "Norte" }
  }
]
```

---

## 🔹 Selectores básicos

| Expresión JSONPath            | Significado                              | Resultado tipo    |
| ----------------------------- | ---------------------------------------- | ----------------- |
| `$`                           | raíz del documento JSON                  | todo el documento |
| `$[*]`                        | cada objeto del array                    | lista de objetos  |
| `$[*].temp`                   | todos los `temp`                         | lista de números  |
| `$[*].sensor.id`              | acceso a objetos anidados                | lista de strings  |
| `$[*]['temp']`                | clave entre comillas (si tiene espacios) | lista de números  |
| `$[*]["sensor"]["ubicacion"]` | acceso explícito a clave anidada         | lista de strings  |

---

## 🔹 Filtrado condicional *(no compatible nativo en plugin JSON API)*

```jsonpath
$[?(@.temp > 25)]
```

Esto **no funciona** directamente en el plugin `marcusolsson-json-datasource` actualmente. Si necesitas filtros:

* O lo haces desde backend
* O cargas todo y filtras luego en **Transform > Filter by value**

---

## 🔹 Uso en arrays dentro de objetos

```json
[
  {
    "time": "...",
    "lecturas": [
      { "valor": 5, "tipo": "T" },
      { "valor": 80, "tipo": "H" }
    ]
  }
]
```

| Expresión                             | Resultado                  |
| ------------------------------------- | -------------------------- |
| `$[*].lecturas[*].valor`              | Todos los valores anidados |
| `$[*].lecturas[?(@.tipo=="T")].valor` | ❌ No compatible aún        |

---

## 🔹 Selección de campos múltiples (usado en transformaciones)

```jsonpath
$[*]
```

Usado para obtener todos los objetos completos y luego usar:

* **Extract fields**
* **Convert field type**
* **Organize fields**

---

## 🧮 Combinación con transformaciones

| Grafana Transformation       | Usar con JSONPath…      | Ejemplo               |
| ---------------------------- | ----------------------- | --------------------- |
| `Extract fields`             | `$[*]`                  | Divide en columnas    |
| `Add field from calculation` | `$[*].temp`, `$[*].hum` | `temp - hum`          |
| `Filter by values`           | `$[*].status`           | Solo `status == "OK"` |

---

## 🚫 Limitaciones del plugin

* No soporta operadores lógicos ni filtros condicionales con `?(@.campo...)`
* No permite recorrer claves dinámicas (tipo `$.datos.*`)
* No concatena datos entre múltiples arrays (usa `$[*]`, no varios en paralelo)

---

## ✅ Ejemplos listos para pegar

### 🔸 1. Gráfico temperatura

```jsonpath
Field 1: $[*].time  → Type: Time  
Field 2: $[*].temp  → Type: Number
```

---

### 🔸 2. Tabla resumen de sensores

```jsonpath
$[*].sensor.id
$[*].sensor.ubicacion
$[*].status
```

---

### 🔸 3. Extraer y procesar todo

```jsonpath
$[*] → usar transform “Extract fields”
```
