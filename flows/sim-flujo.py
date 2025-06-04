from prometheus_client import CollectorRegistry, Gauge, push_to_gateway
import random

registry = CollectorRegistry()
g = Gauge('flujo_error_rate', 'Tasa de error', registry=registry)

error_rate = random.random()
g.set(error_rate)

push_to_gateway('pushgateway:9091', job='simulador', registry=registry)
print(f"Enviado: error_rate={error_rate}")
