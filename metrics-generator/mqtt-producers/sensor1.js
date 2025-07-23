import mqtt from 'mqtt'

const client = mqtt.connect('mqtt://mosquitto:1883')
setInterval(() => {
  const valor = (50 + Math.random() * 30).toFixed(1)
  const topic = 'planta/horno1/temperatura'
  client.publish(topic, valor)
  console.log('emitido al topic',topic,valor)
}, 2000)