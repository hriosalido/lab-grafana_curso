import mqtt from 'mqtt'

const client = mqtt.connect('mqtt://mosquitto:1883')
setInterval(() => {
  const estado = Math.random() > 0.5 ? 'ON' : 'OFF'
  const topic = 'planta/mezcladora1/estado'
  client.publish(topic, estado)
  console.log('emitido al topic',topic,estado)
}, 5000)


setInterval(() => {
  const estado = Math.random() > 0.5 ? 'ON' : 'OFF'
  const topic = 'planta/mezcladora2/estado'
  client.publish(topic, estado)
  console.log('emitido al topic',topic,estado)
}, 5000)