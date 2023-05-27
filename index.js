const cors = require('cors')
const express = require('express')
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['my-kafka-0.my-kafka-headless.jona27081.svc.cluster.local:9092']
});

const producer = kafka.producer()

const app = express();
app.use(cors());
app.options('*', cors());

const port = 8080;

app.get('/', (req, res, next) => {
  res.send('kafka api - Jonathan2708');
});

const run = async (reaction) => {

    await producer.connect()
//    await producer.send()
    await producer.send({
      topic: 'test',
      messages: [ 
	{ 
	  'value': `{"reactionName": "${reaction}" }` 
  	} 
      ],
    })
   await producer.disconnect()
}

app.get('/like', (req, res, next) => {
  const reaction = req.query.reactionName;
  res.send({ 'reactionName' : reaction } );
  run(reaction).catch(e => console.error(`[example/producer] ${e.message}`, e))

});

app.listen(port,  () => 
	console.log('listening on port ' + port
));
