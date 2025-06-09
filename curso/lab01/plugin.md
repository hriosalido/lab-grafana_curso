
```bash
grafana-cli plugins install <plugin-id>
```

### ✅ Ejemplo real:

Para instalar el plugin **Diagram Panel**:

```bash
grafana-cli plugins install jdbranham-diagram-panel
```

### 📌 Después de instalarlo:

1. Reinicia Grafana para que cargue el plugin:

```bash
sudo systemctl restart grafana-server
```

O si estás usando Docker:

```bash
docker restart grafana
```
